import React from 'react';
import {presentationForWorld} from './minigamePresentation';
import {minigameProgress} from './minigameEngine';

export default function MinigameOverlay({world,run,onClose}){
 if(!run)return null;
 const p=presentationForWorld(world);const progress=minigameProgress(run);const remaining=Math.max(0,Math.ceil(run.duration*(1-progress)));
 const status=run.status||'running';
 return <div className="minigame-overlay" role="status"><div className="minigame-card"><div className="minigame-title"><span>{p.emoji}</span><div><small>МИНИ-ИГРА</small><h3>{run.id}</h3></div><b>{remaining}с</b></div><p>{status==='running'?p.objective:status==='success'?p.success:p.timeout}</p><div className="minigame-progress"><i style={{width:`${Math.round(progress*100)}%`}}/></div>{status!=='running'&&<button className="secondary" onClick={onClose}>Закрыть</button>}</div></div>;
}
