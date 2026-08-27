const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));

export function applyWorldInput(state,input,world,delta){
 const dt=Math.min(Math.max(delta,0),.05);
 const x=Number(input?.x)||0;
 const z=Number(input?.z)||0;
 if(world==='cars'){
  const speed=(2.1+Math.max(0,-z)*3.2)*dt;
  const steer=x*1.7*dt;
  return {...state,x:clamp(state.x+Math.sin(state.heading)*speed,-4,4),z:clamp(state.z+Math.cos(state.heading)*speed,-2.1,2.1),heading:state.heading+steer,velocity:speed/dt,mode:'drive'};
 }
 if(world==='trains'){
  const railSpeed=(z||0)*2.3*dt;
  return {...state,x:clamp(state.x+railSpeed,-3.9,3.9),z:0,velocity:railSpeed/dt,mode:'rail'};
 }
 if(world==='space'){
  const thrust=2.6*dt;
  return {...state,x:clamp(state.x+x*thrust,-4,4),z:clamp(state.z+z*thrust,-2.1,2.1),altitude:clamp((state.altitude||0)+(-z)*1.2*dt, -1,1),velocity:Math.hypot(x,z)*2.6,mode:'flight'};
 }
 const walk=1.6*dt;
 return {...state,x:clamp(state.x+x*walk,-4,4),z:clamp(state.z+z*walk,-2.1,2.1),velocity:Math.hypot(x,z)*1.6,mode:'walk'};
}

export function idleWorldMotion(state,delta,world){
 const dt=Math.min(Math.max(delta,0),.05);
 if(world==='trains')return {...state,x:Math.max(-4,Math.min(4,state.x+Math.sin(state.phase)*.08*dt))};
 return state;
}
