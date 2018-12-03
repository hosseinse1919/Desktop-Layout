import { IHTML } from "./#IHTML";


export class anchor extends IHTML {
    element!: HTMLAnchorElement;
    constructor() {
        super("a");
    }

    set Text(value: string) {
        this.element.textContent = value;
    };



}