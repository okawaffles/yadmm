import {Mod, ModWithPriority} from "./ui";

export {};

declare global {
    interface Window {
        electronAPI: {
            getInstalledMods: () => Promise<{
                success: boolean;
                dml_found: boolean;
                mods: Array<Mod>;
                error?: string;
            }>;
            getModsPriority: () => Promise<{
                success: boolean;
                dml_found: boolean,
                mods: Array<ModWithPriority>;
                error?: string
            }>;
            saveModsPriority: (priorities: Array<ModWithPriority>) => Promise<void>;

            toggleModEnabled: (mod_path: string, enabled: boolean) => void;
            uninstallMod: (mod_path: string) => Promise<boolean>;

            // config
            cfg_checkGamePath: () => boolean;
            cfg_getGamePath: () => string;
            cfg_setGamePath: (p: string) => void;
            // cfg_getLang: () => 'en' | 'es' | 'ja';
            // cfg_setLang: (lang: 'en' | 'es' | 'ja') => void;

            // other
            launchGame: () => Promise<void>;
            onGameStatusUpdate: (callback: (data: {status: boolean}) => void) => CallableFunction<void>;
            openKoFi: () => void;
            getDebugString: () => string;
        };
    }
}