// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    getInstalledMods: () => ipcRenderer.invoke('fs:get-mod-list'),
    toggleModEnabled: (mod_path: string, enabled: boolean) => ipcRenderer.invoke('fs:toggle-mod', mod_path, enabled),

    cfg_checkGamePath: () => ipcRenderer.invoke('cfg:check-game-path'),
    cfg_getGamePath: () => ipcRenderer.invoke('cfg:get-path'),
    cfg_setGamePath: (p: string) => ipcRenderer.invoke('cfg:set-path', p),
    cfg_getLang: () => ipcRenderer.invoke('cfg:get-lang'),
    cfg_setLang: (lang: 'en' | 'es' | 'ja') => ipcRenderer.invoke('cfg:set-lang', lang),

    launchGame: () => ipcRenderer.invoke('sys:launch-game'),
});