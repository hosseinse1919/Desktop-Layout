import { IActionGroup, IActionItem, IFormOption } from "dsk";

export class ActionGroup implements IActionGroup {
    title!: string;
    items: IActionItem[] =[];
}

export class ActionItem implements IActionItem {
    title!: string;
    icon!: string;
    fnc!: () => void;
}
export class ActionForm implements IFormOption {
    title!: string; 
    form!: string;
    openmode!: boolean;
    hidetitle!: boolean;
}

