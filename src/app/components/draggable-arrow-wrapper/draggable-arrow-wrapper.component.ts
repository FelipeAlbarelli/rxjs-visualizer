import { Component, input } from '@angular/core';
import { DragableDirective } from '../../drag-drop/dragable.directive';
import { DropAreaDirective } from '../../drag-drop/drop-area.directive';
import { DragDropData, DropCompletedDataInfo } from '../../drag-drop/drag-drop-service.service';

@Component({
  selector: 'app-draggable-arrow-wrapper',
  standalone: true,
  imports: [ DragableDirective , DropAreaDirective ],
  templateUrl: './draggable-arrow-wrapper.component.html',
  styleUrl: './draggable-arrow-wrapper.component.css'
})
export class DraggableArrowWrapperComponent {

  dragDropData = input<DragDropData>()

  receivedDrop = (e : DropCompletedDataInfo) => {
    console.log(e)
  }

}