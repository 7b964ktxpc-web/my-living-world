export const ACTIONS={
 rocket:{id:'launch',label:'Запустить',emoji:'🚀',duration:3},
 car:{id:'drive',label:'Поехали',emoji:'🏁',duration:3},
 train:{id:'depart',label:'Отправить',emoji:'🚂',duration:4},
 trex:{id:'greet',label:'Поздороваться',emoji:'👋',duration:3}
};

export function actionFor(object){return ACTIONS[object?.type]||ACTIONS.rocket}
export function startAction(object){const action=actionFor(object);return {objectId:object.id,actionId:action.id,label:action.label,emoji:action.emoji,startedAt:Date.now(),endsAt:Date.now()+action.duration*1000}}
export function actionProgress(action,now=Date.now()){if(!action)return 0;return Math.max(0,Math.min(1,(now-action.startedAt)/(action.endsAt-action.startedAt)))}
export function actionRunning(action,now=Date.now()){return Boolean(action)&&action.endsAt>now}
