

function MakeMD(lines: string[]): string {
    var post: string[] = [];
    var opened = false;
    var isolated = false;
    var isolatedtext = "";
    lines.forEach((mdline, i) => {
        var exline = mdline.trim();
        if (exline.length == 0) {
            return;
        }

        if (exline.startsWith("```")) {
            if (isolated) {
                isolated = false;
                post.push(`<pre><code>${isolatedtext.replace(/\</g, "&lt;")}</code></pre>`)
                isolatedtext ="";
                return;
            }
            isolated = true;
            return;
        }

        if (isolated) {
            isolatedtext += mdline;
            return;
        }

        if (exline.startsWith("#")) {
            var deg = 0;
            for (let i = 0; i < exline.length; i++) { if (exline[i] == "#") deg = i + 1; else break; }
            if (opened) post.push("</div>")
            post.push(`<h${deg} id="line-${i}">${mdline.substring(deg).trim()}</h${deg}>`)
            if (deg > 1) {
                post.push("<div>")
                opened = true;
            }
            return;
        }

        if (exline.startsWith("!")) {
            post.push(`<img src="${exline.split("(")[1].replace(")", "")}" alt="${exline.split("]")[0].replace("![", "")}">`)
            return;
        }
        if (exline.startsWith("[")) {
            post.push(`<a class="doc-link" href="${exline.split("(")[1].replace(")", "")}" rel="nofollow" target="_blank">${exline.split("]")[0].replace("[", "")}</a>`)
            return;
        }

        if (exline.startsWith("<")) {
            post.push(mdline)
            return;
        }
        if (exline.startsWith("- ")) {
            var content = mdline.substring(mdline.indexOf("-") + 2);
            var innercircle = 0;
            do {
                content = `<ul><li>${content}</li></ul>`;
                innercircle += 4;
            } while (innercircle <= mdline.indexOf("-"));
            post.push(content)
            return;
        }

       
        post.push(`<p dir="auto">${mdline.trim()}</p>`)
    });
    // console.log(post.join(""));

    //#Merging
    // for (let i = 1; i < post.length; i++) {
    //     let before = post[i - 1];
    //     let current = post[i];

    //     if (before.endsWith("</ul>") && current.startsWith("<ul>")) {
    //         before = before.substring(0, before.length - "</ul>".length);
    //         current = current.substring("<ul>".length);
    //         post[i - 1] = before;
    //         post[i] = current;
    //     }

    //     while (before.endsWith("</li></ul></li>") && current.startsWith("<li><ul><li>")) {
    //         before = before.substring(0, before.length - "</ul></li>".length);
    //         current = current.substring("<li><ul>".length);
    //         post[i - 1] = before;
    //         post[i] = current;
    //     }
    // }


    return post.join("");
}



 function MakeTOC(article:HTMLElement) {
    setTimeout(() => {
        var contentel = article.querySelectorAll("h2, h3, h4, h5, h6")

        if (contentel.length == 0) return;

        var k = document.createElement("nav");
        k.className = "toc"
        var title = document.createElement("div")
        title.innerHTML = 'TABLE OF CONTENT';
        k.appendChild(title);

        var content = document.createElement("div")
        content.className = "content-box"
        k.appendChild(content);


        contentel.forEach(h1 => {
            var a = document.createElement("a")
            a.className = h1.tagName.toLowerCase();
            a.href = "#" + h1.id;
            a.innerHTML = h1.innerHTML.trim();
            if (h1.nextElementSibling && h1.nextElementSibling.innerHTML.length == 0) {
                a.innerHTML += `<span class="message text-red">[No Informtion]</span>`
            }
            content.appendChild(a);
        });


        
        var h1 = article.querySelector("h1") as HTMLElement;
        article.insertBefore(k, h1.nextSibling)


    }, 500);
}

function InputById(params: string) {
    return document.getElementById(params) as HTMLInputElement;
}



const searchoptions:{[x:string]:string} ={};

if(window.location.search.length>1)
window.location.search.substring(1).split("&").forEach(p => { searchoptions[p.split("=")[0]] = p.split("=")[1] })


// import { Section } from "./Section";
// import { Div } from "./Div";

// var data = {
//     sections: [{
//         id: 1,
//         title: "authentications"
//     }],
//     subjects: [
//         {
//             id: 1,
//             section: 1,
//             title:"Auth with Phone",
//             position:[100,100]

//         }
//     ]
// }

// function Make(params: string) {
//     return document.createElement(params)
// }
// function DivElement() {
//     return document.createElement("div")
// }






// var mcc = document.getElementById("main-container") as HTMLElement;

// mcc.innerHTML = "";

// data.sections.forEach(p => {

//     var sec = new Section();
//     var txtTitle = new Div(p.title);
//     var container = new Div();
//     sec.children.AddRange([txtTitle, container]);

