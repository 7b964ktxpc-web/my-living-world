import React from 'react';
import {Float,Text} from '@react-three/drei';
import {npcQuestMessage} from '../game/npcQuest';
import {teamPromptFor} from '../game/teamPlay';

export default function NPCQuestBubble({world,event='idle',visible=true}){
  if(!visible)return null;
  const teamPrompt=teamPromptFor(world,event);
  const text=teamPrompt||npcQuestMessage(world,event);
  return <Float speed={1.1} floatIntensity={.12}><Text position={[0,1.55,0]} fontSize={.2} maxWidth={3.8} color="white" anchorX="center" anchorY="middle">{text}</Text></Float>;
}
