import App = Electron.App;
import path from "node:path";


export function PrepareDeepLinkProtocol(app: App) {
    console.log('registering deep link for divamodmanager: urls')
    if (process.defaultApp) {
        if (process.argv.length >= 2)
            app.setAsDefaultProtocolClient('divamodmanager', process.execPath, [path.resolve(process.argv[1])]);
    } else {
        app.setAsDefaultProtocolClient('divamodmanager');
    }
}