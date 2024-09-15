import { Directive, ElementRef, HostBinding, HostListener, NgZone, OnDestroy, OnInit, computed, effect, input, signal } from '@angular/core';
import { Coord } from '../drag-drop/drag-drop-service.service';

@Directive({
  selector: '[placedItem]',
  standalone: true
})
export class PlacedDirective implements OnInit , OnDestroy  {

  width  = signal(0);
  height = signal(0); 

  resizeObserver = new ResizeObserver( entries => {
      const width = entries[0].borderBoxSize[0].inlineSize;
      const height = entries[0].borderBoxSize[0].blockSize;
      this.width.set(width);
      this.height.set(height)
  });

  placedItem = input.required<Coord>();

  calculatedTopDistance = computed( () => {
    return this.placedItem()[1] - (this.height() / 2);
  })

  calculatedLeftDistance = computed( () => {
    return this.placedItem()[0] - (this.width() /2);
  })

  @HostBinding('style.top.px') 
  get top() {
    return this.calculatedTopDistance();
  }
  
  @HostBinding('style.left.px')
  get left() {
    return this.calculatedLeftDistance()
  }

  @HostBinding('style.position')
  position = 'absolute';

  ngOnInit(): void {
    this.resizeObserver.observe(this.el.nativeElement)
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  constructor(
    private el: ElementRef<HTMLElement>,
    ) {
  }

}
