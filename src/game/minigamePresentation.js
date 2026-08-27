export const MINIGAME_PRESENTATION={
 space:{emoji:'🚀',accent:'launch',objective:'Доставь ракету к маяку',success:'Миссия выполнена! Ракета добралась до маяка.',timeout:'Время вышло — попробуем ещё раз?'},
 cars:{emoji:'🏁',accent:'race',objective:'Проедь до финиша',success:'Финиш! Ты выиграл гонку.',timeout:'Гонка окончена — попробуем ещё круг?'},
 trains:{emoji:'🚂',accent:'cargo',objective:'Доставь груз на станцию',success:'Груз доставлен! Поезд приехал вовремя.',timeout:'Поезд опоздал — отправим ещё один рейс?'},
 dinos:{emoji:'🥚',accent:'hunt',objective:'Найди яйца у гнезда',success:'Яйца найдены! Динозавр справился.',timeout:'След потерялся — поиск продолжается?'}
};
export function presentationForWorld(world){return MINIGAME_PRESENTATION[world]||MINIGAME_PRESENTATION.space}
