import { Observable } from "rxjs";
import { ObservableFactory } from "../rxjs/create-rxjs-objs";


export const fromElementResize = ( nativeEl : HTMLElement ) => {
    
    return new Observable<ResizeObserverEntry[]>( (subscriber) => {
        
        console.log('created ResizeObserver')
        const resizeObserver = new ResizeObserver( (entries) => {
            subscriber.next(entries);
        });

        resizeObserver.observe(nativeEl);
        console.log('started to observe ResizeObserver');

        return () => {
            resizeObserver.disconnect();
        }
    })
}