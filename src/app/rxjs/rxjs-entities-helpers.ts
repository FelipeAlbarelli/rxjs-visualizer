import { DragDropData } from "../drag-drop/drag-drop-service.service";
import { RxjsEntity, allOperatorsTypes } from "./rxjs-entities.service";

export const isOperatorType = (toTest : string) => allOperatorsTypes.find(op => toTest)

export const getRxjsEntityFromDragData = (data: DragDropData) : RxjsEntity | null => {
    const operatorTypeCandidate = data['operatorType']
    const name = data['name']
    if (typeof operatorTypeCandidate !== 'string' || typeof name !== 'string') {
        return null;
    }
    const operatorType = isOperatorType(operatorTypeCandidate);
    if (operatorType === undefined) {
        return null
    }
    return {
        operatorType , name
    }
}