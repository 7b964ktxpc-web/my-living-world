export const INTERACTION_STATE={idle:'idle',playing:'playing',selected:'selected'};
export function nextInteraction(state='idle',action='select'){if(action==='play')return 'playing';if(action==='stop')return 'idle';if(action==='select')return 'selected';return state}
