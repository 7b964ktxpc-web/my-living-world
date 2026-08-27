export const COLLISION_RESPONSE={
  space:{duration:0.7,push:0.35,effect:'spark'},
  cars:{duration:0.45,push:0.5,effect:'dust'},
  trains:{duration:0.85,push:0,effect:'brake'},
  dinos:{duration:0.9,push:0.25,effect:'step'}
};

export function responseForWorld(world){return COLLISION_RESPONSE[world]||COLLISION_RESPONSE.space}

export function applyCollisionResponse(state,{normalX=0,normalZ=0}={},world){
 const cfg=responseForWorld(world);
 return {...state,x:(state.x||0)+normalX*cfg.push,z:(state.z||0)+normalZ*cfg.push,velocity:Math.max(0,Number(state.velocity||0)*(cfg.effect==='brake'?.35:.72)),collisionUntil:Date.now()+cfg.duration*1000,collisionEffect:cfg.effect};
}

export function collisionActive(state){return Number(state?.collisionUntil||0)>Date.now()}
