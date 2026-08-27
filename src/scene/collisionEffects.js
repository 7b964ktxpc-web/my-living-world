import React from 'react';
import {Float} from '@react-three/drei';

const EMOJI={spark:'✨',dust:'💨',brake:'🛑',step:'👣'};
export default function CollisionEffects({world,effect,active}){
 if(!active)return null;
 const emoji=EMOJI[effect]||EMOJI.spark;
 const label=world==='space'?'Космическое столкновение!':world==='cars'?'Ой! Машинки встретились':world==='trains'?'Поезд замедлился':'Динозавры заметили друг друга';
 return <Float speed={2.4} floatIntensity={.18}><group position={[0,1.15,0]}><mesh scale={1.15}><sphereGeometry args={[.24,16,16]}/><meshStandardMaterial transparent opacity={.65} emissive="#fff0a8" emissiveIntensity={1.6}/></mesh><sprite scale={[.9,.45,.45]}><spriteMaterial transparent opacity={.95} depthWrite={false}/></sprite></group><group><></group></Float>;
}

export {labelForCollision};
function labelForCollision(world){return world==='space'?'Космическое столкновение!':world==='cars'?'Ой! Машинки встретились':world==='trains'?'Поезд замедлился':'Динозавры заметили друг друга'}
