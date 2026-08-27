import React from 'react';
import {resultForMinigame} from '../game/minigameResult';

export default function MinigameResultOverlay({run,onAgain,onClose}){
  const result=resultForMinigame(run);
  if(!run||result.status==='running')return null;
  const success=result.status==='success';
  return <div className="minigame-result-overlay" role="dialog" aria-modal="true">
    <div className={'minigame-result-card '+(success?'success':'failed')}>
      <div className="minigame-result-emoji">{result.emoji}</div>
      <div className="minigame-result-eyebrow">МИНИ-ИГРА</div>
      <h2>{result.title}</h2>
      <p>{result.message}</p>
      {success&&<div className="minigame-result-reward">+{result.reward} ⭐</div>}
      <div className="minigame-result-actions">
        <button className="primary" onClick={onAgain}>{success?'Играть ещё раз':'Попробовать снова'}</button>
        <button className="secondary" onClick={onClose}>Вернуться в мир</button>
      </div>
    </div>
  </div>
}
