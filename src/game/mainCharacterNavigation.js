import {normalizeActiveHero} from './mainCharacters';

const HOME={slava:{x:-0.72,z:0},denis:{x:0.72,z:0}};

export function navigationTarget(heroId,target){
  const id=normalizeActiveHero(heroId);
  if(!target||!Number.isFinite(target.x)||!Number.isFinite(target.z))return {...HOME[id],heroId:id};
  return {x:target.x,z:target.z,heroId:id};
}

export function navigationState(heroId,target,current={x:0,z:0},threshold=.16){
  const goal=navigationTarget(heroId,target);
  const dx=goal.x-(current.x||0),dz=goal.z-(current.z||0);
  const distance=Math.hypot(dx,dz);
  return {heroId:goal.heroId,target:goal,dx,dz,distance,reached:distance<=threshold,
    state:distance<=threshold?'arrived':distance>.2?'walking':'approaching'};
}

export function companionTarget(activeHero,target,spacing=.55){
  const goal=navigationTarget(activeHero,target);
  return {x:goal.x+(activeHero==='slava'?spacing:-spacing),z:goal.z,heroId:activeHero==='slava'?'denis':'slava'};
}
