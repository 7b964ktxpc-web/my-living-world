const OBJECTIVES={
 space:[{id:'beacon-1',emoji:'⭐',label:'Звезда маяка',x:1.8,z:-.8},{id:'beacon-2',emoji:'⭐',label:'Звезда маяка',x:-1.1,z:.9},{id:'beacon-3',emoji:'⭐',label:'Звезда маяка',x:2.2,z:.95}],
 cars:[{id:'checkpoint-1',emoji:'🏁',label:'Чекпоинт',x:-2,z:0},{id:'checkpoint-2',emoji:'🏁',label:'Чекпоинт',x:0,z:0},{id:'checkpoint-3',emoji:'🏁',label:'Финиш',x:2.7,z:0}],
 trains:[{id:'cargo-1',emoji:'📦',label:'Груз',x:-1.8,z:0},{id:'cargo-2',emoji:'📦',label:'Груз',x:.2,z:0},{id:'cargo-3',emoji:'🚉',label:'Станция',x:2.6,z:0}],
 dinos:[{id:'egg-1',emoji:'🥚',label:'Яйцо',x:-2,z:.9},{id:'egg-2',emoji:'🥚',label:'Яйцо',x:0,z:-.6},{id:'egg-3',emoji:'🥚',label:'Яйцо у гнезда',x:2.1,z:.6}]
};
export function objectivesForWorld(world){return OBJECTIVES[world]||[]}
export function objectiveRadius(world){return world==='trains'?.7:world==='cars'?.65:.7}
export function collectObjectives(world,position,collected=[]){const radius=objectiveRadius(world);return objectivesForWorld(world).filter(o=>!collected.includes(o.id)&&Math.hypot((position.x||0)-o.x,(position.z||0)-o.z)<=radius)}
export function objectiveProgress(world,collected=[]){const all=objectivesForWorld(world);return all.length?collected.filter(id=>all.some(o=>o.id===id)).length/all.length:0}
