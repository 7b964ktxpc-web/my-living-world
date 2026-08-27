export const CONTENT_UNLOCKS={
 space:[
  {id:'rocket',label:'Ракета',emoji:'🚀',requiredStars:0},
  {id:'moon-rover',label:'Луноход',emoji:'🌕',requiredStars:3},
  {id:'satellite',label:'Спутник',emoji:'🛰️',requiredStars:6}
 ],
 cars:[
  {id:'race-car',label:'Гоночная машина',emoji:'🏎️',requiredStars:0},
  {id:'truck',label:'Грузовик',emoji:'🚚',requiredStars:3},
  {id:'fire-truck',label:'Пожарная машина',emoji:'🚒',requiredStars:6}
 ],
 trains:[
  {id:'steam-train',label:'Паровоз',emoji:'🚂',requiredStars:0},
  {id:'fast-train',label:'Скоростной поезд',emoji:'🚄',requiredStars:3},
  {id:'cargo-train',label:'Грузовой поезд',emoji:'🚛',requiredStars:6}
 ],
 dinos:[
  {id:'trex',label:'Ти-рекс',emoji:'🦖',requiredStars:0},
  {id:'triceratops',label:'Трицератопс',emoji:'🦏',requiredStars:3},
  {id:'stegosaurus',label:'Стегозавр',emoji:'🦕',requiredStars:6}
 ]
};
export function unlocksForWorld(world){return CONTENT_UNLOCKS[world]||[]}
export function isUnlocked(item,stars=0){return stars>=item.requiredStars}
export function availableUnlocks(world,stars=0){return unlocksForWorld(world).filter(item=>isUnlocked(item,stars))}
export function nextUnlock(world,stars=0){return unlocksForWorld(world).find(item=>!isUnlocked(item,stars))||null}
