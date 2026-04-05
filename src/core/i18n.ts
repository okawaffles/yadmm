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
                            download_none: 'Sorry, download mode isn\'t ready yet.',
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
                                enable_locked: 'This setting cannot be changed while you are editing priority.',
                                priority: 'Edit Priority Mode',
                                priority_warning: 'Remember to toggle off to save changes!',
                            },
                            mod: {
                                enabled: 'Enabled',
                                disabled: 'Disabled',
                                uninstall: 'Uninstall',
                                open: 'Open Folder',
                                dma: 'From DivaModArchive',
                                gamebanana: 'From GameBanana',
                                updatable: 'Update Available!',
                                move_up: 'Move Up',
                                move_down: 'Move Down',
                                no_version: 'No Version Specified',
                                update_checking: 'Checking for Updates...',
                                update_failed: 'Update Check Failed',
                                update_failed_mismatch: 'Update Check Failed: Metadata Name Mismatch',
                                update_confirm: 'Update this mod to the latest version?',
                                updating: 'Updating Mod...',
                            },
                            loading: 'Loading mods, please wait...',
                            loading_priority: 'Loading priority, please wait...',
                            saving_priority: 'Saving priorities, please wait...',
                            no_mods: "You don't have any mods installed! yadmm can't help with that yet, but I promise it will be able to soon!",
                            failed: "Failed to load mods, please check your install path in settings!"
                        },
                        settings: {
                            title: 'Settings',
                            must_set: 'This is required to use yadmm.',
                            path: {
                                heading: 'Game Path',
                                desc: 'Set the path to your Project Diva folder (the folder where DivaMegaMix.exe is located).',
                                current_path: 'Currently, your path is set to:',
                                bad_path: 'DivaMegaMix.exe was not found in this folder. Please check your input.',
                                good_path: 'Found DivaMegaMix.exe, you\'re all set!',
                                update: 'Update Game Path',
                            },
                            lang: {
                                heading: 'Language'
                            },
                            made_with_love: 'made with 💖 by okawaffles | yadmm is developed with no profit incentive, but if you are feeling generous, you can still choose to support me on '
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
                            download_none: 'Lo siento, modo descargar no implementado todavía.',
                            settings: 'Ajustes',
                            launch: {
                                ready: 'Iniciar',
                                in_progress: 'Iniciando...',
                                running: 'En Ejecución',
                                bad_path: '¡Fijar el lugar a tu DivaMegaMix.exe en la ajustes por favor!',
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
                                enable_locked: 'Este ajuste no poder cambiar mientras cambio prioridad.',
                                priority: 'Modo Cambiar Prioridad',
                                priority_warning: '¡Recordar apagar modo cambiar para guardar cambios!',
                            },
                            mod: {
                                enabled: 'Activar',
                                disabled: 'No Activar',
                                uninstall: 'Desinstalar',
                                open: 'Abrir Fólder',
                                dma: 'de DivaModArchive',
                                gamebanana: 'de GameBanana',
                                updatable: 'Actualización Disponible',
                                move_up: 'Mover Arriba',
                                move_down: 'Mover Abajo',
                                no_version: 'Versión No Especificado',
                                update_checking: 'Buscando Actualizaciones...',
                                update_failed: 'Comprobar Actualización Fallido',
                                update_failed_mismatch: 'Comprobar Actualización Fallido: hay un desequilibrios en el nombre de este mod',
                                update_confirm: '¿Actualizar este mod a versión último?',
                                updating: 'Actualizando Mod...'
                            },
                            loading: 'Cargando mods, esperar por favor...',
                            loading_priority: 'Cargando prioridad, esperar por favor...',
                            saving_priority: 'Guardo prioridad, esperar por favor...',
                            no_mods: "¡No tienes alguna mods instalados! No puedo ayudar con eso ahora mismo.",
                            failed: "Cargar mods fallado, ¡revisar el lugar a tu DivaMegaMix.exe en la ajustes por favor!"
                        },
                        settings: {
                            title: 'Configuración',
                            must_set: 'Este es necesario a usar yadmm.',
                            path: {
                                heading: 'El lugar a tu DivaMegaMix.exe',
                                desc: 'Fijar el lugar a tu DivaMegaMix.exe.',
                                current_path: 'Actualmente, tu lugar es:',
                                bad_path: 'DivaMegaMix.exe ha no encontrado. Revisar el lugar por favor.',
                                good_path: 'DivaMegaMix.exe encontrado, ¡tu todos preparado!',
                                update: 'Fijar Lugar Juego',
                            },
                            lang: {
                                heading: 'Idioma'
                            },
                            made_with_love: 'hecho con 💖 de okawaffles | yadmm es creado con no incentivo beneficios, pero si tu eres sintiendo generoso, tu poder donar en '
                        }
                    }
                }
            }
        }
    });

export default i18next;