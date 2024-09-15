import { Directive, HostListener, Input  } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop'
import { DragDropServiceService, DragDropEventInfo } from './drag-drop-service.service';
import { Subject, combineLatest, map, sample, withLatestFrom, zip } from 'rxjs';
import { getDragEventCoordinates } from './drag-drop-helpers';

@Directive({
  selector: '[dropHere]',
  standalone: true
})
export class DropAreaDirective {

  @Input()
  dropHere = '*';

  droppedHere$ = new Subject<DragDropEventInfo>();

  @HostListener('drop' , ['$event']) 
  _onDrop(e : DragEvent) {
    // this.dropService.drop$.next(this.dropHere);
    const coord = getDragEventCoordinates(e);
    this.droppedHere$.next({
      id : this.dropHere,
      coord
    });
  }

  dropCompleted$ = this.droppedHere$.pipe(
    withLatestFrom(this.dropService.dragStart$),
    map( ([dropInfo , dragData]) => ({
        start : dragData.eventInfo,
        end: dropInfo,
        data: dragData.data
    }))
  )

  dropComplete = outputFromObservable(this.dropCompleted$);

  // TW : Ambiguidade >:(  !!!!
  // Drag Over não é "acabou o drag event", é "o drag está over/sobre aqui"
  // mais um motivo para ultima flor do lácio >>> tio san language
  @HostListener('dragover' , ['$event']) 
  _onDragOver(e: DragEvent) {
    const coord = getDragEventCoordinates(e);
    e.preventDefault();
    this.dropService.dragHover$.next({
      id: this.dropHere,
      coord
    })
    return;
    // console.log('drag over')
    // console.log(e)
  }

  constructor(
    private dropService : DragDropServiceService
    ) {
      this.droppedHere$.subscribe(this.dropService.globalDropComplete$);
  }

}
