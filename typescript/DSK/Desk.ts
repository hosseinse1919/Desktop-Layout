import { dskRibbon } from "./Lib/dskRibbon";
import { dskMenuNav } from "./Lib/dsk-menu-nav";
 
import { dskQuickAction } from "./Lib/dsk-quick-actions";
 
import { dskstatus } from "./Lib/dsk-status";
import { DSKSRC } from "./Lib/assistance/dsk-templates";
import { DeskNavigation } from "./Lib/dsk-nav-frame";
import { dskOptions } from "./Lib/dsk-options-panel";


export class DesktopFrame {

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

