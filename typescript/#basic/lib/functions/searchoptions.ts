


export const searchoptions:{[x:string]:string} ={};

if(window.location.search.length>1)
window.location.search.substring(1).split("&").forEach(p => { searchoptions[p.split("=")[0]] = p.split("=")[1] })

