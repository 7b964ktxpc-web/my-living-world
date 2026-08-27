import React,{useEffect,useMemo,useState} from 'react';
import {X,Smartphone,Wifi,Maximize2,Minimize2} from 'lucide-react';
import LivingWorldScene from '../scene/LivingWorldScene';
import {createTvSession,buildPairingPayload} from './tvSession';

export default function TVMode({world='space',objects=[],selectedId=null,action=null,stars=0,onClose}){
 const [session,setSession]=useState(null);const [connected,setConnected]=useState(false);const [fullscreen,setFullscreen]=useState(false);
 useEffect(()=>{const created=createTvSession();setSession(created);const timer=setTimeout(()=>setConnected(true),900);return()=>clearTimeout(timer)},[]);
 useEffect(()=>{document.body.style.overflow=fullscreen?'hidden':'';return()=>{document.body.style.overflow=''}},[fullscreen]);
 const payload=useMemo(()=>session?buildPairingPayload(session):'', [session]);
 return <div className={`tv-mode ${fullscreen?'tv-fullscreen':''}`}>
  <div className="tv-topbar"><div><b>Мой живой мир</b><span>TV MODE · {connected?'Телефон подключён':'Ждём телефон'}</span></div><div className="tv-actions"><button onClick={()=>setFullscreen(v=>!v)} title="Полный экран">{fullscreen?<Minimize2 size={18}/>:<Maximize2 size={18}/>}</button><button onClick={onClose} title="Закрыть"><X size={20}/></button></div></div>
  <div className="tv-scene"><LivingWorldScene world={world} objects={objects} selectedId={selectedId} action={action}/><div className="tv-hud"><div className="tv-status"><Wifi size={17}/><span>{connected?'Телефон подключён':'Подключите телефон'}</span></div><div className="tv-stars">⭐ {stars}</div></div></div>
  {!connected&&<div className="tv-pair"><div className="pair-icon"><Smartphone size={34}/></div><h2>Откройте приложение на телефоне</h2><p>Введите код подключения на телефоне:</p><strong>{session?.id||'——'}</strong><small>Код действует около часа</small><code>{payload}</code></div>}
 </div>
}
