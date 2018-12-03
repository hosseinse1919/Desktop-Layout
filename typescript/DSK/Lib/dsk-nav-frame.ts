
import { DSKSRC } from "./assistance/dsk-templates";
import { INavOptions, IFrameNavOptions } from "dsk-options";
import { IHTML } from "../../element/#IHTML";
 





export class DeskNavigation {

    private tabcounter = 1;

    private get MainFarme(): HTMLElement {
        return DSKSRC.ById("dsk-main-frame");
    }
    private get MainNav(): HTMLElement {
        return DSKSRC.ById("dsk-tab-list");
    }

    private AddNav(id: string, display: INavOptions) {
        let elContainer = DSKSRC.Make("page-tab")
        elContainer.setAttribute("data-target", id);

        let elTitleLink = DSKSRC.MK.generate(DSKSRC.Make("page-tab-title"), [DSKSRC.Make("span", { content: display.title })]);

        //todo 
        if (display.description) {
            elTitleLink.title = display.description;
            elTitleLink.appendChild(DSKSRC.Make("span", { content: display.description }));
        }

        elTitleLink.addEventListener("click", () => {
            this.Invoke(id)
        })

        let elCloseTab = DSKSRC.Make("page-tab-close", { content: "&times;" });
        elCloseTab.title = "close";
        elCloseTab.addEventListener("click", () => {
            this.Close(id)
        })



        elContainer.appendChild(elTitleLink);



        elContainer.appendChild(elCloseTab);
        this.MainNav.appendChild(elContainer);
    }


    private Invoke(str: string) {
        this.MainNav.querySelectorAll("page-tab").forEach(p => {
            if (p.getAttribute("data-target") == str) {
                p.classList.add("active")
            }
            else {
                p.classList.remove("active")
            }

        });

        Array.from(this.MainFarme.children).forEach(p => {
            if (p.id == str) {
                p.classList.remove("hidden")
            }
            else {
                p.classList.add("hidden")
            }
        });
    }

    private Close(str: string) {
        this.MainNav.querySelectorAll("page-tab").forEach(p => {
            if (p.getAttribute("data-target") == str) {
                this.MainNav.removeChild(p)
            }
        });

        Array.from(this.MainFarme.children).forEach(p => {
            if (p.id == str) {
                this.MainFarme.removeChild(p)
            }
        });

        var m = this.MainNav.querySelectorAll("page-tab");
        if (m.length > 0) {
            this.Invoke(m[m.length - 1].getAttribute("data-target") as string)
        }
    }

    CloseAll() {
        this.MainNav.querySelectorAll("page-tab").forEach(p => {
            this.MainNav.removeChild(p)
        });
        Array.from(this.MainFarme.children).forEach(p => {
            this.MainFarme.removeChild(p)
        });
    }

    Navigate(frameoption: INavOptions, content: HTMLElement | string | IHTML) {
        let id = "tab-nav-" + this.tabcounter++;
        let r = DSKSRC.Make("div");
        r.id = id;

 

        if (frameoption.content == "html") {
            r.appendChild((content as IHTML).element);
            r.className = "container";
        }
        if (frameoption.content == "text") {
            r.className = "container";
            r.innerHTML = content as string;
        }
        
        if (frameoption.content == "frame") {
            r.appendChild(content as HTMLElement);   
        }
      
        this.MainFarme.appendChild(r);


        this.AddNav(id, frameoption);
        this.Invoke(id);
    }
    FrameNavigate(
        options: IFrameNavOptions , content: HTMLElement | string
    ) {
        let FR = DSKSRC.Make("iframe", { classname: "content-frame" }) as HTMLFrameElement;
        FR.frameBorder = "0";



        

        var op: INavOptions = {
            title: options.title,
            content: NavContentModes.frame
        }

        this.Navigate(op, FR);



        let Fwindow = (FR.contentWindow as Window);
        if (options.csslinks)
            options.csslinks.forEach(csslink => {
                let css = DSKSRC.Make("link") as HTMLLinkElement;
                css.rel = "stylesheet";
                css.href = csslink;
                if (Fwindow.document && Fwindow.document.head)
                    Fwindow.document.head.appendChild(css);
            });
        if (options.header)
            Fwindow.document.body.innerHTML += options.header;

        if (typeof content == "string")
            Fwindow.document.body.innerHTML = content;
        else
            Fwindow.document.body.appendChild(content);

            return FR.contentDocument as Document;
    }

}


export enum NavContentModes {
    text = "text",
    frame = "frame"
}