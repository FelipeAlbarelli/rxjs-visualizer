import { Component } from '@angular/core';
import { RxjsEntityCardComponent } from '../rxjs-entity-card/rxjs-entity-card.component';

@Component({
  selector: 'app-rxjs-active-item',
  standalone: true,
  imports: [RxjsEntityCardComponent],
  templateUrl: './rxjs-active-item.component.html',
  styleUrl: './rxjs-active-item.component.css'
})
export class RxjsActiveItemComponent extends RxjsEntityCardComponent {

}
