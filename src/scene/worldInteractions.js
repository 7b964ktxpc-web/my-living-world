export const WORLD_POINTS={
 space:[
  {id:'launch-pad',label:'Космодром',emoji:'🛸',x:0,z:1.4,message:'Здесь можно запускать ракеты 🚀',targetTypes:['rocket']},
  {id:'moon',label:'Луна',emoji:'🌕',x:-2.7,z:-1.2,message:'Луна ждёт нового путешественника 🌕',targetTypes:['rocket']}
 ],
 cars:[
  {id:'garage',label:'Гараж',emoji:'🛠️',x:-2.8,z:.3,message:'Загоняй машинку в гараж!',targetTypes:['car']},
  {id:'finish',label:'Финиш',emoji:'🏁',x:2.8,z:0,message:'Кто первый доберётся до финиша?',targetTypes:['car']}
 ],
 trains:[
  {id:'station',label:'Станция',emoji:'🚉',x:-2.7,z:0,message:'Поезд готов к отправлению 🚂',targetTypes:['train']},
  {id:'bridge',label:'Мост',emoji:'🌉',x:2.4,z:0,message:'Проезжаем по большому мосту!',targetTypes:['train']}
 ],
 dinos:[
  {id:'nest',label:'Гнездо',emoji:'🥚',x:-2.4,z:.2,message:'Осторожно, рядом яйца динозавра!',targetTypes:['trex']},
  {id:'volcano',label:'Вулкан',emoji:'🌋',x:2.5,z:-.8,message:'Вулкан просыпается!',targetTypes:['trex']}
 ]
};
export function pointsForWorld(world){return WORLD_POINTS[world]||[]}
export function pointForObject(world,type,index=0){return pointsForWorld(world).filter(p=>p.targetTypes?.includes(type))[index%Math.max(1,pointsForWorld(world).filter(p=>p.targetTypes?.includes(type)).length)]||null}
export function distanceToPoint(objectState,point){if(!point)return Infinity;return Math.hypot((objectState?.x||0)-point.x,(objectState?.z||0)-point.z)}
export function interactionMessage(point,type){if(!point)return '✨ Объект оживает!';return `${point.emoji} ${point.label}: ${point.message}`}
