import React from 'react';
import {createRoot} from 'react-dom/client';
import MainApp from './mainV2.jsx';
import RemoteController from './tv/RemoteController.jsx';

const params=new URLSearchParams(window.location.search);
const remote=params.get('remote');
createRoot(document.getElementById('root')).render(remote?<RemoteController sessionId={decodeURIComponent(remote)}/>:<MainApp/>);
