import { Component, OnDestroy, OnInit, computed, input } from '@angular/core';
import { RxjsEntityCardComponent } from '../rxjs-entity-card/rxjs-entity-card.component';
import { Subject, combineLatest, delay, map, merge, startWith, takeUntil, tap, zip } from 'rxjs';
import { ObservableFactory, geRxjsFromRxjsEntity } from '../../rxjs/create-rxjs-objs';
import { CommonModule } from '@angular/common';
import { OperatorsTypes } from '../../rxjs/rxjs-entities.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { BoardItem } from '../../board/board-state.service';

@Component({
  selector: 'app-rxjs-active-item',
  standalone: true,
  imports: [RxjsEntityCardComponent , CommonModule],
  templateUrl: './rxjs-active-item.component.html',
  styleUrl: './rxjs-active-item.component.css'
})
export class RxjsActiveItemComponent  implements OnInit ,  OnDestroy {

  item = input.required<BoardItem>();

  item$ = toObservable(this.item);

  destroy$ = new Subject<void>();

  baseObservable$ = ObservableFactory(this.item$)
  .pipe(
    map( x => x + 1 ),
    startWith(0)
  )


  delayedInternalSubject$ = this.baseObservable$.pipe(
    delay(100)
  )

  // true for 100 in every internalSubject tick
  ping$ = merge(
    this.baseObservable$.pipe(map( () => true)),
    this.delayedInternalSubject$.pipe(map( () => false))
  ).pipe(
    startWith(false)
  )

  textToDisplay$ = combineLatest([
    this.item$.pipe(map( item => item.name)),
    this.baseObservable$
  ]).pipe(
    map( ([name , value]) => `${name} : ${value}`)
    )


  constructor() {
  }

  ngOnInit(): void {
    this.baseObservable$.subscribe( (x) => {
      console.log(x)
    })
    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
