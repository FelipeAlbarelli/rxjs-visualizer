import { Observable, interval, of, switchMap, timer } from "rxjs";
import { RxjsEntity } from "./rxjs-entities.service";



export const geRxjsFromRxjsEntity = (obj : RxjsEntity , ) => {
    const {name , operatorType} = obj;
    switch (operatorType) {
        case 'creation':
            return timer(500 , 500);

        case 'filtering' :
            return  of(0)
        
        case 'transformation':
            return of(0)
    }
}

export const ObservableFactory = (obj : Observable<RxjsEntity>) => {
    return obj.pipe(
        switchMap( rxjsEntity => {
            const {name,operatorType} = rxjsEntity;
            switch (operatorType) {
                case 'creation':
                    return interval(500);
                    break;
                case 'filtering':
                    return of(0);
                
                case 'transformation':
                    return of(0);
            }
        })
    )
}