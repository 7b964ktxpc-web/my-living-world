const ACTIONS={
  rocket:{hero:'slava',kind:'launch',label:'Слава запускает ракету',duration:1.2,emoji:'🚀'},
  car:{hero:'slava',kind:'drive',label:'Слава ведёт машинку',duration:1.2,emoji:'🏎️'},
  train:{hero:'denis',kind:'signal',label:'Денис даёт сигнал поезду',duration:1.1,emoji:'🚦'},
  trex:{hero:'denis',kind:'discover',label:'Денис нашёл след динозавра',duration:1.3,emoji:'🥚'}
};
export function heroActionFor(objectType){return ACTIONS[objectType]||null}
export function actionPhase(action,elapsed=0){
 if(!action)return {state:'idle',progress:0}
 const progress=Math.max(0,Math.min(1,elapsed/Math.max(.1,action.duration||1)));
 return {state:progress>=1?'complete':'interact',progress}
}
export function companionReaction(action,activeHero){
 if(!action)return {heroId:activeHero==='slava'?'denis':'slava',state:'idle'};
 return {heroId:activeHero==='slava'?'denis':'slava',state:'celebrate',message:`${action.emoji} Молодец!`}
}
