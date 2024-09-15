import { Injectable } from '@angular/core';
import { Subject, audit, distinct, sample, tap, toArray } from 'rxjs';

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

  public globalDrop$ = new Subject<DropInfo>();

  dragEventCoordBuffer = () => {
    const source = new Subject<[number , number]>();
    const obs = source.pipe(
      toArray()
    )
    return {
      source,
      obs
    }
  }

  constructor() {
   }
}
