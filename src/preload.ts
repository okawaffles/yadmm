// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import {contextBridge, ipcRenderer} from 'electron';
import IpcRendererEvent = Electron.IpcRendererEvent;
import {ModWithPriority} from "./types/ui";

contextBridge.exposeInMainWorld('electronAPI', {
    getInstalledMods: () => ipcRenderer.invoke('fs:get-mod-list'),
    getModsPriority: () => ipcRenderer.invoke('fs:get-mod-list-priorities'),
    saveModsPriority: (priorities: Array<ModWithPriority>) => ipcRenderer.invoke('fs:save-mod-priorities', priorities),
    toggleModEnabled: (mod_path: string, enabled: boolean) => ipcRenderer.invoke('fs:toggle-mod', mod_path, enabled),
    uninstallMod: (mod_path: string) => ipcRenderer.invoke('fs:uninstall-mod', mod_path),

    cfg_checkGamePath: () => ipcRenderer.invoke('cfg:check-game-path'),
    cfg_getGamePath: () => ipcRenderer.invoke('cfg:get-path'),
    cfg_setGamePath: (p: string) => ipcRenderer.invoke('cfg:set-path', p),
    cfg_getLang: () => ipcRenderer.invoke('cfg:get-lang'),
    cfg_setLang: (lang: 'en' | 'es' | 'ja') => ipcRenderer.invoke('cfg:set-lang', lang),

    launchGame: () => ipcRenderer.invoke('sys:launch-game'),
    openKoFi: () => ipcRenderer.invoke('other:kofi'),
    getDebugString: () => ipcRenderer.invoke('other:debugstr'),

    onGameStatusUpdate: (callback: (data: {status: boolean}) => void) => {
        const listener = (_event: IpcRendererEvent, data: {status: boolean}) => {
            callback(data);
        }

        ipcRenderer.on('game-status', listener);

        return () => {
            ipcRenderer.removeListener('game-status', listener);
        }
    }
});