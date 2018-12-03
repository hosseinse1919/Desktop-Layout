# Desktop Layout Application

version 2 - October - 7 - 2018

## Header

contain

- project name
- operation Buttons (add later)
- setting Button

### Chnage Project Title

to change project title use `ProjectTitle` property

#### Properties

```javascript
   $.ProjectTitle = "title"
```
 
## Ribbon

Can have Set of Icons

use ActionGroupItems

```javascript
let ActionGroup = {
    group: "File",
    items: [
        { title: "open", icon: "cube-icon", fnc: () => console.log("action") },
        { title: "save", icon: "cube-icon", fnc: () => console.log("action 2") },
        { title: "new", icon: "cube-icon", fnc: () => console.log("action 2") },
    ]
}

$.Ribbon.Clear();
$.Ribbon.Show();
$.Ribbon.Add(ActionGroup);
// $.Ribbon.AddRange([ActionGroup,ActionGroup,ActionGroup]);
```

> all items has fnc for callback functions

## Nav Bar

Can have Set of Icons [use ActionGroupItems]

and collection of ActionItems for tasks (bottom side)

```javascript
let ActionGroup = {
    group: "test",
    items: [
        { title: "title", icon: "cube-icon", fnc: () => console.log("action") },
        { title: "title", icon: "cube-icon", fnc: () => console.log("action 2") },
    ]
}

$.MenuNav.Clear();
$.MenuNav.Add(ActionGroup);
// $.MenuNav.AddRange([ActionGroup,ActionGroup,ActionGroup]);
```

#### Methods

```javascript
 let ActionItems = [
        { title: "open", icon: "cube-icon", fnc: () => console.log("action") },
        { title: "save", icon: "cube-icon", fnc: () => console.log("action 2") },
        { title: "new", icon: "cube-icon", fnc: () => console.log("action 2") },
    ]
 
  $.QuickActions.Clear();
  //$.QuickActions.Add(ActionItems[0]);
  $.QuickActions.AddRange(ActionItems);
```

## Content Frame

Show Contents.

- content can be shown as part of pages

can passed options

```javascript
let element = document.createElement("h1") ;
    element.textContent = "page 1 Content - close this to return";
    element.style.color = "red"
let option = {title: "new page",description:"description",content:"text"};
    $.desknav.Navigate(option ,element)
```

- or show in one frame

```javascript
var frameoption = {title: "Frame",csslinks:[],header:"<style>body{background-color:black}</style>"}

let element = document.createElement("h1") ;
    element.textContent = "page 1 Content - close this to return";
    element.style.color = "red"

 $.desknav.FrameNavigate( frameoption,element)
```

> title of page   (if availible)
> use css link for styling content  (if availible)
> header like nav bar added before content  (if availible)

#### Methods

```javascript
 $.desknav.CloseAll();
   
```

```javascript
let option = {title: "new page",description:"description",content:"text"};
  $.desknav.Navigate(option ,"<span style=\"color:white\">sample content<span>" );
```

```javascript
   var frameoption = {title: "Frame",csslinks:[],header:""}
  $.desknav.FrameNavigate(frameoption ,"<style>body{background-color:black}</style><span style=\"color:white\">sample content<span>");
   
  
```

 

## Option Bar

use for show properties form

Use **FormOption**

```javascript
let frm = `
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
`;

   let FormOption = {
      title: "form subject",
        form: frm
    }
 $. options.Title ="Form Title";
 $. options.Clear();
 $. options.Add(FormOption);
 // $.options.AddRange([FormOption,FormOption,FormOption]);
 $. options.Show();
```

#### Methods

```javascript

   $. options.Title ="Document Title";
   $. options.Clear();
   $. options.setContent("document text");
   $. options.Show();
```

#### Properties

```javascript
  
  $. options.Visibility = true  ;
  
  setTimeout(() => {
     $. options.Visibility = false;
}, 1000);
  

```

## Status Bar

Show current page state

### set status content

can passed string or array of string

### set status state

can be set to this modes

- normal
- success
- warning
- danger

and also can be animated

#### Methods

```javascript
 $.status.setStatusText("title")
 $.status.setStatusText(["title 1","title 2"])
```
 
```javascript 
 $.status.setDanger()
   setTimeout(() => {
       $.status.setDanger(true)
}, 1000);
```
```javascript 
 $.status.setWarning()
   setTimeout(() => {
       $.status.setWarning(true)
}, 1000);
```
```javascript 
 $.status.setSuccess()
   setTimeout(() => {
       $.status.setSuccess(true)
}, 1000);
```
```javascript 
 $.status.setNormal()
  setTimeout(() => {
       $.status.setNormal(true)
}, 1000);
```
 //pass true to show animation






## dsk Functions

`dsk.apperiance()`

to change visibility of bars

`dsk.icons`
Collections of Icons for **temp-icon**

## Defined Elements

### &lt;Temp-Icon >

auto load size and svg icons

now sizes is:

- x64
- x32
- x24
- x18
- x16

now icons is:

- cube-icon
- plus-minus-icon
- left-bar-icon
- right-side-icon
- top-bar-icon
- status-bar-icon
- gear-icon
- status-icon
