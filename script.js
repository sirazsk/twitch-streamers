/**
 * Created by siraz on 18-03-2017.
 */
/**
 * Created by siraz on 28-01-2017.
 */
var streamers = ["ESL_SC2","Test_channel"];
var online = [];
var statusx = false;
var url="https://wind-bow.gomix.me/twitch-api/";
var imgsrc=[];
var title=[];
var titleUrl=[];
var contents=[];
var addStr="";

$(document).ready(refresh);

function refresh() {
    $.ajaxSetup({
        async: false
    });
    for(i=0;i<streamers.length;i++){
        $.getJSON(url+"/streams/"+streamers[i],function (responce) {
            if(responce.stream){
                statusx=true;
            }
            else {
                statusx=false;
            }
            console.log(statusx);
            online[i]=statusx;
        });
        console.log(statusx);
        $.getJSON(url+"/channels/"+streamers[i],function (responce) {
            console.log(statusx);
            if(statusx){
                title[i]=streamers[i];
                titleUrl[i]="https://www.twitch.tv/"+streamers[i];
                if(!responce.logo){
                    imgsrc[i]="https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png";
                }
                else {
                    imgsrc[i]=responce.logo;
                }
                contents[i]=responce.status;
            }else {
                title[i]=streamers[i];
                titleUrl[i]="https://www.twitch.tv/"+streamers[i];
                if(!responce.logo){
                    imgsrc[i]="https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png";
                }
                else {
                    imgsrc[i]=responce.logo;
                }
                contents[i]="offline";
            }
        });
        console.log(i+" "+statusx);
    }
    console.log(imgsrc);
    console.log(title);
    console.log(titleUrl);
    console.log(contents);
    click1();
}

function click1() {
    document.getElementById("all").style.backgroundColor = '#FFFF00';
    document.getElementById("online").style.backgroundColor = 'lavender';
    document.getElementById("offline").style.backgroundColor = 'lavender';
    $("#list").html("");
    var html="";
    for(i=0;i<streamers.length;i++){
        html='<li><div class="row"><div class="col-xs-2"><img src='+imgsrc[i]+' alt=""></div><div class="col-xs-3"><div id="links"><a target="blank" href='+titleUrl[i]+'>'+title[i]+'</a></div></div><div class="col-xs-6"><div id="links"> '+contents[i]+' </div></div><div class="col-xs-1"><h1 id='+i+' onclick="click5(this.id)">X</h1></div></div></li>';
        $("#list").append(html);
    }

}

function click2() {
    document.getElementById("online").style.backgroundColor = '#FFFF00';
    document.getElementById("all").style.backgroundColor = 'lavender';
    document.getElementById("offline").style.backgroundColor = 'lavender';
    $("#list").html("");
    var html="";
    for(i=0;i<streamers.length;i++){
        if(online[i]){
            html='<li><div class="row"><div class="col-xs-2"><img src='+imgsrc[i]+' alt=""></div><div class="col-xs-3"><div id="links"><a target="blank" href='+titleUrl[i]+'>'+title[i]+'</a></div></div><div class="col-xs-6"><div id="links"> '+contents[i]+' </div></div><div class="col-xs-1"><h1 id='+i+' onclick="click5(this.id)">X</h1></div></div></li>';
            $("#list").append(html);
        }
    }
}

function click3() {
    document.getElementById("offline").style.backgroundColor = '#FFFF00';
    document.getElementById("online").style.backgroundColor = 'lavender';
    document.getElementById("all").style.backgroundColor = 'lavender';
    $("#list").html("");
    var html="";
    for(i=0;i<streamers.length;i++){
        if(!online[i]){
            html='<li><div class="row"><div class="col-xs-2"><img src='+imgsrc[i]+' alt=""></div><div class="col-xs-3"><div id="links"><a target="blank" href='+titleUrl[i]+'>'+title[i]+'</a></div></div><div class="col-xs-6"><div id="links"> '+contents[i]+' </div></div><div class="col-xs-1"><h1 id='+i+' onclick="click5(this.id)">X</h1></div></div></li>';
            $("#list").append(html);
        }
    }
}

function click4(){
    addStr=document.getElementById("input").value;
    console.log(addStr);
    streamers.push(addStr);
    refresh();
}

function click5(click_id){
    streamers.splice(click_id,1);
    refresh();
}
