export const MINIGAMES={
 space:{id:'space-rescue',title:'Космическое спасение',intro:'Доставь ракету к маяку и собери 3 звезды.',world:'space',objectType:'rocket',targetPoint:'moon',duration:25,reward:4},
 cars:{id:'city-race',title:'Городская гонка',intro:'Проедь через финиш и не столкнись с препятствиями.',world:'cars',objectType:'car',targetPoint:'finish',duration:20,reward:4},
 trains:{id:'cargo-run',title:'Грузовой рейс',intro:'Довези поезд до станции вовремя.',world:'trains',objectType:'train',targetPoint:'station',duration:30,reward:4},
 dinos:{id:'egg-hunt',title:'Охота за яйцами',intro:'Приведи динозавра к гнезду и найди яйца.',world:'dinos',objectType:'trex',targetPoint:'nest',duration:30,reward:4}
};
export function minigameForWorld(world){return MINIGAMES[world]||null}
export function startMinigame(game,object){if(!game||!object||game.world!==object.world||game.objectType!==object.type)return null;return {id:game.id,startedAt:Date.now(),duration:game.duration,targetPoint:game.targetPoint,objectId:object.id,reward:game.reward,world:game.world,status:'running'} }
export function minigameProgress(run,now=Date.now()){if(!run)return 0;return Math.min(1,Math.max(0,(now-run.startedAt)/(run.duration*1000)))}
export function finishMinigame(run,result='success'){return run?{...run,status:result,finishedAt:Date.now()}:run}
