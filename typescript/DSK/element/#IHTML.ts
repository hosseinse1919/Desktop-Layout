export class IHTML{
    element: HTMLElement;
    constructor(str:string) {
        this.element = document.createElement(str);
    }

    Add(elenew: HTMLElement | IHTML) {
        if ((elenew as IHTML) .element) {
            this.element.appendChild((elenew as IHTML).element);
            return;
        }
        this.element.appendChild((elenew as HTMLElement));
    }

    AddRange(collection: HTMLElement[] | IHTML[]): any {      
        for (const elenew of collection) {
             this.Add(elenew)
        }
    }
    
     
    public get class() : string {
        return this.element.className;
    }
    public set class(v : string) {
        this.element.className = v;
    }
    
}