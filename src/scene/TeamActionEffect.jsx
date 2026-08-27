import React,{useMemo} from 'react';
import {Float,Text} from '@react-three/drei';
import {sceneTeamEvent} from '../game/teamPlayScene';

export default function TeamActionEffect({world,event,position=[0,0,0]}){
  const data=useMemo(()=>sceneTeamEvent(world,event),[world,event]);
  if(!data)return null;
  return <group position={position}>
    <Float speed={1.7} floatIntensity={.2}>
      <mesh scale={data.kind==='celebrate'?1.25:1}>
        <sphereGeometry args={[.28,16,16]}/>
        <meshStandardMaterial color="#ffd166" emissive="#7a5b00" emissiveIntensity={.65}/>
      </mesh>
      <Text position={[0,.5,0]} fontSize={.18} color="white" anchorX="center">{data.emoji}</Text>
    </Float>
  </group>;
}
