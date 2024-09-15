import { Directive, ElementRef, HostBinding, HostListener, OnDestroy, OnInit, input } from '@angular/core';
import { Coord } from '../drag-drop/drag-drop-service.service';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[placedItem]',
  standalone: true
})
export class PlacedDirective implements OnInit , OnDestroy  {

  placedItem = input.required<Coord>();

  @HostBinding('style.top.px') 
  get top() {
    return this.placedItem()[1]
  }
  
  @HostBinding('style.left.px')
  get left() {
    return this.placedItem()[0]
  }

  @HostBinding('style.position')
  position = 'absolute';

  width  = 0;
  height = 0; 

  resizeObserver = new ResizeObserver( entries => {
    const width = entries[0].borderBoxSize[0].inlineSize;
    const height = entries[0].borderBoxSize[0].blockSize;
    this.width  = width;
    this.height = height
    console.log(this.width , this.height)
  });

  ngOnInit(): void {
    this.resizeObserver.observe(this.el.nativeElement)
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  constructor(private el: ElementRef<HTMLElement> ) {
    // this.el.nativeElement.addEventListener('resize')
    
  }

}
