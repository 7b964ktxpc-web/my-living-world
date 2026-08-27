export const MAIN_CHARACTERS={
  slava:{id:'slava',name:'Слава',role:'старший брат',heightScale:1.16,ageLabel:'старший',outfit:{top:'light-hoodie',bottom:'light-pants',shoes:'light-sneakers',backpack:'dark-backpack'},personality:'любит приключения и помогает Денису',color:'cream',accent:'sky'},
  denis:{id:'denis',name:'Денис',role:'младший брат',heightScale:.96,ageLabel:'младший',outfit:{top:'light-hoodie',bottom:'light-pants',shoes:'light-sneakers',backpack:'dark-backpack'},personality:'любознательный и смелый',color:'cream',accent:'blue'}
};
export const MAIN_CHARACTER_ORDER=['slava','denis'];
export function mainCharacter(id){return MAIN_CHARACTERS[id]||MAIN_CHARACTERS.slava}
export function mainCharacters(){return MAIN_CHARACTER_ORDER.map(id=>MAIN_CHARACTERS[id])}
export function characterPair(){return {leader:MAIN_CHARACTERS.slava,partner:MAIN_CHARACTERS.denis}}
