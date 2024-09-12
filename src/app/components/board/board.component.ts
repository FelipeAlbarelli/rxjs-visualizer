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
    console.log(e)
    console.log(tag)
  }

  onDrag = (e: Event) => {
    e.preventDefault()
  }
}
