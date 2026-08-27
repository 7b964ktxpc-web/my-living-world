export const WORLD_POINTS={
 space:[
  {id:'launch-pad',label:'Космодром',emoji:'🛸',x:0,z:1.4,message:'Здесь можно запускать ракеты 🚀'},
  {id:'moon',label:'Луна',emoji:'🌕',x:-2.7,z:-1.2,message:'Луна ждёт нового путешественника 🌕'}
 ],
 cars:[
  {id:'garage',label:'Гараж',emoji:'🛠️',x:-2.8,z:.3,message:'Загоняй машинку в гараж!'},
  {id:'finish',label:'Финиш',emoji:'🏁',x:2.8,z:0,message:'Кто первый доберётся до финиша?'}
 ],
 trains:[
  {id:'station',label:'Станция',emoji:'🚉',x:-2.7,z:0,message:'Поезд готов к отправлению 🚂'},
  {id:'bridge',label:'Мост',emoji:'🌉',x:2.4,z:0,message:'Проезжаем по большому мосту!'}
 ],
 dinos:[
  {id:'nest',label:'Гнездо',emoji:'🥚',x:-2.4,z:.2,message:'Осторожно, рядом яйца динозавра!'},
  {id:'volcano',label:'Вулкан',emoji:'🌋',x:2.5,z:-.8,message:'Вулкан просыпается!'}
 ]
};
export function pointsForWorld(world){return WORLD_POINTS[world]||[]}
