import React,{useRef} from 'react';
import {Float,Text} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import {objectivesForWorld} from '../game/minigameObjectives.js';
function Objective({item,collected,onCollect,active}){const ref=useRef();useFrame((state)=>{if(ref.current)ref.current.rotation.y=state.clock.elapsedTime*.9});if(collected)return null;return <group position={[item.x,-.65,item.z]}><Float speed={1.5} floatIntensity={.25}><mesh ref={ref} onClick={e=>{e.stopPropagation();onCollect?.(item)}}><sphereGeometry args={[.22,18,18]}/><meshStandardMaterial color="#ffd166" emissive="#7a5b00" emissiveIntensity={active?.65:.25}/></mesh><Text position={[0,.4,0]} fontSize={.15} color="white" anchorX="center">{item.emoji}</Text></Float></group>}
export default function MinigameObjectives3D({world,collected=[],onCollect}){return <>{objectivesForWorld(world).map((item,i)=><Objective key={item.id} item={item} collected={collected.includes(item.id)} active={i===collected.length} onCollect={onCollect}/>)}</>}
