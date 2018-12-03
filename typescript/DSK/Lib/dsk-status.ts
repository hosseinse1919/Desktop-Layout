 
 
import { DSKSRC } from "./assistance/dsk-templates";

export class dskstatus {

    /**
       * Page Elements
       */


    get statusIcon(): HTMLElement {
        return DSKSRC.ById("dsk-alarm-status")
    }
    get statusText(): HTMLElement {
        return DSKSRC.ById("dsk-status-text")
    }




    setDanger(animate: boolean = false) {
        this.statusIcon.className = "status-danger" + (animate ? " animate" : "");
    }
    setWarning(animate: boolean = false) {
        this.statusIcon.className = "status-warning" + (animate ? " animate" : "");
    }
    setSuccess(animate: boolean = false) {
        this.statusIcon.className = "status-success" + (animate ? " animate" : "");
    }
    setNormal(animate: boolean = false) {
        this.statusIcon.className = (animate ? " animate" : "");
    }

    setStatusText(str: string[] | string) {

        if (typeof str == "string") str = [str];


        this.statusText.innerHTML = "";
        DSKSRC.MK.append(this.statusText, str.map(p => DSKSRC.Make("span", p)))



    }

}