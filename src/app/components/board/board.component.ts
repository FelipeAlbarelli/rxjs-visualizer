import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
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
