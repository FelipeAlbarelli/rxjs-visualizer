import { Component, input } from '@angular/core';
import { DragableDirective } from '../../drag-drop/dragable.directive';
import { DropAreaDirective } from '../../drag-drop/drop-area.directive';
import { DragDropData, DragDropServiceService, DropCompletedDataInfo } from '../../drag-drop/drag-drop-service.service';
import { ArrowSvgComponent } from '../arrow-svg/arrow-svg.component';
import { distinctUntilChanged, distinctUntilKeyChanged, filter, map, mergeWith, tap, withLatestFrom } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-draggable-arrow-wrapper',
  standalone: true,
  imports: [ DragableDirective , DropAreaDirective , ArrowSvgComponent , CommonModule],
  templateUrl: './draggable-arrow-wrapper.component.html',
  styleUrl: './draggable-arrow-wrapper.component.css'
})
export class DraggableArrowWrapperComponent {

  dragDropData = input<DragDropData>();

  cursorDragHoverMatrix$ = this.dragDropService.dragFromStartToCurrentHover$.pipe(
    withLatestFrom(this.dragDropService.isDragging$),
    filter(([ _ , isDragging]) => isDragging),
    map( ([ {hover, start} , _]) => {
      const from = start.eventInfo.coord.dict.page;
      const to   = hover.coord.dict.page;
      return {from , to}      
    }),
  );

  from$ = this.cursorDragHoverMatrix$.pipe(
    map( ({from , to}) => from || undefined ),
  );

  to$ = this.cursorDragHoverMatrix$.pipe(
    map( ({from, to}) => to || undefined),
    distinctUntilChanged( 
      (prev, curr) =>  (prev[0] === curr[0]) && (prev[1] === curr[1])
    )
  )

  constructor(
    public dragDropService : DragDropServiceService
  ) {
    this.cursorDragHoverMatrix$.subscribe( ({from, to}) => {
      console.log(from , to)
    })
  }



  receivedDrop = (e : DropCompletedDataInfo) => {
    console.log(e)
  }

}
