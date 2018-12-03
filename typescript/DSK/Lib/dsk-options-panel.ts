 
 
import { IActionGroup, IFormOption } from "dsk";
import { DSKSRC } from "./assistance/dsk-templates";

/**
 * Ribbon Class For DeskLayout
 */
export class dskOptions {


    public set Title(v: string) {
        this.elements.TitleBar.innerHTML = v;
    }


    Show() {
        this.Visibility = true;
    }



    /**
     * Page Elements
     */
    private elements = {
        get OptionContainer(): HTMLElement {
            return DSKSRC.ById("dsk-option-container")
        },
        get OptionWindow(): HTMLElement {
            return DSKSRC.ById("dsk-option-window")
        },
        get TitleBar(): HTMLElement {
            return DSKSRC.ById("dsk-option-title")
        },
    }

    public set Visibility(v: boolean) {
        if (v) { this.elements.OptionWindow.classList.remove("hide"); return; }
        this.elements.OptionWindow.classList.add("hide")
    }


    /**
     * Element Templates
     */
    private templates = {
        OptionGroup(options: IFormOption) {

            let c = {
                element: DSKSRC.Make("subject-propery"),
                title: DSKSRC.Make("subject-header"),
                container: DSKSRC.Make("subject-body")
            }



            c.title.appendChild(this.OptionHeader(options.title))

            if(options.openmode)  c.title.classList.add("open-mode")
            if(options.hidetitle)  c.title.classList.add("open-mode","hide")

            c.title.addEventListener("click", _ => { c.title.classList.toggle('open-mode') })
            DSKSRC.MK.append(c.element, [c.title, c.container])
            return c;
        },
        OptionHeader(title: string, iconText: string = "plus-minus-icon"): HTMLElement {
            return DSKSRC.MK.generate(DSKSRC.Make("subject-header"), [DSKSRC.Make("temp-icon", { classname: "x18 " + iconText }), DSKSRC.Make("span", { content: title })])
        },
    }


    /**
     *  Clear All Elements 
     */
    Clear() {
        this.elements.OptionContainer.innerHTML = "";
    }

    /**
     * add One Group to Current
     * @param gp One Group Of Icons
     */
    Add(gp: IFormOption) {

        var t = this.templates.OptionGroup(gp);
        t.container.innerHTML = gp.form;
        this.elements.OptionContainer.appendChild(t.element);

    }

    AddRange(groups: IFormOption[]) {

        groups.forEach(gp => {
            this.Add(gp);
        });
    }

    setContent(txt: string) {

        this.elements.OptionContainer.innerHTML = `<div class="container">${txt}</div>`;
    }

}