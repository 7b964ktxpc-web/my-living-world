export const MAIN_CHARACTERS={
  slava:{id:'slava',name:'Слава',role:'старший брат',heightScale:1.18,ageLabel:'старший',outfit:{top:'navy-varsity',bottom:'light-pants',shoes:'gray-sneakers',backpack:'dark-backpack',cap:'boston-blue'},personality:'любит приключения и помогает Денису',color:'navy',accent:'sky'},
  denis:{id:'denis',name:'Денис',role:'младший брат',heightScale:.94,ageLabel:'младший',outfit:{top:'navy-varsity',bottom:'dark-pants',shoes:'gray-sneakers',backpack:'dark-backpack',cap:'boston-blue'},personality:'любознательный и добрый',color:'navy',accent:'blue'}
};
export const MAIN_CHARACTER_ORDER=['slava','denis'];
export function mainCharacter(id){return MAIN_CHARACTERS[id]||MAIN_CHARACTERS.slava}
export function mainCharacters(){return MAIN_CHARACTER_ORDER.map(id=>MAIN_CHARACTERS[id])}
export function characterPair(){return {leader:MAIN_CHARACTERS.slava,partner:MAIN_CHARACTERS.denis}}
export const DEFAULT_ACTIVE_HERO='slava';
export function isMainCharacter(id){return MAIN_CHARACTER_ORDER.includes(id)}
export function normalizeActiveHero(id){return isMainCharacter(id)?id:DEFAULT_ACTIVE_HERO}
