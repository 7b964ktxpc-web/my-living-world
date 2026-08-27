const ACTIONS={
  launch:{primary:'press',secondary:'assist',duration:1600},
  race:{primary:'drive',secondary:'signal',duration:1800},
  train:{primary:'signal',secondary:'load',duration:1700},
  search:{primary:'inspect',secondary:'discover',duration:1900},
  celebrate:{primary:'celebrate',secondary:'celebrate',duration:1200},
  observe:{primary:'look',secondary:'look',duration:800}
};

export function choreographyFor(action,heroId='slava'){
  const base=ACTIONS[action]||ACTIONS.observe;
  const primaryHero=heroId==='denis'?'denis':'slava';
  const secondaryHero=primaryHero==='slava'?'denis':'slava';
  return {...base,action,primaryHero,secondaryHero};
}

export function choreographyProgress(elapsed,duration){
  const total=Math.max(1,Number(duration)||1);
  return Math.max(0,Math.min(1,(Number(elapsed)||0)/total));
}

export function choreographyPhase(progress){
  const p=Math.max(0,Math.min(1,Number(progress)||0));
  if(p>=1)return 'complete';
  if(p>=.25)return 'action';
  return 'approach';
}
