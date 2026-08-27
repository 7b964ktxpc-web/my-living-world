import {normalizeActiveHero} from './mainCharacters.js';

const BEHAVIOR={
  idle:{speed:0,bounce:0,sway:.02},
  walking:{speed:1,bounce:.07,sway:.035},
  excited:{speed:1.8,bounce:.12,sway:.06},
  celebrate:{speed:2.4,bounce:.16,sway:.08}
};

export function behaviorForHero(heroId,event='idle'){
  const id=normalizeActiveHero(heroId);
  const allowed=['idle','walking','excited','celebrate'];
  const state=allowed.includes(event)?event:'idle';
  return {heroId:id,state,...BEHAVIOR[state]};
}

export function heroPairBehavior(activeHero='slava',event='idle'){
  const active=normalizeActiveHero(activeHero);
  return {
    active:behaviorForHero(active,event),
    companion:behaviorForHero(active==='slava'?'denis':'slava',event==='celebrate'?'celebrate':'idle')
  };
}
