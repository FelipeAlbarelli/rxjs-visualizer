import { Directive, HostListener, Input  } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop'
import { DragDropServiceService } from './drag-drop-service.service';
import { Subject, sample } from 'rxjs';

@Directive({
  selector: '[dropHere]',
  standalone: true
})
export class DropAreaDirective {

  @Input()
  dropHere = '*';

  droppedHere$ = new Subject<string>();

  @HostListener('drop' , ['$event']) 
  _onDrop(e : DragEvent) {
    // this.dropService.drop$.next(this.dropHere);
    this.droppedHere$.next(this.dropHere);
  }

  dropCompleted$ = this.dropService.dragStart$.pipe(
    sample(this.droppedHere$)
  )

  dropComplete = outputFromObservable(this.dropCompleted$);

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
