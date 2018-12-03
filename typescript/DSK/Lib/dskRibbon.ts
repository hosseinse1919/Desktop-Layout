 
 
import {  IActionGroup } from "dsk";
import { DSKSRC } from "./assistance/dsk-templates";

/**
 * Ribbon Class For DeskLayout
 */
export class dskRibbon {

    /**
     * Page Elements
     */
    private elements = {
       
        get RibbonContainer(): HTMLElement {
            return DSKSRC.ById("dsk-ribbon")
        },
    }

    /**
     * Element Templates
     */
    private templates = {
        RibbonGroup(title: string) {

            let c = {
                element: DSKSRC.Make("group-items"),
                title: DSKSRC.Make("gp-head", { content: title }),
                container: DSKSRC.Make("gp-body")
            }
            DSKSRC.MK.append(c.element, [c.title, c.container])
            return c;
        },
        RibbonBtn(title: string, iconText: string = "cube-icon"): HTMLElement {
            return DSKSRC.MK.generate(DSKSRC.Make("btn-ribbon"), [DSKSRC.Make("temp-icon", { classname: "x32 " + iconText }), DSKSRC.Make("span", { content: title })])
        },
    }


    /**
     *  Clear All Elements 
     */
    Clear() {
        this.elements.RibbonContainer.innerHTML = "";
    }

    /**
     *  Clear All Elements 
     */
    Show() {
        this.elements.RibbonContainer.classList.remove("hide");
    }

    /**
     * add One Group to Current
     * @param gp One Group Of Icons
     */
    Add(gp: IActionGroup) {

        var t = this.templates.RibbonGroup(gp.title);


        gp.items
            .forEach(n => {
                var btn = this.templates.RibbonBtn(n.title, n.icon);
                if (n.fnc) {
                    btn.addEventListener("click", ev => {
                        ev.preventDefault();
                        n.fnc();
                    })
                }
                t.container.appendChild(btn)
            });


        this.elements.RibbonContainer.appendChild(t.element);

    }

    AddRange(groups: IActionGroup[]) {

        groups.forEach(gp => {
            this.Add(gp);
        });
    }

}