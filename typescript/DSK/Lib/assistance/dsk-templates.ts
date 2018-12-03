

interface IDSK {
    icons: {
        [x: string]: string;
    }
    , apperiance: (ev: Event | string) => void
    , ById: (params: string) => HTMLElement
    , Make: (elname: string, options?: IMakeOptions | string) => HTMLElement,
    MK: any
}
export var DSKSRC: IDSK = {
    icons: {
        "cube-icon": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="20 40 80 80"> <path d="M60,120L20,100 20,60 60,40 100,60 100,100Z M20,60 60,80 100,60 M60,120L60,80"></path> </svg>`
        , "plus-minus-icon": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"> <path d="M0,0L120,0 120,120 0,120Z"></path> <path d="M20,60L100,60"></path> <path class="close-state" d="M60,20 60,100"></path> </svg>`
        , "left-bar-icon": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path class="cls-1" d="M28,28H484V484H28ZM256.5,467.5h211V44.5h-211Z"/></svg>`
        , "right-side-icon": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path class="cls-1" d="M484,484H28V28H484ZM255.5,44.5H44.5v423h211Z"/></svg>`
        , "top-bar-icon": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path class="cls-1" d="M484,28V484H28V28ZM44.5,156.5v311h423v-311Z"/></svg>`
        , "status-bar-icon": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path class="cls-1" d="M28,484V28H484V484Zm439.5-68.5V44.5H44.5v371Z"/></svg>`
        , "gear-icon": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path d="M499,314.19V195.25H451.12a201.45,201.45,0,0,0-15.68-36.39L469,125.32l-84.1-84.1L350,76.08a201.38,201.38,0,0,0-33.26-13.44V13H197.81V63A201.32,201.32,0,0,0,163.32,77.4L127.13,41.22,43,125.32l36,36a201.45,201.45,0,0,0-14.33,33.91H13V314.19H63.54a201.1,201.1,0,0,0,13.82,34.54L41.22,384.87l84.1,84.1,34.82-34.81a201.55,201.55,0,0,0,37.67,16.09V499H316.75V450.64a201.47,201.47,0,0,0,36.46-15.13L386.68,469l84.1-84.1-33.62-33.63a201.58,201.58,0,0,0,15.14-37.05ZM380.06,256.64A122.14,122.14,0,1,1,257.92,134.5,122.28,122.28,0,0,1,380.06,256.64Z"/></svg>`
        , "status-icon": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 20"> <path d="M0,0L20,0 20,20 0,20Z"></path> <path d="M30,0 50,0 50,20 30,20Z"></path> <path d="M60,0 80,0 80,20 60,20Z"></path> </svg>`
    },
    apperiance(ev: Event | string) {
        var cmdf = ""
        if (typeof ev == "string") {
            cmdf = ev;
        }
        else {
            cmdf = (ev.currentTarget as HTMLElement).getAttribute("data-command") as string;
        }

        //todo save settings
        if (cmdf == "nav-bar-visibility") {
            this.ById("dsk-navigator").classList.toggle("hide");
        }
        if (cmdf == "ribbon-visibility") {
            this.ById("dsk-ribbon").classList.toggle("hide");
        }
        if (cmdf == "option-bar-visibility") {
            this.ById("dsk-option-window").classList.toggle("hide");
        }
        if (cmdf == "status-bar-visibility") {
            this.ById("dsk-footer").classList.toggle("hide");
        }
    },
    ById: (params: string) => {
        return document.getElementById(params) as HTMLElement;
    },
    Make(elname: string, options: IMakeOptions | string = {}) {


        let m = document.createElement(elname);

        if (typeof options == "string") {
            m.innerHTML = options;
        }
        else {
            if (options.id) m.id = options.id;
            if (options.content) m.innerHTML = options.content;
            if (options.classname) m.className = options.classname;
            if (options.stat) m.setAttribute("data-stat", options.stat)
            if (options.dir) m.dir = options.dir;

        }
        return m;

    },


    MK: {
        append(el: HTMLElement | ShadowRoot, ch: HTMLElement[]) {

            ch.forEach(element => {
                el.appendChild(element);
            });

        },
        generate(el: HTMLElement, ch: HTMLElement[]) {

            ch.forEach(element => {
                el.appendChild(element);
            });
            return el;
        },
        getParent(el: HTMLElement, tagName: string) {
            var parent = el;
            while (parent.tagName.toLowerCase() != tagName) parent = parent.parentElement as HTMLElement;
            return parent;
        },
        IntAttr(el: HTMLElement, ch: string) {

            return parseInt(el.getAttribute(ch) as string)
        },
        AddAction(elenew: HTMLElement[], fnc: (y: HTMLElement) => void) {
            elenew.forEach(c => fnc(c))
        }
    }





}


export interface IMakeOptions {
    content?: string;
    classname?: string;
    id?: string;
    stat?: string;
    dir?: string;
}



