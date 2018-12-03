import { IHTML } from "./#IHTML";



export class div extends IHTML {
    element!: HTMLDivElement;
    constructor() {
        super("div");
    }

    set Text(value: string) {
        this.element.textContent = value;
    };

    Contain(root: IHTML) {
        this.Add(root);
        return this;
    }

    WithClass(staterclass: string) {
        this.class = staterclass;
        return this;
    }



}