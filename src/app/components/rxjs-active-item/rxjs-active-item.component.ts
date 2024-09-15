import { Component, OnDestroy, OnInit, computed, input } from '@angular/core';
import { RxjsEntityCardComponent } from '../rxjs-entity-card/rxjs-entity-card.component';
import { Subject, delay, map, merge, startWith, takeUntil, tap } from 'rxjs';
import { geRxjsFromRxjsEntity } from '../../rxjs/create-rxjs-objs';
import { CommonModule } from '@angular/common';
import { OperatorsTypes } from '../../rxjs/rxjs-entities.service';

@Component({
  selector: 'app-rxjs-active-item',
  standalone: true,
  imports: [RxjsEntityCardComponent , CommonModule],
  templateUrl: './rxjs-active-item.component.html',
  styleUrl: './rxjs-active-item.component.css'
})
export class RxjsActiveItemComponent  implements OnInit ,  OnDestroy {

  name = input.required<string>()
  operatorType = input.required<OperatorsTypes>()

  private destroy$ = new Subject<void>();

  internalSubject = new Subject();

  delayedInternalSubject = this.internalSubject.pipe(
    delay(100)
  )

  // true for 100 in every internalSubject tick
  ping = merge(
    this.internalSubject.pipe(map( () => true)),
    this.delayedInternalSubject.pipe(map( () => false))
  ).pipe(
    startWith(false)
  )

  baseObservable = computed( () => {
    return geRxjsFromRxjsEntity({
      name: this.name(),
      operatorType: this.operatorType()
    })?.pipe(
      takeUntil(this.destroy$)
    )
  })

  constructor() {
    this.internalSubject.subscribe( x => {
      // console.log(x)
    })

    this.ping.subscribe(x => {
      // console.log(x)
    })

  }

  ngOnInit(): void {
    this.baseObservable()?.subscribe(this.internalSubject)
    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
