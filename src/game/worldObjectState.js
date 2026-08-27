const COMPLETIONS={
  rocket:{idle:'ready',active:'launching',complete:'launched'},
  car:{idle:'parked',active:'racing',complete:'finished'},
  train:{idle:'stopped',active:'departing',complete:'arrived'},
  trex:{idle:'curious',active:'searching',complete:'found'}
};
export function objectStateFor(type,phase='idle'){
  const map=COMPLETIONS[type]||COMPLETIONS.rocket;
  return map[phase]||map.idle;
}
export function applyObjectInteraction(object,type,phase){
  return {...object,state:objectStateFor(type,phase),interactionPhase:phase,updatedAt:Date.now()};
}
export function completionFor(type){return COMPLETIONS[type]||COMPLETIONS.rocket}
