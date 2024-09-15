import { Coord, DragDropEventInfo } from "./drag-drop-service.service";

export const isCoord = (toTest : any) => {
    if (!Array.isArray(toTest)) {
        return null
    }
    if (toTest.length !== 2) {
        return null
    }
    const [x,y] = toTest;
    if ( typeof x !== 'number' || typeof y  !== 'number') {
        return null
    }
    return [x, y] as [number , number]
}

export const getDragEventCoordinates = ( e: DragEvent ) : DragDropEventInfo['coord'] => {
    const {
        x, y , clientX , clientY , layerX , layerY , pageX , pageY ,offsetX , offsetY , screenX , screenY
    } = e;
    const list : Coord[] = [
        [x,y],
        [clientX , clientY],
        [layerX , layerY],
        [pageX , pageY],
        [offsetX , offsetY],
        [screenX , screenY]
    ];
    const dict : DragDropEventInfo['coord']['dict'] = {
        xy : [x,y],
        client : [clientX , clientY],
        layer : [layerX , layerY],
        page : [pageX , pageY],
        offset :[offsetX , offsetY],
        screen : [screenX , screenY]
    } 

    return {list , dict}
}