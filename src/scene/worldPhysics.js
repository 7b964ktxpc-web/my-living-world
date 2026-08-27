export const WORLD_RULES={
 space:{speed:.7,bounds:{x:4,z:2},wrap:true},
 cars:{speed:1.2,bounds:{x:4,z:1.8},wrap:true},
 trains:{speed:.9,bounds:{x:4,z:1.2},wrap:true},
 dinos:{speed:.32,bounds:{x:3.5,z:1.8},wrap:true}
};

export function tickObject(state,delta,world){
 const rule=WORLD_RULES[world]||WORLD_RULES.space;
 const direction=state.direction||1;
 let x=(state.x||0)+direction*rule.speed*delta;
 if(rule.wrap&&x>rule.bounds.x)x=-rule.bounds.x;
 if(rule.wrap&&x<-rule.bounds.x)x=rule.bounds.x;
 return {...state,x,direction};
}

export function defaultSpawn(index,total=1){
 const cols=Math.max(1,Math.ceil(Math.sqrt(total)));
 return {x:((index%cols)-(cols-1)/2)*1.8,z:(Math.floor(index/cols)%2)*1.1-.55,direction:index%2? -1:1};
}
