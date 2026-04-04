export interface ModJSONData {
    id: number | null,
    name: string,
    preview: string,
    submitter: string,
    avi: string,
    upic: string | null,
    caticon: string | null,
    cat: string,
    description: string,
    homepage: string,
    lastupdate: string
}

export interface Mod {
    name: string,
    author: string,
    enabled: boolean,
    id: number,
    version: string,
    path: string,
    mod_json?: ModJSONData,
    imageUrl?: string
}

export interface ModWithPriority extends Mod {
    priority: number
}