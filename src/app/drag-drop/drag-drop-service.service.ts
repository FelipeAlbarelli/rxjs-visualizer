import { Injectable } from '@angular/core';
import { Subject, audit, distinct, sample, tap } from 'rxjs';

export type DragDropData = {
  [key : string | number] : string | number | DragDropData
}


@Injectable({
  providedIn: 'root'
})
export class DragDropServiceService {

  public dragStart$ = new Subject<DragDropData>();

  public globalDrop$ = new Subject<string>();

  constructor() {
    this.dragStart$.subscribe( () => {
      console.log('drag start')
    });
    this.globalDrop$.subscribe( () => {
      console.log('global drop')
    });
   }
}
