export const ACTIONS={
 rocket:{title:'Запуск ракеты',verb:'Запустить',message:'🚀 Поехали! Ракета отправляется в полёт.'},
 car:{title:'Покататься',verb:'Поехали',message:'🚗 Машинка мчится по дорожке!'},
 train:{title:'Отправить поезд',verb:'Отправить',message:'🚂 Поезд отправляется со станции.'},
 trex:{title:'Поздороваться',verb:'Поздороваться',message:'🦖 Ти-рекс рычит и машет хвостом!'}
};

export function actionForObject(object){return ACTIONS[object?.type]||{title:'Играть',verb:'Играть',message:'✨ Объект оживает!'}}
