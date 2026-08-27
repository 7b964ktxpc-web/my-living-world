import React from 'react';
import {Lock,Printer,CheckCircle2} from 'lucide-react';
import {templatesForWorld} from './templateCatalog';
import {isUnlocked} from '../game/unlocks';
import {openPrintTemplate} from './printTemplate';
export default function TemplateGallery({world,stars=0,onLocked}){const templates=templatesForWorld(world);return <div className="template-gallery"><div className="template-gallery-head"><div><span>РАСКРАСКИ</span><h3>Выбери, что распечатать</h3></div><small>{stars} ⭐</small></div><div className="template-grid">{templates.map(t=>{const unlocked=isUnlocked(t,stars);return <button type="button" key={t.id} className={'template-tile '+(unlocked?'':'locked')} onClick={()=>unlocked?openPrintTemplate(t,world):onLocked?.(t)}><div className="template-art">{t.emoji}</div><div className="template-copy"><b>{t.label}</b><span>{unlocked?'Распечатать · '+t.description:`Откроется на ${t.requiredStars} ⭐`}</span></div><div className="template-action">{unlocked?<><CheckCircle2 size={16}/><Printer size={16}/></>:<Lock size={17}/>}</div></button>})}</div></div>}
