import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[dragMe]',
  standalone: true
})
export class DragableDirective {

  @Input() dragPackage : Record<string, number | string | null> = {};

  // use as key to apply partition on components
  @Input() dragMe : string = "*";

  @HostBinding('attr.draggable') draggable = true;

  @HostListener('dragstart' , ['$event']) 
  onDragStart(e: DragEvent) {
    console.log('*');
    console.log(e);
    console.log(this.dragPackage);
    e.dataTransfer?.setData('text/plain' , JSON.stringify(this.dragPackage) )
  }

  constructor(private el: ElementRef) {
    this.el.nativeElement.attributes
  }

}
