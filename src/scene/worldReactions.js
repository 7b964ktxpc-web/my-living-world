export const REACTION_RULES={
 space:{arrival:'Космодром активирован! 🚀', effects:['starBurst','engineGlow']},
 cars:{arrival:'Финиш пройден! 🏁', effects:['dust','confetti']},
 trains:{arrival:'Поезд прибыл на станцию! 🚉', effects:['steam','spark']},
 dinos:{arrival:'Динозавр нашёл гнездо! 🥚', effects:['footprint','sparkle']}
};
export function reactionForWorld(world){return REACTION_RULES[world]||REACTION_RULES.space}
export function reactionForEvent(world,event){const r=reactionForWorld(world);return {message:event?.message||r.arrival,effects:r.effects,world,at:Date.now()}}
