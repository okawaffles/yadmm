export {};

declare global {
    interface Window {
        electronAPI: {
            getInstalledMods: () => Promise<{
                success: boolean;
                mods: Array<{name: string, author: string, enabled: boolean, id: number, version: string}>;
                error?: string;
            }>;
        };
    }
}