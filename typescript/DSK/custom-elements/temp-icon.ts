import { DSKSRC } from "../Lib/assistance/dsk-templates";


export class csTempIcon extends HTMLElement {
    constructor() {
        super()
        setTimeout(() => {
            var t = this.className.trim().split(" ").filter(y=>y.endsWith("-icon"));

            if(t.length>0) this.innerHTML = DSKSRC.icons[t[0]];


        }, 100);
    }
}

window.customElements.define("temp-icon", csTempIcon)