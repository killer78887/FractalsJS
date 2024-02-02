const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");
var slider = document.getElementById("slider");
var output = document.getElementById("sliderValue");
var checkBox = document.getElementById("checkBox")
var slider2 = document.getElementById("slider2")
var slider3 = document.getElementById("slider3")
function vector2(x,y){
    this.x = x||0;
    this.y = y||0;
}

const color = ["red","blue","green","yellow","black","orange","purple","grey"];
const width = canvas.width;
const height = canvas.height;
const startingPos = new vector2(width/2,height-40);
const startingLength = 150;
const dec = 15;
let theta = slider.value*Math.PI/180;
let num = 0;
let animate = checkBox.checked;
let angleMod = 0;
let lengthMod = 0;

output.innerHTML = slider.value;
slider.oninput = function() {
    output.innerHTML = this.value;
    if(animate==false){
        theta = this.value*Math.PI/180;
    }
};
slider2.oninput = function() {
    angleMod = this.value/10;
};
slider3.oninput = function() {
    lengthMod = this.value/10;
};
checkBox.oninput = function () {
    animate = this.checked;
}

function main(len,pos,ang){
        if (len>5){
            ctx.strokeStyle = color[Math.floor((len+2)%8)];
            ctx.beginPath();
            ctx.moveTo(pos.x,pos.y);
            pos.x = pos.x+len*Math.sin(ang);
            pos.y = pos.y-len*Math.cos(ang);
            ctx.lineTo(pos.x,pos.y);
            ctx.stroke();
            ctx.closePath()
            ang+=theta*(angleMod+1);
            len-=lengthMod;
            main(len/1.5,pos,ang);
            ang += -1*theta*(angleMod+1);
            main(len/1.5,pos,ang);
            ang += -1*theta;
            len+=lengthMod;
            main(len/1.5,pos,ang);
            ang += theta;
            pos.x = pos.x-len*Math.sin(ang);
            pos.y = pos.y+len*Math.cos(ang);
        }
    }
function renderFrame(){
    ctx.clearRect(0,0,width,height);
    main(150,startingPos,0);
    if(animate==true){
        theta += 0.2*(Math.PI/180)%Math.PI;
    }
    pos = startingPos;
    ang = 0;
    len = 150;
    requestAnimationFrame(renderFrame);
}
requestAnimationFrame(renderFrame);