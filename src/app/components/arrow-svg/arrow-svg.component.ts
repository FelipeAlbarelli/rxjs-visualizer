import { Component, computed, input } from '@angular/core';
import { Coord } from '../../drag-drop/drag-drop-service.service';

@Component({
  selector: 'app-arrow-svg',
  standalone: true,
  imports: [],
  templateUrl: './arrow-svg.component.svg',
  styleUrl: './arrow-svg.component.css'
})
export class ArrowSvgComponent {

  from = input<Coord>();
  to   = input<Coord>();

  show = computed(() => {
    return !!(this.from() && this.to())
  })

}
