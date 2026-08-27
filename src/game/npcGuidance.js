import {npcQuestForWorld} from './npcQuest';

export function guidanceForNpc(world,{objectiveIndex=0,objectPosition=null,npcPosition=null}={}){
  const quest=npcQuestForWorld(world);
  if(!quest)return null;
  if(objectPosition&&npcPosition){
    const dx=objectPosition.x-npcPosition.x; const dz=objectPosition.z-npcPosition.z;
    const distance=Math.hypot(dx,dz);
    if(distance<0.75)return {state:'greeting',text:'Я рядом! Давай вместе!'};
    const angle=Math.atan2(dx,dz);
    return {state:'pointing',text:angle>-0.8&&angle<0.8?'Иди прямо к цели!':angle<0?'Поверни налево к цели!':'Поверни направо к цели!',distance};
  }
  return {state:objectiveIndex>0?'pointing':'idle',text:objectiveIndex>0?'Следующая цель ждёт!':quest.intro};
}
