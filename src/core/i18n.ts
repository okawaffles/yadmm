import i18next from "i18next";
import {initReactI18next} from "react-i18next";


// eslint-disable-next-line import/no-named-as-default-member
i18next
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'es', 'jp'],
        fallbackLng: 'en',
        debug: true,
        resources: {
            en: {
                translation: {
                    ui: {
                        navbar: {
                            manage: 'Manage',
                            download: 'Download',
                            settings: 'Settings',
                            launch: {
                                ready: 'Launch',
                                in_progress: 'Launching...',
                                running: 'Running',
                                bad_path: 'Please set the path to your Project Diva install folder first!',
                            },
                            dml_notice: {
                                not_found: 'DivaModLoader Not Found',
                                out_of_date: 'DivaModLoader Update Available',
                                app_updating: 'Downloading yadmm Update...',
                                app_manual: 'Update Ready, Click to Install!',
                            }
                        },
                        manage: {
                            title: 'Manage Installed Mods',
                            toggles: {
                                enabled: 'Show Only Enabled',
                                priority: 'Edit Priority Mode'
                            },
                            mod: {
                                enabled: 'Enabled',
                                disabled: 'Disabled',
                                uninstall: 'Uninstall',
                                open: 'Open Folder',
                                has_dma: 'From DivaModArchive',
                                has_gb: 'From GameBanana',
                                update: 'Update Available',
                            },
                            loading: 'Loading mods, please wait...',
                            no_mods: "You don't have any mods installed! yadmm can't help with that yet, but I promise it will be able to soon!",
                            failed: "Failed to load mods, please check your install path in settings!"
                        }
                    }
                }
            },

            es: {
                translation: {
                    ui: {
                        navbar: {
                            manage: 'Dirigir',
                            download: 'Descargar',
                            settings: 'Configuración',
                            launch: {
                                ready: 'Iniciar',
                                in_progress: 'Iniciando...',
                                running: 'En Ejecución',
                                bad_path: '¡Fijar el lugar a tu DivaMegaMix.exe en la configuración por favor!',
                            },
                            dml_notice: {
                                not_found: 'DivaModLoader No Encontrarse',
                                out_of_date: 'Actualización DivaModLoader Disponible',
                                app_updating: 'Actualización yadmm Descargo...',
                                app_manual: 'Actualización Preparado, ¡Haz Clic a Instalar!',
                            }
                        },
                        manage: {
                            title: 'Dirigir Mods Instalado',
                            toggles: {
                                enabled: 'Mostrar solo Permitido',
                                priority: 'Modo Cambiar Prioridad'
                            },
                            mod: {
                                enabled: 'Permitido',
                                disabled: 'No Permitido',
                                uninstall: 'Desinstalar',
                                open: 'Abrir Fólder',
                                has_dma: 'de DivaModArchive',
                                has_gb: 'de GameBanana',
                                update: 'Actualización Disponible',
                            },
                            loading: 'Cargando mods, esperar por favor...',
                            no_mods: "¡No tienes alguna mods instalado! No puedo ayudar con eso ahora mismo.",
                            failed: "Cargar mods fallado, ¡revisar el lugar a tu DivaMegaMix.exe en la configuración por favor!"
                        }
                    }
                }
            }
        }
    });

export default i18next;