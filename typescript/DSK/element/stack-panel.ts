import { IHTML } from "./#IHTML";

 


export class StackPanel extends IHTML {
   
    element!: HTMLDivElement;
   
    constructor(horizontal:boolean =false) {
        super("div");

        this.element.classList.add("stack-panel")
        if(horizontal) this.element.classList.add("-horizontal")
    }

    set Text(value: string) {
        this.element.textContent = value;
    };
}