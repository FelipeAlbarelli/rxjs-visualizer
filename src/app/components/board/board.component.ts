import { Component } from '@angular/core';
import { DropAreaDirective } from '../../drag-drop/drop-area.directive';
import { Coord, DragDropData, DropCompletedDataInfo, DropInfo } from '../../drag-drop/drag-drop-service.service';

type ItemsToDisplay = {
  coord : Coord,
  name : string
}

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [DropAreaDirective],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {

  items : ItemsToDisplay[] = []

  log = (e: any) => {
    console.log(e)
  }

  onDrop = (data : DropCompletedDataInfo) => {
    const {dropInfo , dragData} = data;
    console.log(dragData)
    this.items.push({
      coord : dropInfo.coord.dict.page,
      name : `${dragData['name']}` ?? '---'
    })
  }
}
