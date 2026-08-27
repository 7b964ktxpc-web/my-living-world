import React,{useEffect,useMemo,useState} from 'react';
import {X,Smartphone,Wifi,Maximize2,Minimize2,Copy,Check} from 'lucide-react';
import LivingWorldScene from '../scene/LivingWorldScene';
import {createTvSession,buildPairingPayload} from './tvSession';
import {createTransport} from './tvTransport';
import {makeHello,makeState,makeControl,safeParseMessage} from './tvProtocol';

export default function TVMode({world='space',objects=[],selectedId=null,action=null,stars=0,onClose,onControl}){
 const [session,setSession]=useState(null);const [connected,setConnected]=useState(false);const [fullscreen,setFullscreen]=useState(false);const [copied,setCopied]=useState(false);const [remote,setRemote]=useState({});const [transport,setTransport]=useState(null);
 useEffect(()=>{const created=createTvSession();setSession(created);const t=createTransport(created.id,{onStatus:s=>setConnected(s==='connected'||s==='local'),onMessage:m=>{if(m.type==='hello'){setConnected(true);t.send(makeState({world,objects,selectedId,action,stars}))}if(m.type==='control'){setRemote(m.payload||{});onControl?.(m.payload||{})}}});t.send(makeHello('tv'));setTransport(t);return()=>t.close()},[]);
 useEffect(()=>{if(!transport)return;transport.send(makeState({world,objects,selectedId,action,stars}))},[transport,world,objects,selectedId,action,stars]);
 useEffect(()=>{if(!transport||!remote?.action)return;transport.send(makeState({world,objects,selectedId,action,stars}));setRemote({})},[remote]);
 useEffect(()=>{document.body.style.overflow=fullscreen?'hidden':'';return()=>{document.body.style.overflow=''}},[fullscreen]);
 const payload=useMemo(()=>session?buildPairingPayload(session):'', [session]);
 const copy=async()=>{try{await navigator.clipboard.writeText(payload);setCopied(true);setTimeout(()=>setCopied(false),1600)}catch{}};
 return <div className={`tv-mode ${fullscreen?'tv-fullscreen':''}`}>
  <div className="tv-topbar"><div><b>Мой живой мир</b><span>TV MODE · {connected?'Телефон подключён':'Ждём телефон'}</span></div><div className="tv-actions"><button onClick={()=>setFullscreen(v=>!v)} title="Полный экран">{fullscreen?<Minimize2 size={18}/>:<Maximize2 size={18}/>}</button><button onClick={onClose} title="Закрыть"><X size={20}/></button></div></div>
  <div className="tv-scene"><LivingWorldScene world={remote?.world||world} objects={objects} selectedId={remote?.objectId||selectedId} action={action}/><div className="tv-hud"><div className="tv-status"><Wifi size={17}/><span>{connected?'Телефон подключён':'Подключите телефон'}</span></div><div className="tv-stars">⭐ {stars}</div></div></div>
  {!connected&&<div className="tv-pair"><div className="pair-icon"><Smartphone size={34}/></div><h2>Подключите телефон</h2><p>Откройте ссылку на телефоне:</p><strong>{session?.id||'——'}</strong><small>Код действует около часа</small><code>{payload}</code><button onClick={copy}>{copied?<><Check size={16}/> Скопировано</>:<><Copy size={16}/> Скопировать ссылку</>}</button></div>}
 </div>
}
