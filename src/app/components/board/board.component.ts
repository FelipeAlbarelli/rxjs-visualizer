import { Component } from '@angular/core';
import { DropAreaDirective } from '../../drag-drop/drop-area.directive';
import { Coord, DragDropData, DropCompletedDataInfo, DropInfo } from '../../drag-drop/drag-drop-service.service';
import { PlacedDirective } from '../../interactive-position/placed.directive';
import { RxjsActiveItemComponent } from '../rxjs-active-item/rxjs-active-item.component';
import { getRxjsEntityFromDragData } from '../../rxjs/rxjs-entities-helpers';
import { OperatorsTypes } from '../../rxjs/rxjs-entities.service';

type ItemsToDisplay = {
  coord : Coord,
  name : string,
  operatorType: OperatorsTypes
}

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [DropAreaDirective , PlacedDirective , RxjsActiveItemComponent],
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
    const rxjsEntity = getRxjsEntityFromDragData(dragData);
    if (rxjsEntity === null) {
      return
    }
    this.items.push({
      coord : dropInfo.coord.dict.page,
      name : rxjsEntity.name,
      operatorType : rxjsEntity.operatorType
    })
  }
}
