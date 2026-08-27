export const TEMPLATE_CATALOG={
 space:[
  {id:'rocket',label:'Ракета',emoji:'🚀',requiredStars:0,printable:true,description:'Большая ракета для первого запуска.'},
  {id:'moon-rover',label:'Луноход',emoji:'🌕',requiredStars:3,printable:true,description:'Исследователь Луны.'},
  {id:'satellite',label:'Спутник',emoji:'🛰️',requiredStars:6,printable:true,description:'Спутник для орбитальных миссий.'}
 ],
 cars:[
  {id:'race-car',label:'Гоночная машина',emoji:'🏎️',requiredStars:0,printable:true,description:'Быстрая машина для первой гонки.'},
  {id:'truck',label:'Грузовик',emoji:'🚚',requiredStars:3,printable:true,description:'Большой грузовик для доставки.'},
  {id:'fire-truck',label:'Пожарная машина',emoji:'🚒',requiredStars:6,printable:true,description:'Спасательная машина.'}
 ],
 trains:[
  {id:'steam-train',label:'Паровоз',emoji:'🚂',requiredStars:0,printable:true,description:'Классический паровоз.'},
  {id:'fast-train',label:'Скоростной поезд',emoji:'🚄',requiredStars:3,printable:true,description:'Мчится между станциями.'},
  {id:'cargo-train',label:'Грузовой поезд',emoji:'🚛',requiredStars:6,printable:true,description:'Перевозит грузы.'}
 ],
 dinos:[
  {id:'trex',label:'Ти-рекс',emoji:'🦖',requiredStars:0,printable:true,description:'Главный хищник острова.'},
  {id:'triceratops',label:'Трицератопс',emoji:'🦏',requiredStars:3,printable:true,description:'Добрый травоядный с тремя рогами.'},
  {id:'stegosaurus',label:'Стегозавр',emoji:'🦕',requiredStars:6,printable:true,description:'Динозавр с большими пластинами.'}
 ]
};
export function templatesForWorld(world){return TEMPLATE_CATALOG[world]||[]}
export function templateById(world,id){return templatesForWorld(world).find(x=>x.id===id)||null}
