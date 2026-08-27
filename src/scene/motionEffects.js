import React,{useMemo} from 'react';
import {Float} from '@react-three/drei';

const configs={
 cars:{emoji:'💨',count:3,spread:1.1,life:.7},
 trains:{emoji:'✨',count:4,spread:.8,life:.6},
 space:{emoji:'⭐',count:5,spread:1.4,life:.9},
 dinos:{emoji:'👣',count:3,spread:1.0,life:1.1}
};

export function MotionEffects({world,running=false,arrived=false}){
 const cfg=configs[world]||configs.space;
 const particles=useMemo(()=>Array.from({length:cfg.count},(_,i)=>({id:i,x:(i-(cfg.count-1)/2)*cfg.spread*.55,z:Math.sin(i*1.8)*.22})),[cfg.count,cfg.spread]);
 if(!running&&!arrived)return null;
 return <group>{particles.map(p=><Float key={p.id} speed={1.2+p.id*.1} floatIntensity={.2}><group position={[p.x,-.35,p.z]} scale={running?.55:1}><mesh visible={world!=='dinos'}><sphereGeometry args={[.09,10,10]}/><meshStandardMaterial color={world==='space'?'#f6d365':'#d6d6d6'} emissive={world==='space'?'#f6d365':'#777'} emissiveIntensity={.7}/></mesh></group></Float>)}</group>;
}
