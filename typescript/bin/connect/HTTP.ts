
export class HTTP {
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