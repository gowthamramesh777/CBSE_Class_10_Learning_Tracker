// preload.js
// Intentionally minimal — we don't expose Node by default.
// If you later need native file dialogues or native storage, add IPC handlers here.

const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('__APP_INFO__', {
  name: 'CBSE Class10 Tracker',
  version: '1.0.0'
});
