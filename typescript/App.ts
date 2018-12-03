import { DesktopFrame } from "./DSK/Desk";
import { IActionGroup, IFormOption } from "dsk";
 
import { DSKSRC } from "./DSK/Lib/assistance/dsk-templates";
import { INavOptions } from "dsk-options";



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