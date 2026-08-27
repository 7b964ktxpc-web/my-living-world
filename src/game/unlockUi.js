import {unlocksForWorld,isUnlocked,nextUnlock} from './unlocks';

export function unlockUi(world,stars=0){
 const items=unlocksForWorld(world).map(item=>({...item,unlocked:isUnlocked(item,stars),remaining:Math.max(0,item.requiredStars-stars)}));
 const next=nextUnlock(world,stars);
 return {items,next,remaining:next?Math.max(0,next.requiredStars-stars):0};
}
