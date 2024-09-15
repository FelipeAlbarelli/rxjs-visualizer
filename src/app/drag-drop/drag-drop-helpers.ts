import { Coord, DropInfo } from "./drag-drop-service.service";


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