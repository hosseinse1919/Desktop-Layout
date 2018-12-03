"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
//> Create Import Text
var strMaker = (fname) => `@import "./${fname.replace(/\\/g, "/")}";` + "\n";
var importText = "//out: style.css" + "\n";
if (fs_1.existsSync("merge.less")) {
    var st = fs_1.readFileSync("merge.less").toString();
    importText = st.substring(0, st.indexOf("\n")) + "\n";
}
var subfiles = [];
var rootfiles = [];
//> Handle Directory
function ReadLessDirectory(strname) {
    subfiles.push("\n// " + strname.replace(/\\/g, " / ") + "\n");
    var flist = fs_1.readdirSync(strname);
    flist.forEach(cname => {
        let cpath = path_1.join(strname, cname);
        var st = fs_1.statSync(cpath);
        if (st.isFile() && cname.endsWith(".less")) {
            subfiles.push(strMaker(cpath));
            let y = fs_1.readFileSync(cpath).toString();
            if (y.startsWith("// main:"))
                return;
            var tp = "// main: " + strname.split("\\").map(t => "..").join("/") + "/merge.less\n";
            fs_1.writeFileSync(cpath, tp + y);
            return;
        }
        if (st.isFile() && cname.endsWith(".css")) {
            try {
                fs_1.unlinkSync(cpath);
            }
            catch (error) {
                console.log(error);
            }
        }
        if (st.isDirectory()) {
            ReadLessDirectory(path_1.join(strname, cname));
        }
    });
}
var slist = fs_1.readdirSync(__dirname);
slist.forEach(fname => {
    if (fname == "merge.less")
        return;
    if (fname.endsWith(".less")) {
        rootfiles.push(strMaker(fname));
        return;
    }
    // importText += strMaker(fname);
    var st = fs_1.statSync(fname);
    if (st.isDirectory()) {
        ReadLessDirectory(fname);
    }
});
importText += subfiles.join("");
importText += "\n// . \n";
importText += rootfiles.join("");
//console.log(importText);
fs_1.writeFileSync("merge.less", importText);
