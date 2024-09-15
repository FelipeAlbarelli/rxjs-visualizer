import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxjsEntitiesService } from '../../rxjs/rxjs-entities.service';
import { RxjsEntityCardComponent } from '../rxjs-entity-card/rxjs-entity-card.component';
import { DragableDirective } from '../../drag-drop/dragable.directive';
import { BoardStateService } from '../../board/board-state.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule , RxjsEntityCardComponent , DragableDirective],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent implements OnInit {
  constructor(
    protected rxjsService: RxjsEntitiesService,
    protected boardService : BoardStateService  
  ) {}

  rxjsOperators = this.rxjsService.allOperators;

  ngOnInit() {
  }

  reset = () => {
    this.boardService.clear();
  }

  log = (e: any) => {
    console.log(e)
  }
}
