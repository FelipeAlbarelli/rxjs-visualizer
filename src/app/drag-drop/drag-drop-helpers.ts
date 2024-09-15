import { Coord, DropInfo } from "./drag-drop-service.service";

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

export const getDragEventCoordinates = ( e: DragEvent ) : DropInfo['coord'] => {
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
    const dict : DropInfo['coord']['dict'] = {
        xy : [x,y],
        client : [clientX , clientY],
        layer : [layerX , layerY],
        page : [pageX , pageY],
        offset :[offsetX , offsetY],
        screen : [screenX , screenY]
    } 

    return {list , dict}
}