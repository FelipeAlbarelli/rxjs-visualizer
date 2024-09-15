import { Directive, HostListener, Input  } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop'
import { DragDropServiceService, DropInfo } from './drag-drop-service.service';
import { Subject, combineLatest, map, sample, withLatestFrom, zip } from 'rxjs';
import { getDragEventCoordinates } from './drag-drop-helpers';

@Directive({
  selector: '[dropHere]',
  standalone: true
})
export class DropAreaDirective {

  @Input()
  dropHere = '*';

  droppedHere$ = new Subject<DropInfo>();

  @HostListener('drop' , ['$event']) 
  _onDrop(e : DragEvent) {
    // this.dropService.drop$.next(this.dropHere);
    const coord = getDragEventCoordinates(e);
    this.droppedHere$.next({
      id : this.dropHere,
      coord
    });
  }

  dropCompleted2$ = this.droppedHere$.pipe(
    withLatestFrom(this.dropService.dragStart$),
    map( ([dropInfo , dragData]) => ({
        dragData , dropInfo
    }))
  )

  dropComplete = outputFromObservable(this.dropCompleted2$);

  // TW : Ambiguidade >:(  !!!!
  // Drag Over não é "acabou o drag event", é "o drag está over/sobre aqui"
  // mais um motivo para ultima flor do lácio >>> tio san language
  @HostListener('dragover' , ['$event']) 
  _onDragOver(e: DragEvent) {
    e.preventDefault()
    return;
    // console.log('drag over')
    // console.log(e)
  }

  @HostListener('dragend' , ['$event'])
  _onDragEnd(e: DragEvent) {
  }

  constructor(
    private dropService : DragDropServiceService
    ) {
      this.droppedHere$.subscribe(this.dropService.globalDrop$);
  }

}
