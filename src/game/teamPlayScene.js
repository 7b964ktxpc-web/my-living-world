import {teamActionFor} from './teamPlay.js';

export function sceneTeamEvent(world,event){
  const action=teamActionFor(world,event);
  if(!action)return null;
  const presets={
    'prepare-launch':{kind:'launchPad',emoji:'🚀'},
    'scan-beacon':{kind:'beacon',emoji:'⭐'},
    'celebrate-launch':{kind:'celebrate',emoji:'🎉'},
    'open-garage':{kind:'garage',emoji:'🔧'},
    'unlock-checkpoint':{kind:'checkpoint',emoji:'🏁'},
    'wave-finish-flag':{kind:'finish',emoji:'🏁'},
    'load-cargo':{kind:'cargo',emoji:'📦'},
    'open-next-station':{kind:'station',emoji:'🚉'},
    'signal-arrival':{kind:'signal',emoji:'🚦'},
    'prepare-search':{kind:'search',emoji:'🦖'},
    'mark-next-egg':{kind:'egg',emoji:'🥚'},
    'celebrate-find':{kind:'celebrate',emoji:'🎉'}
  };
  return {world,event,action,...(presets[action]||{kind:'generic',emoji:'✨'})};
}
