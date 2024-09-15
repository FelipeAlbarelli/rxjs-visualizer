import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, distinct, of, scan, skip, skipUntil, skipWhile, tap } from 'rxjs';
import { Coord } from '../drag-drop/drag-drop-service.service';
import { OperatorsTypes, RxjsEntity } from '../rxjs/rxjs-entities.service';
import { verifyIsBoardItem } from './board-helpers';
import { logger } from '../common-helpers/loggers';

export type BoardItem = RxjsEntity & {
  coord : Coord,
}

export type BoardActionTypes =  'add' | 'reset'

export type BoardActions = {
  type: 'add',
  data: BoardItem
} | {
  type : 'reset'
} | {
  type : 'set',
  data: BoardItem[]
} 


@Injectable({
  providedIn: 'root'
})
export class BoardStateService {

  readonly storageKey = 'boardState'

  boardActionOccurred$ = new ReplaySubject<BoardActions>(1);

  allBoardItems$ = this.boardActionOccurred$.pipe(
    // distinct(action => JSON.stringify(action) ),
    scan( (acc , currentItem , index) => {
      switch (currentItem.type) {
        case 'add':
          return [...acc , currentItem.data ]
        case 'reset':
          return []
        case 'set':
          return currentItem.data
      }
    } , [] as BoardItem[] ),
    distinct(action => JSON.stringify(action) )
  )

  addItem(item: BoardItem) {
    this.boardActionOccurred$.next({
      data: item,
      type: 'add'
    });
  }

  clear() {
    this.boardActionOccurred$.next({
      type: 'reset'
    })
  }

  set(data : BoardItem[]) {
    this.boardActionOccurred$.next({
      type : 'set',
      data
    })
  }

  getBoardItemsFromLocalStorageSync() {
    const localItems = localStorage.getItem(this.storageKey);
    if (localItems === null) {
      return []
    }
    const jsonItems =  JSON.parse(localItems);
    if (!Array.isArray(jsonItems)) {
      return []
    }
    const items = jsonItems
      .reduce<BoardItem[]>( (acc , currItem , index) => {
        const result = verifyIsBoardItem(currItem);
        if (result === null) {
          return acc
        }
        return [...acc , result]
      } , []);
    return items;
  }

  loadedItems = false;

  loadItemsFromStorage() {
    const items = this.getBoardItemsFromLocalStorageSync();
    this.set(items)
    this.loadedItems = true;
  }

  constructor() { 
    this.allBoardItems$
    .pipe(
      skipWhile( () => this.loadedItems),
    )
    .subscribe( items => {
      const itemsAsString = JSON.stringify(items);
      localStorage.setItem( this.storageKey , itemsAsString);
    });
    this.loadItemsFromStorage();
  }
}
