import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
export default defineConfig({plugins:[react(),{name:'canonical-world-scene',resolveId(source,importer){if(importer?.endsWith('/src/main.jsx')&&(source==='./scene/WorldScene'||source.endsWith('/scene/WorldScene')))return path.resolve(process.cwd(),'src/scene/WorldSceneCanonical.jsx');return null;}}]});
