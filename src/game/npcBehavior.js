const WORLD_BEHAVIORS={
 space:{followDistance:1.25,greetDistance:.85,speed:.45},
 cars:{followDistance:1.05,greetDistance:.75,speed:.52},
 trains:{followDistance:1.4,greetDistance:.9,speed:.3},
 dinos:{followDistance:1.15,greetDistance:.85,speed:.4}
};
export function behaviorForWorld(world){return WORLD_BEHAVIORS[world]||WORLD_BEHAVIORS.space}
export function nextNpcBehavior(npc,{target=null,event=null}={}){
 if(!npc)return npc;
 if(event==='success')return {...npc,state:'celebrate',followTarget:null};
 if(event==='objective')return {...npc,state:'pointing',followTarget:null};
 if(target){const cfg=behaviorForWorld(npc.world);const d=Math.hypot((target.x||0)-npc.x,(target.z||0)-npc.z);if(d<=cfg.greetDistance)return {...npc,state:'greeting',followTarget:target.id||null};if(d>cfg.followDistance*1.8)return {...npc,state:'following',followTarget:target.id||null}}
 return {...npc,state:npc.state==='greeting'?'idle':npc.state,followTarget:npc.followTarget||null};
}
export function followTargetStep(npc,target,delta){
 if(!npc||!target)return npc;
 const cfg=behaviorForWorld(npc.world); const dx=(target.x||0)-npc.x; const dz=(target.z||0)-npc.z; const d=Math.hypot(dx,dz); if(d<cfg.followDistance)return nextNpcBehavior(npc,{target});
 const step=Math.min(d,cfg.speed*Math.max(0,delta||0)); return {...npc,x:npc.x+(dx/d)*step,z:npc.z+(dz/d)*step,heading:Math.atan2(dx,dz),state:'following',updatedAt:Date.now()};
}
