import { HostListener, Injectable } from '@angular/core';
import { Observable, Subject, audit, delay, distinct, distinctUntilChanged, endWith, filter, fromEvent, map, mapTo, merge, mergeWith, race, sample, startWith, switchMap, takeUntil, tap, toArray, withLatestFrom, zip } from 'rxjs';

export type DragDropData = {
  [key : string | number] : string | number | DragDropData
}

export type Coord = [number , number]

export type DragDropEventInfo = {
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

export type DragStartInfo = {
  data: DragDropData,
  eventInfo : DragDropEventInfo,
}

export type DropCompletedDataInfo = {
  start: DragDropEventInfo,
  end:   DragDropEventInfo,
  data: DragDropData
}


@Injectable({
  providedIn: 'root'
})
export class DragDropServiceService {

  public dragStart$ = new Subject<DragStartInfo>();

  public dragEnd$ = new Subject<void>();

  public globalDropComplete$ = new Subject<DragDropEventInfo>();

  public dragHover$ = new Subject<DragDropEventInfo>();

  dragCancelled$ = this.dragStart$.pipe(
    // Para cada dragStart$, começamos a observar dragEnd$ e dropComplete$
    switchMap(() => 
      race(
        this.globalDropComplete$.pipe(
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

  isDragging$ = this.dragHover$.pipe(
    map( _ => true),
    mergeWith( this.dragEnd$.pipe(
        map( _ => false )
      ),
    ),
    distinctUntilChanged()
  )
  
  constructor() {

    this.isDragging$.subscribe( x=> {
      console.log( x )
    })

  }
}
