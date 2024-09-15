import { HostListener, Injectable } from '@angular/core';
import { Observable, Subject, audit, delay, distinct, filter, fromEvent, map, mapTo, race, sample, startWith, switchMap, takeUntil, tap, toArray, withLatestFrom, zip } from 'rxjs';

export type DragDropData = {
  [key : string | number] : string | number | DragDropData
}

export type Coord = [number , number]

export type DropInfo = {
  id : string,
  coord : {
    list : Coord[],
    dict : {
      xy : Coord,
      client : Coord,
      layer : Coord,
      page : Coord,
      offset :Coord,
      screen : Coord
    }
  }
}

export type DropCompletedDataInfo = {
  dragData : DragDropData,
  dropInfo : DropInfo
}


@Injectable({
  providedIn: 'root'
})
export class DragDropServiceService {

  public dragStart$ = new Subject<DragDropData>();

  public dragEnd$ = new Subject<void>();

  public globalDrop$ = new Subject<DropInfo>();

  dragCancelled$ = this.dragStart$.pipe(
    // Para cada dragStart$, começamos a observar dragEnd$ e dropComplete$
    switchMap(() => 
      race(
        this.globalDrop$.pipe(
          // Quando dropComplete$ emite, o drag foi bem-sucedido, então ignoramos
          map(() => false)
        ),
        this.dragEnd$.pipe(
          // Adicionamos um pequeno delay para garantir que dropComplete$ tenha tido
          // tempo para emitir, se for o caso. Se não emitir, consideramos cancelado
          delay(1),
          map(() => true) // Se o dragEnd$ emite sem que dropComplete$ tenha emitido, consideramos como cancelado
        )
      ).pipe(
        // Filtramos para emitir apenas quando o drag foi cancelado
        filter((isCancelled) => isCancelled)
      )
    )
  );


  constructor() {
    this.dragCancelled$.subscribe(x => {
      console.log({
        dragCancelled : x
      })
    })

    // this.dragStart$.subscribe(x => console.log(x))
    // this.globalDrop$.subscribe(x => console.log(x))

  }
}
