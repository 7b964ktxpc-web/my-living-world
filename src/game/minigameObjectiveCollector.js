export function objectiveHits(world,position,objectives,collected=[]){
 const radius=world==='trains'?.75:world==='cars'?.7:.72;
 return objectives.filter(item=>!collected.includes(item.id)&&Math.hypot((position?.x||0)-item.x,(position?.z||0)-item.z)<=radius);
}

export function addCollectedObjectives(collected,hits=[]){
 const next=new Set(collected||[]);
 hits.forEach(item=>next.add(item.id));
 return [...next];
}
