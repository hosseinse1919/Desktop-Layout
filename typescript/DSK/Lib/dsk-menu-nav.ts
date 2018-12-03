 
 
import { IActionGroup } from "dsk";
import { DSKSRC } from "./assistance/dsk-templates";

/**
 * Menu Nav Class For DeskLayout
 */
export class dskMenuNav {
    /**
        * Page Elements
        */
    private elements = {

        get MenuContainer(): HTMLElement {
            return DSKSRC.ById("dsk-menu-nav")
        },
    }

    /**
     * Element Templates
     */
    private templates = {
        MenuGroup(title: string) {

            let c = {
                element: DSKSRC.Make("subject-menu"),
                title: DSKSRC.Make("subject-title", { content: title }),
                container: DSKSRC.Make("subject-content")
            }
            DSKSRC.MK.append(c.element, [c.title, c.container])
            return c;

 


        },
        MenuBtn(title: string, iconText: string = "cube-icon"): HTMLElement {
            return DSKSRC.MK.generate(
                DSKSRC.Make("btn-menu-action"),
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
    Add(gp: IActionGroup) {

        var t = this.templates.MenuGroup(gp.title);


        gp.items
            .forEach(n => {
                var btn = this.templates.MenuBtn(n.title, n.icon);
                if (n.fnc) {
                    btn.addEventListener("click", ev => {
                        ev.preventDefault();
                        n.fnc();

                        if (window.innerWidth < 900) {
                            if (DSKSRC.Desk) DSKSRC.apperiance("nav-bar-visibility");
                        }
                    })
                }
                t.container.appendChild(btn)
            });


        this.elements.MenuContainer.appendChild(t.element);

    }

    AddRange(groups: IActionGroup[]) {

        groups.forEach(gp => {
            this.Add(gp);
        });
    }
}