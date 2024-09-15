import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export const allOperatorsTypes = [
  'creation' , 
  'filtering',
  'transformation'
] as const 

export type OperatorsTypes = (typeof allOperatorsTypes)[number];

export type RxjsEntity = {
  operatorType: OperatorsTypes;
  name: string;
}

const allOperators: RxjsEntity[] = [
  {
    operatorType: 'creation',
    name: 'timer',
  },
  {
    operatorType: 'filtering',
    name: 'filter',
  },
  {
    operatorType: 'transformation',
    name: 'map',
  },
];

@Injectable({
  providedIn: 'root',
})
export class RxjsEntitiesService {
  public allOperators = of(allOperators);

  constructor() {}
}