//     container.children.AddRange(
//     data. subjects.filter(n=>n.section == p.id)
//     .map(c=> new Section(c.title)))
    


//     mcc.appendChild(sec.el);


// })



class Div implements IHtmlLibElement{
    el: HTMLDivElement;
    children = {
        _lenghGet: () => {
            return this.el.children.length;
        },
        get length(): number {
            return this._lenghGet();;
        },
        Add: (elenew: IHtmlLibElement) => {
            this.el.appendChild(elenew.el);
        },
        AddRange: (elenew: IHtmlLibElement[]) => {
            elenew.forEach(c => this.el.appendChild(c.el))
        }
    }
    public set text(v: string) {
        this.el.textContent = v;
    }
    constructor(text: string = "") {
        this.el = document.createElement("div");
        if (text.length > 0) this.el.textContent = text;
    }
}


interface IHtmlLibElement {
    el: HTMLElement;
}


class Section implements IHtmlLibElement {
    el: HTMLElement;
    app = this;
    children = {
        _lenghGet: () => {
            return this.el.children.length;
        },
        get length(): number {
            return this._lenghGet();;
        },
        Add: (elenew: IHtmlLibElement) => {
            this.el.appendChild(elenew.el);
        },
        AddRange: (elenew: IHtmlLibElement[]) => {
            elenew.forEach(c => this.el.appendChild(c.el))
        }
    }
    public set text(v: string) {
        this.el.textContent = v;
    }
    
    constructor(text: string = "") {
        this.el = document.createElement("section");
        if (text.length > 0) this.el.textContent = text;
    }
}

class HTTP {
     GET(Link:string, FNC:(data:string)=>void){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              if(FNC) FNC(this.responseText)
            }
        };
        xhttp.open('GET', Link, true);
        xhttp.send();
     }
     POST(Link:string,data:any, FNC:(data:string)=>void ){

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if(FNC) FNC(this.responseText)
            }
        };
        xhttp.open('POST', Link, true);
        xhttp.send(JSON.stringify(data));
     }
}
 
 


class DesktopFrame {

    private Elements = {
        get txtTitle(): HTMLElement {
            return DSKSRC.ById("dsk-project-title")
        },
    }

  
    Ribbon = new dskRibbon();

    NavigatorMenu = new dskMenuNav();

    QuickActions = new dskQuickAction();

    NavFrame = new DeskNavigation();

    OptionaPanel = new dskOptions();

    StatusBar = new dskstatus();


    set ProjectTitle(title:string){
        this.Elements.txtTitle.innerHTML = title;
    }

}




class csTempIcon extends HTMLElement {
    constructor() {
        super()
        setTimeout(() => {
            var t = this.className.trim().split(" ").filter(y=>y.endsWith("-icon"));

            if(t.length>0) this.innerHTML = DSKSRC.icons[t[0]];


        }, 100);
    }
}

window.customElements.define("temp-icon", csTempIcon)
class IHTML{
    element: HTMLElement;
    constructor(str:string) {
        this.element = document.createElement(str);
    }

    Add(elenew: HTMLElement | IHTML) {
        if ((elenew as IHTML) .element) {
            this.element.appendChild((elenew as IHTML).element);
            return;
        }
        console.log(typeof elenew);
        this.element.appendChild((elenew as HTMLElement));
    }

    
    
     
    public get class() : string {
        return this.element.className;
    }
    public set class(v : string) {
        this.element.className = v;
    }
    
}


class anchor extends IHTML {
    element!: HTMLAnchorElement;
    constructor() {
        super("a");
    }

    set Text(value: string) {
        this.element.textContent = value;
    };



}



class div extends IHTML {
    element!: HTMLDivElement;
    constructor() {
        super("div");
    }

    set Text(value: string) {
        this.element.textContent = value;
    };
 
}

 


class span extends IHTML {
    element!: HTMLSpanElement;
    constructor() {
        super("span");

    }

    set Text(value: string) {
        this.element.textContent = value;
    };
}

 


class StackPanel extends IHTML {
    element!: HTMLDivElement;
   
    constructor() {
        super("div");

        this.element.classList.add("stack-panel")
    }

    set Text(value: string) {
        this.element.textContent = value;
    };
}

class ActionGroup implements IActionGroup {
    title!: string;
    items: IActionItem[] =[];
}

class ActionItem implements IActionItem {
    title!: string;
    icon!: string;
    fnc!: () => void;
}
class ActionForm implements IFormOption {
    title!: string; 
    form!: string;
    openmode!: boolean;
    hidetitle!: boolean;
}







class FrameNavOptions implements IFrameNavOptions {
    csslinks?: string[] | undefined;
    header?: string | undefined;
    title !: string;
    description?: string | undefined;
    content !: string;

}
 
 

/**
 * Menu Nav Class For DeskLayout
 */
