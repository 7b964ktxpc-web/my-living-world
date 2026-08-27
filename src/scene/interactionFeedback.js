export const FEEDBACK_FOR_WORLD={
  space:{emoji:'✨',text:'Космический контакт!',duration:900},
  cars:{emoji:'💨',text:'Встреча на дороге!',duration:650},
  trains:{emoji:'🚉',text:'Внимание на пути!',duration:1000},
  dinos:{emoji:'🦖',text:'Динозавры познакомились!',duration:1100}
};
export function feedbackForWorld(world){return FEEDBACK_FOR_WORLD[world]||FEEDBACK_FOR_WORLD.space}
