import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { DragDropData, DragDropServiceService } from './drag-drop-service.service';

@Directive({
  selector: '[dragMe]',
  standalone: true
})
export class DragableDirective {

  @Input() dragData : DragDropData = {};

  // use as key to apply partition on components
  @Input() dragMe : string = "*";

  @HostBinding('attr.draggable') draggable = true;

  @HostListener('dragstart' , ['$event']) 
  onDragStart(e: DragEvent) {
    this.dropService.dragStart$.next(this.dragData)
  }

  constructor(
    private el: ElementRef,
    private dropService : DragDropServiceService
    ) {
  }

}
