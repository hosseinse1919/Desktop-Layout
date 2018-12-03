import { IHTML } from "./#IHTML";

 


export class FlexRow extends IHTML {
    element!: HTMLDivElement;
   
    constructor(center:boolean =false) {
        super("div");

        this.element.classList.add("fx")
        if(center) this.element.classList.add("-centeralize")
    }

    set Text(value: string) {
        this.element.textContent = value;
    };
}