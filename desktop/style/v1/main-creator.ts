import { readdirSync, statSync, writeFileSync, readFileSync, existsSync, unlinkSync } from "fs";
import { join } from "path";


//> Create Import Text
var strMaker = (fname: string) => `@import "./${fname.replace(/\\/g, "/")}";` + "\n"

var importText = "//out: style.css" + "\n";

if (existsSync("merge.less")) {
    var st = readFileSync("merge.less").toString();
    importText = st.substring(0, st.indexOf("\n")) + "\n";
}


var subfiles: string[] = [];
var rootfiles: string[] = [];

//> Handle Directory
function ReadLessDirectory(strname: string) {
    subfiles.push("\n// " + strname.replace(/\\/g, " / ") + "\n")
    var flist = readdirSync(strname);
    flist.forEach(cname => {

        let cpath = join(strname, cname);
        var st = statSync(cpath);

        if (st.isFile() && cname.endsWith(".less")) {
            subfiles.push(strMaker(cpath));

            let y = readFileSync(cpath).toString();

            if (y.startsWith("// main:")) return;


            var tp = "// main: " + strname.split("\\").map(t => "..").join("/") + "/merge.less\n"

            writeFileSync(cpath, tp + y);
            return;
        }
        if (st.isFile() && cname.endsWith(".css")) {
            try {
                unlinkSync(cpath)
            } catch (error) {
                console.log(error);

            }
        }

        if (st.isDirectory()) {
            ReadLessDirectory(join(strname, cname));
        }

    })
}


var slist = readdirSync(__dirname);

slist.forEach(fname => {


    if (fname == "merge.less") return;
    if (fname.endsWith(".less")) { rootfiles.push(strMaker(fname)); return; }

    // importText += strMaker(fname);

    var st = statSync(fname);

    if (st.isDirectory()) {
        ReadLessDirectory(fname);
    }

});

importText += subfiles.join("");
importText += "\n// . \n";
importText += rootfiles.join("");

//console.log(importText);

writeFileSync("merge.less", importText)