import {objectivesForWorld} from './minigameObjectives';
import {npcForWorld} from './npcEngine';

export function nextObjective(world,collected=[]){return objectivesForWorld(world).find(item=>!collected.includes(item.id))||null}

export function guideState(world,collected=[]){
 const objective=nextObjective(world,collected);
 const npc=npcForWorld(world);
 if(!objective)return {state:'celebrate',npc,objective:null,message:`${npc.emoji} ${npc.label}: Всё готово!`};
 return {state:'pointing',npc,objective,message:`${npc.emoji} ${npc.label}: Ищи ${objective.label.toLowerCase()} ${objective.emoji}`};
}

export function followTargetFor(world,selectedPosition,collected=[]){
 const objective=nextObjective(world,collected);
 if(!selectedPosition&&!objective)return null;
 if(selectedPosition)return {x:selectedPosition.x,z:selectedPosition.z};
 return {x:objective.x,z:objective.z};
}
