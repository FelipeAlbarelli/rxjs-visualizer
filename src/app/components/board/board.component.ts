import { Component } from '@angular/core';
import { DropAreaDirective } from '../../drag-drop/drop-area.directive';
import { DropCompletedDataInfo } from '../../drag-drop/drag-drop-service.service';
import { PlacedDirective } from '../../interactive-position/placed.directive';
import { RxjsActiveItemComponent } from '../rxjs-active-item/rxjs-active-item.component';
import { BoardStateService } from '../../board/board-state.service';
import { dropCompleteDataToBoardItem } from '../../board/board-helpers';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [DropAreaDirective , PlacedDirective , RxjsActiveItemComponent , CommonModule ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {

  constructor(private boardStateService : BoardStateService) {
    this.items$.subscribe( x => {
      console.log(x)
    })
  }

  items$ = this.boardStateService.allBoardItems$
    

  log = (e: any) => {
    console.log(e)
  }

  onDrop = (data : DropCompletedDataInfo) => {
    const boardItem = dropCompleteDataToBoardItem(data);
    if (boardItem === null) {
      return
    }
    this.boardStateService.addItem(boardItem)
  }
}
