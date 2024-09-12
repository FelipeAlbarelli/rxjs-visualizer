import { Component, Input } from '@angular/core';
import { OperatorsTypes, RxjsEntity } from '../../rxjs/rxjs-entities.service';

@Component({
  selector: 'app-rxjs-entity-card',
  standalone: true,
  imports: [],
  templateUrl: './rxjs-entity-card.component.html',
  styleUrl: './rxjs-entity-card.component.css',
})
export class RxjsEntityCardComponent {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) operatorType!: OperatorsTypes;
}
