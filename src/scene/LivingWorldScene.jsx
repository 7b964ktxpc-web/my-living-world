import React, { Component, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Text, OrbitControls } from '@react-three/drei';
import LivingObject3D from './LivingObject3D';
import MainCharacters3D from './MainCharacters3D';
import MinigameObjectives3D from './MinigameObjectives3D';
import NPCCharacters3D from './NPCCharacters3D';
import NPCQuestBubble from './NPCQuestBubble';
import CoOpStatusBubble from './CoOpStatusBubble';
import WorldEnvironment3D from './WorldEnvironment3D';
import { defaultSpawn, tickObject } from './worldPhysics.js';
import { actionProgress, actionRunning } from './interactionEngine.js';
import { pointsForWorld, pointForObject } from './worldInteractions.js';
import { idleWorldMotion } from './worldMotion.js';
import { createNpcState, tickNpc, npcReaction } from '../game/npcRuntime.js';
import { guideState } from '../game/npcMissionGuide.js';
import { createCoOpState, applyCoOpEvent } from '../game/coOpRuntime.js';
import { environmentState } from '../game/worldEnvironment.js';

const COLORS = { space: '#202b5a', cars: '#627d63', trains: '#6f6a68', dinos: '#6d995b' };
function Floor({ world }) { return <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]} receiveShadow><planeGeometry args={[12, 7]} /><meshStandardMaterial color={COLORS[world] || COLORS.space} roughness={1} /></mesh>; }
function WorldDecor({ world }) { if (world === 'space') return <Stars radius={45} depth={30} count={900} factor={1.8} />; if (world === 'trains') return <mesh position={[0, -1.15, 0]}><boxGeometry args={[8, 0.06, 0.45]} /><meshStandardMaterial color="#3b3b3b" /></mesh>; return null; }
function MovingObject({ object, index, total, action, onSelect, onPosition }) {
  const [motion, setMotion] = useState(() => ({ ...defaultSpawn(index, total), phase: index * 0.7 }));
  useEffect(() => setMotion({ ...defaultSpawn(index, total), phase: index * 0.7 }), [object.id, index, total]);
  useFrame((_, delta) => setMotion((state) => {
    const running = actionRunning(action) && action.objectId === object.id;
    if (!running) return { ...idleWorldMotion(tickObject(state, Math.min(delta, 0.05), object.world), delta, object.world), phase: state.phase + delta };
    const target = pointForObject(object.world, object.type, index);
    if (!target) return { ...state, phase: state.phase + delta };
    const steer = Math.min(1, delta * 2.8 + Math.sin(actionProgress(action) * Math.PI) * 0.16);
    return { ...state, x: state.x + (target.x - state.x) * steer, z: state.z + (target.z - state.z) * steer, phase: state.phase + delta };
  }));
  useEffect(() => { onPosition?.(object.id, motion); }, [object.id, motion, onPosition]);
  const running = actionRunning(action) && action.objectId === object.id;
  return <group position={[motion.x, object.world === 'space' ? motion.altitude || 0 : -0.08, motion.z]} onClick={(event) => { event.stopPropagation(); onSelect(object); }}><LivingObject3D object={object} actionProgress={running ? actionProgress(action) : 0} actionRunning={running} /></group>;
}
function NpcRuntime({ current, setNpcs, positions }) {
  useFrame((_, delta) => setNpcs((list) => list.map((npc) => {
    const targetObject = current.find((item) => item.id === npc.followTarget?.objectId);
    const target = targetObject ? positions.current[targetObject.id] : npc.followTarget;
    return tickNpc({ ...npc, followTarget: target }, delta);
  })));
  return null;
}
function LivingWorldSceneContent({ world, objects = [], selectedId, selectedCharacterId='slava', onSelect, onCharacterSelect, onPoint, onWorldEvent, action, minigame, collectedObjectives = [], onObjectiveCollect }) {
  const [selected, setSelected] = useState(null); const [npcs, setNpcs] = useState(() => createNpcState(world)); const [npcEvent, setNpcEvent] = useState('idle'); const [coOp, setCoOp] = useState(() => createCoOpState(world));
  const positions = useRef({}); const current = useMemo(() => objects.filter((item) => item.world === world).slice(0, 8), [objects, world]); const points = useMemo(() => pointsForWorld(world), [world]); const guide = guideState(world, collectedObjectives); const environment = environmentState(world, coOp.action, true);
  useEffect(() => setSelected(current.find((item) => item.id === selectedId) || null), [selectedId, current]);
  useEffect(() => { setNpcs(createNpcState(world)); setCoOp(createCoOpState(world)); setNpcEvent('idle'); positions.current = {}; }, [world]);
  const emitCoOp = (event, extra = {}) => { const next = applyCoOpEvent(coOp, event); setCoOp(next); onWorldEvent?.({ ...extra, coOp: next }); };
  const heroActivity = minigame?.status === 'success' ? 'celebrate' : actionRunning(action) ? 'excited' : minigame?.status === 'running' ? 'walking' : 'idle';
  return <Canvas camera={{ position: [0, 1, 6.4], fov: 45 }} shadows onPointerMissed={() => { setSelected(null); onSelect?.(null); }}>
    <ambientLight intensity={1.35} /><directionalLight position={[4, 6, 4]} intensity={2.1} castShadow /><WorldDecor world={world} /><Floor world={world} />
    <MainCharacters3D selectedId={selectedCharacterId} activity={heroActivity} target={guide.objective || environment} onSelect={onCharacterSelect} />
    {environment && <WorldEnvironment3D environment={environment} onActivate={(item) => { emitCoOp('objective', { environmentId: item.id }); onWorldEvent?.({ type: 'environment_activate', environmentId: item.id, world }); }} />}
    {minigame?.status === 'running' && <MinigameObjectives3D world={world} collected={collectedObjectives} onCollect={(item) => { onObjectiveCollect?.(item); emitCoOp('objective', { objectiveId: item?.id }); }} />}
    <NPCCharacters3D npcs={npcs} onEvent={(npc) => { const reaction = npcReaction(npc, 'near'); setNpcEvent(reaction?.state || 'progress'); onWorldEvent?.(reaction); }} />
    {points.map((point) => <Float key={point.id}><Text position={[point.x, 0.1, point.z]} fontSize={0.16} color="white" anchorX="center" onClick={() => onPoint?.(point)}>{point.emoji}</Text></Float>)}
    {current.map((object, index) => <MovingObject key={object.id || index} object={object} index={index} total={current.length} action={action} onPosition={(id, state) => { positions.current[id] = state; }} onSelect={(item) => { setSelected(item); onSelect?.(item); }} />)}
    {selected && <Float><Text position={[0, 1.8, 0]} fontSize={0.22} color="white" anchorX="center">{selected.label || selected.name}</Text></Float>}
    <NPCQuestBubble world={world} event={npcEvent} visible={Boolean(minigame && npcEvent !== 'idle')} /><CoOpStatusBubble world={world} event={coOp.event || 'near'} visible={Boolean(minigame?.status === 'running')} />
    <NpcRuntime current={current} setNpcs={setNpcs} positions={positions} />
    <OrbitControls enablePan={false} minDistance={4} maxDistance={9} />
  </Canvas>;
}
class SceneErrorBoundary extends Component { constructor(props){super(props);this.state={hasError:false,message:''}} static getDerivedStateFromError(error){return {hasError:true,message:error?.message||'Ошибка 3D-сцены'}} componentDidCatch(error){console.error('LivingWorldScene runtime error',error)} render(){if(this.state.hasError)return <div style={{height:'100%',minHeight:420,display:'grid',placeItems:'center',padding:24,background:'#f8fafc',borderRadius:24,fontFamily:'system-ui,sans-serif'}}><div style={{textAlign:'center',maxWidth:420}}><div style={{fontSize:48}}>🌍</div><h3>Мир временно не загрузился</h3><p style={{color:'#64748b'}}>Основное приложение работает. Перезапусти 3D-мир, чтобы продолжить.</p><button onClick={()=>this.setState({hasError:false,message:''})} style={{border:0,borderRadius:12,padding:'10px 16px',fontWeight:700,cursor:'pointer'}}>Перезапустить</button>{this.state.message&&<small style={{display:'block',marginTop:10,color:'#94a3b8'}}>{this.state.message}</small>}</div></div>;return this.props.children}}
export default function LivingWorldScene(props){return <SceneErrorBoundary><LivingWorldSceneContent {...props}/></SceneErrorBoundary>}
