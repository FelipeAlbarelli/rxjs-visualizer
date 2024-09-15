import { Component } from '@angular/core';
import { DropAreaDirective } from '../../drag-drop/drop-area.directive';
import { DragDropData, DropCompletedDataInfo, DropInfo } from '../../drag-drop/drag-drop-service.service';

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

  onDrop = (data : DropCompletedDataInfo) => {
    console.log(data);
  }
}
