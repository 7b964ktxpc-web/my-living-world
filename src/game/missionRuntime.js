import {actionFor} from '../scene/interactionModel';
import {canStartMission,isMissionTarget} from './missionEngine';

export function missionForSelection(mission,object){
 if(!mission||!object)return {ready:false,reason:'Выбери подходящий объект'};
 if(!canStartMission(mission,object))return {ready:false,reason:`Нужен объект типа ${mission.objectType}`} ;
 return {ready:true,reason:actionFor(object).verb};
}
export function shouldCompleteMission(mission,object,point){return Boolean(mission&&object&&point&&canStartMission(mission,object)&&isMissionTarget(mission,point));}
