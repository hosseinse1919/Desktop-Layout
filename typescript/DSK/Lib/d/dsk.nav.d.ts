declare module "dsk-options" {

    export interface INavOptions {
        title: string,
        description?: string,
        content:  string
    }
    
    export interface IFrameNavOptions extends INavOptions {
        csslinks?: string[],
        header?: string
    }

    
    
}


