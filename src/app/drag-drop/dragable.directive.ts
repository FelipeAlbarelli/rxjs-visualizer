import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { DragDropData, DragDropServiceService } from './drag-drop-service.service';
import { getDragEventCoordinates } from './drag-drop-helpers';

@Directive({
  selector: '[dragMe]',
  standalone: true
})
export class DragableDirective {

  @Input() dragData : DragDropData = {};

  // use as key to apply partition on components
  @Input() dragMe : string = "*";

  @Input() dragType : 'copy' | 'move' = 'copy'

  @HostBinding('attr.draggable') draggable = true;

  @HostListener('dragstart' , ['$event']) 
  onDragStart(e: DragEvent) {
    const coord = getDragEventCoordinates(e);
    this.dropService.dragStart$.next({
      data: this.dragData,
      eventInfo : {
        coord,
        id: this.dragMe
      }
    })
  }

  @HostListener('dragend' , ['$event']) 
  onDragEnd(e: DragEvent) {
    // this.dropService.dragStart$.next(this.dragData)
    this.dropService.dragEnd$.next()
  }

  @HostBinding('style.cursor')
  cursor = 'grab';

  constructor(
    private el: ElementRef,
    private dropService : DragDropServiceService
    ) {
  }

}
