 
 
import { IActionItem } from "dsk";
import { DSKSRC } from "./assistance/dsk-templates";

/**
 * Menu Nav Class For DeskLayout
 */
export class dskQuickAction {
    /**
        * Page Elements
        */
    private elements = {

        get MenuContainer(): HTMLElement {
            return DSKSRC.ById("dsk-action-menu")
        },
    }

    /**
     * Element Templates
     */
    private templates = {

        MenuBtn(title: string, iconText: string = "cube-icon"): HTMLElement {
            return DSKSRC.MK.generate(
                DSKSRC.Make("btn-action"),
                [
                    DSKSRC.Make("temp-icon", { classname: "x16 " + iconText })
                    , DSKSRC.Make("span", { content: title })
                ])
        },
    }


    /**
     *  Clear All Elements 
     */
    Clear() {
        this.elements.MenuContainer.innerHTML = "";
    }

    /**
     * add One Group to Current
     * @param gp One Group Of Icons
     */
    Add(n: IActionItem) {

        var btn = this.templates.MenuBtn(n.title, n.icon);
        if (n.fnc) {
            btn.addEventListener("click", ev => {
                ev.preventDefault();
                n.fnc();
            })
        }
        
        this.elements.MenuContainer.appendChild(btn);

    }

    AddRange(groups: IActionItem[]) {

        groups.forEach(gp => {
            this.Add(gp);
        });
    }
}