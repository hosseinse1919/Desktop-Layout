
export function MakeMD(lines: string[]): string {
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



export  function MakeTOC(article:HTMLElement) {
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