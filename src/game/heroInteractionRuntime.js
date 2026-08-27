import {heroInteractionFor} from './mainCharacterInteractions.js';

export const INTERACTION_PHASES=['ready','approach','interact','complete'];

export function createHeroInteraction(world,heroId='slava',event='objective',target=null){
  const action=heroInteractionFor(world,heroId,event);
  return {world,heroId,event,action,target,phase:target?'approach':'ready',progress:0,startedAt:Date.now()};
}

export function advanceHeroInteraction(run,progress){
  if(!run)return run;
  const p=Math.max(0,Math.min(1,Number(progress)||0));
  const phase=p>=1?'complete':p>=.72?'interact':p>0?'approach':'ready';
  return {...run,phase,progress:p};
}

export function heroInteractionComplete(run){return Boolean(run&&run.phase==='complete')}
