export const MISSIONS={
 space:[{id:'space-launch',title:'Большой запуск',description:'Запусти свою ракету с космодрома',world:'space',objectType:'rocket',pointId:'launch-pad',reward:3}],
 cars:[{id:'car-finish',title:'Гонка',description:'Доставь машинку до финиша',world:'cars',objectType:'car',pointId:'finish',reward:3}],
 trains:[{id:'train-station',title:'Первый рейс',description:'Отправь поезд со станции',world:'trains',objectType:'train',pointId:'station',reward:3}],
 dinos:[{id:'dino-nest',title:'Тайна гнезда',description:'Поздоровайся с динозавром у гнезда',world:'dinos',objectType:'trex',pointId:'nest',reward:3}]
};
export function missionForWorld(world){return MISSIONS[world]?.[0]||null}
export function canStartMission(mission,object){return Boolean(mission&&object&&object.world===mission.world&&object.type===mission.objectType)}
export function isMissionTarget(mission,point){return Boolean(mission&&point&&mission.pointId===point.id)}
export function completeMission(progress,mission){if(!mission)return progress;const completed=progress.completed||{};if(completed[mission.id])return progress;return {completed:{...completed,[mission.id]:true},stars:(progress.stars||0)+mission.reward}}
