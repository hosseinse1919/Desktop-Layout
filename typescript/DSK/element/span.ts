import { IHTML } from "./#IHTML";

 


export class span extends IHTML {
    element!: HTMLSpanElement;
    constructor(p:string ="") {
        super("span");

        if(p.length>0) this.element.textContent = p;

    }

    set Text(value: string) {
        this.element.textContent = value;
    };
}