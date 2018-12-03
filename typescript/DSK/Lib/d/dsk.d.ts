declare module "dsk" {

    export interface IActionItem {
        title: string;
        icon: string;
        fnc:()=>void
    }

    export interface IActionGroup {
        title: string;
        items: IActionItem[];
    }

    export interface IFormOption {
        title: string;
        form: string;
        openmode?:boolean;
        hidetitle?:boolean;
    }

}

