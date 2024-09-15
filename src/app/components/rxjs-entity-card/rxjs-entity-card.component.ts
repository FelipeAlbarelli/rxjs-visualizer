import { Component, HostBinding, Input, input } from '@angular/core';
import { OperatorsTypes, RxjsEntity } from '../../rxjs/rxjs-entities.service';

@Component({
  selector: 'app-rxjs-entity-card',
  standalone: true,
  imports: [],
  templateUrl: './rxjs-entity-card.component.html',
  styleUrl: './rxjs-entity-card.component.css',
})
export class RxjsEntityCardComponent {
  name = input.required<string>()
  operatorType = input.required<OperatorsTypes>()

  // apply css style 
  activated = input(false);
}
