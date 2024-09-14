import { Component } from '@angular/core';
import { DropAreaDirective } from '../../drag-drop/drop-area.directive';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [DropAreaDirective],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {

  log = (e: any, tag?: string) => {
  }

  onDrag = (e: Event) => {
    e.preventDefault()
  }

  onDrop = (e : DragEvent) => {
    const { offsetX , offsetY} = e;
    console.log(offsetX , offsetY)
  }
}
