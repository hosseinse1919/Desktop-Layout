import { IHTML } from "./#IHTML";

 


export class button extends IHTML {
    element!: HTMLSpanElement;
    constructor() {
        super("button");

    }

    set Text(value: string) {
        this.element.textContent = value;
    };
}