import { timer } from "rxjs";
import { RxjsEntity } from "./rxjs-entities.service";



export const geRxjsFromRxjsEntity = (obj : RxjsEntity , ) => {
    const {name , operatorType} = obj;
    switch (operatorType) {
        case 'creation':
            return timer(500 , 500);

        case 'filtering' :
            return  null
        
        case 'transformation':
            return null
    }
}