class dskMenuNav {
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

 





class DeskNavigation {

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


enum NavContentModes {
    text = "text",
    frame = "frame"
}
 
 

/**
 * Ribbon Class For DeskLayout
 */
class dskOptions {


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
 
 

/**
 * Menu Nav Class For DeskLayout
 */
class dskQuickAction {
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
 
 

class dskstatus {

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
 
 

/**
 * Ribbon Class For DeskLayout
 */
class dskRibbon {

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


interface IDSK {
    icons: {
        [x: string]: string;
    }
    , apperiance: (ev: Event | string) => void
    , ById: (params: string) => HTMLElement
    , Make: (elname: string, options?: IMakeOptions | string) => HTMLElement,
    MK: any
}
var DSKSRC: IDSK = {
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


interface IMakeOptions {
    content?: string;
    classname?: string;
    id?: string;
    stat?: string;
    dir?: string;
}






    interface IActionItem {
        title: string;
        icon: string;
        fnc:()=>void
    }

    interface IActionGroup {
        title: string;
        items: IActionItem[];
    }

    interface IFormOption {
        title: string;
        form: string;
        openmode?:boolean;
        hidetitle?:boolean;
    }




    interface INavOptions {
        title: string,
        description?: string,
        content:  string
    }
    
    interface IFrameNavOptions extends INavOptions {
        csslinks?: string[],
        header?: string
    }

    
    

 



var Desktop =
    new DesktopFrame();


//ribbon test 

// var ribbontheme: IActionGroup = {
//     group: "File",
//     items: [
//         { title: "open", icon: "cube-icon", fnc: () => console.log("action") },
//         { title: "save", icon: "cube-icon", fnc: () => console.log("action 2") },
//         { title: "new", icon: "cube-icon", fnc: () => console.log("action 2") },
//     ]
// }
// var MenuTheme: IActionGroup = {
//     group: "test",
//     items: [
//         { title: "title", icon: "cube-icon", fnc: () => console.log("action") },
//         { title: "title", icon: "cube-icon", fnc: () => console.log("action 2") },
//     ]
// }

// console.log(JSON.stringify(ribbontheme , null ," "));

 

// Desktop.MenuNav.Clear();
// Desktop.MenuNav.Add(MenuTheme);

// Desktop.QuickActions.Clear();
// Desktop.QuickActions.AddRange(ribbontheme.items);

var c1 = DSKSRC.Make("pre", { content: "page 1 Content" });
let c2 = DSKSRC.Make("pre", { content: "page 2 Content" });
let c3 = DSKSRC.Make("div", { content: "page 3 Content with large text" 
+ "<br>" + "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."



 });


c1.style.color = "red"
Desktop.NavFrame.Navigate({title: "page 1",content:"text"}, c1);
c2.style.color = "orange"
Desktop.NavFrame.Navigate({title: "page 2",content:"text"}, c2);
c3.style.color = "pink"
Desktop.NavFrame.Navigate({title: "page 3",description:"description",content:"text"}, c3);



Desktop.OptionaPanel.Clear();


var frm = `<!-- Phone Request -->
<div class="form-bordered">
    <form id="s-form" class="line-theme gray" onsubmit="parent.Invoke.Form(event)">
        <legend>sequence</legend>
        <div class="content">
            <div class="input-control">
                <input placeholder=" " id="s-txttitle" type="text" autocomplete="off">
                <label for="s-txttitle">title</label>
            </div>
            <div class="input-control">
                <input placeholder=" " id="s-txtdesc" type="text" autocomplete="off">
                <label for="s-txtdesc">description</label>
            </div>
            <div class="input-control">
                <input placeholder=" " id="s-txtdepend" type="text" autocomplete="off">
                <label for="s-txtdepend">dependency</label>
            </div>
            <div class="input-control">
                <input placeholder=" " id="s-txttype" type="text" autocomplete="off">
                <label for="s-txttype">type</label>
            </div>
            <div class="input-control"><button type="submit"> Send </button></div>
        </div>
    </form>
</div>`

var frm = `
<!-- Sample Title Request -->
<div class="form-bordered">
<form id="s-form" class="line-theme gray" onsubmit="parent.Invoke.Form(event)">
<legend>sequence</legend>
<div class="content">
<div class="input-control">
<input placeholder=" " id="s-txttitle" type="text" autocomplete="off">
<label for="s-txttitle">title</label>
</div>
<div class="input-control"><button type="submit"> Send </button></div>
</div>
</form>
</div>
`

var ifm: IFormOption = {
    title: "form subject",
    form: frm
}

Desktop.OptionaPanel.AddRange([ifm, ifm, ifm]);

var fr =DSKSRC.Make("iframe",{ classname: "content-frame" }) as HTMLFrameElement;
fr.frameBorder ="0";

fr.src = "./guid/index.html"
var fop : INavOptions={
    title: "guid" ,
    content : "frame",
    description:"./guid"
}
Desktop.NavFrame.Navigate(fop ,fr )