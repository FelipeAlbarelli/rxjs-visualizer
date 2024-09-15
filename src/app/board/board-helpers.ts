import { isCoord } from "../drag-drop/drag-drop-helpers";
import { DropCompletedDataInfo } from "../drag-drop/drag-drop-service.service";
import { getRxjsEntityFromDragData, isOperatorType } from "../rxjs/rxjs-entities-helpers";


export const verifyIsBoardItem = (x : any) => {
    try {
        const name = x['name'];
        if (typeof name !== 'string') {
            return null
        }
        const operatorType = isOperatorType(x['operatorType']);
        if (operatorType === undefined) {
            return null
        }
        const coord = isCoord(x['coord']);
        if (coord === null) {
            return null
        }
        return {
            name , operatorType , coord
        }

    } catch (e) {
        console.error(e);
        return null;
    }
}

export const dropCompleteDataToBoardItem = (dropCompleteData : DropCompletedDataInfo) => {
    const {dragData,dropInfo} = dropCompleteData;
    const rxjsEntity = getRxjsEntityFromDragData(dragData);
    if (rxjsEntity === null) {
        return null
    }
    return {
        coord : dropInfo.coord.dict.page,
        name : rxjsEntity.name,
        operatorType : rxjsEntity.operatorType
    }
}
