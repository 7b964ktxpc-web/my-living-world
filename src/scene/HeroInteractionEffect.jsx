import React from 'react';
import {Float,Text} from '@react-three/drei';

const COPY={
  space:{emoji:'🚀',label:'Запуск ракеты'},
  cars:{emoji:'🚗',label:'Готовим машину'},
  trains:{emoji:'🚂',label:'Запускаем поезд'},
  dinos:{emoji:'🦖',label:'Исследуем след'}
};

export default function HeroInteractionEffect({world,phase,target}){
  if(!target||phase==='ready')return null;
  const copy=COPY[world]||COPY.space;
  const y=phase==='interact'?1.05:.78;
  return <group position={[target.x,-1.2,target.z]}>
    <Float speed={phase==='complete'?3:1.4} floatIntensity={phase==='complete'?.22:.08}>
      <Text position={[0,y,0]} fontSize={phase==='complete'?.2:.15} color="white" anchorX="center">
        {copy.emoji} {phase==='complete'?'Готово!':copy.label}
      </Text>
    </Float>
    {phase==='interact'&&<mesh position={[0,.2,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[.42,.5,32]}/><meshBasicMaterial color="#fbbf24" transparent opacity={.7}/></mesh>}
  </group>;
}
