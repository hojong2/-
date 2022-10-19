function setTable() {
    let table = "<table id=\"gametable\">";
    for (var i = 0; i < 30; i++) {
        table += "<tr>";
        for (var j = 0; j < 20; j++) {
            if (j === 0 || j === 19 || i === 0 || i === 29) {
                0
                table += `<td style="background:#16293f; width:16px; height:16px" id="${String(i)} ${String(j)}"></td>`;  //아이디 값을 배열 형태로 지정

            } else {
                table += `<td style="background:black; width:16px; height:16px" id="${String(i)} ${String(j)}"></td>`;
            }
        }
        table += "</tr>";
    }
    table += "</table>";

    document.write(table);
}
var curx=10;
//블럭 내리기
function downblock(){
    
    let block1; //이전 블럭
    let block2; //현재 블럭
    let block3; //다음 블럭
    var i=0;
        var it=setInterval(() => {
            if(i++<28){
                // console.log(String(i)+" 10");
                block3 = document.getElementById(String(i)+` ${curx}`);
                //다음 블럭이 흰색이면(아래에 블럭이 있으면) 정지
                if(block3.style.background==="white") i+=100;
                //이전 블럭을 검은색으로 교채 
                block1 = document.getElementById(String(i-1)+` ${curx}`); 
                if(i!=1){
                    block1.style.background="black";
                }
                //현재 블럭을 흰색으로 교채
                block2 = document.getElementById(String(i)+` ${curx}`);
                block2.style.background="white";
                keymove(i, curx);
                
            }else{
                clearInterval(it);
                Module.it();
            }
        }, 1000);


    
}
// 키 동작 처리

// 초기 시작 블럭 위치 지정
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

// 키보드 이벤트 리스너
document.onkeydown = keyDownEventHandler;
document.onkeyup=keyUpEventHandler;
// 요소 지정 선언
function keyDownEventHandler(e) {
    if (e.keyCode == 37) { //좌        
        leftPressed = true;      
    } else if (e.keyCode == 38) {//상       
        upPressed = true;
    } else if (e.keyCode == 39) {//우
        rightPressed=true;
    } else if (e.keyCode == 40) {//하
        downPressed = true;
    }
}
function keyUpEventHandler(e) {
    if (e.keyCode == 37) { //좌        
        leftPressed = false;      
    } else if (e.keyCode == 38) {//상       
        upPressed = false;
    } else if (e.keyCode == 39) {//우
        rightPressed=false;
    } else if (e.keyCode == 40) {//하
        downPressed = false;
    }
}
function keymove(i, curx){
    if (leftPressed==true) { //좌
        console.log("left",i,curx);
        // Y : 가로 , X: 세로
        blockbefore = document.getElementById(String(i)+` ${curx}`);
        blockafter = document.getElementById(String(i)+` ${--curx}`);  
        console.log("left",i,curx);

        if (blockafter.style.background != "black") {
            return false;
        } else {

            if (i < 28) {
                blockbefore.style.background = "black";
                blockafter.style.background = "white";
            }
        }
    } else if (upPressed==true) {//상
        
        // Y : 가로 , X: 세로   
        blockbefore = document.getElementById(`${curX} ${curY}`);
        blockafter = document.getElementById(`${--curX} ${curY}`);

        if (blockafter.style.background != "black") {

            return false;

        } else {

            if (i++ < 1) {
                if (i = 1) {
                    blockbefore.style.background = "black";
                }
                blockafter.style.background = "skyblue";
            }
        }

    } else if (rightPressed==true) {//우

        // Y : 가로 , X: 세로
        blockbefore = document.getElementById(`${curX} ${curY}`);
        blockafter = document.getElementById(`${curX} ${++curY}`);

        if (blockafter.style.background != "black") {

            return false;

        } else {
            if (i++ < 1) {
                if (i = 1) {
                    blockbefore.style.background = "black";
                }
                blockafter.style.background = "skyblue";
            }
        }
    } else if (downPressed==true) {//하

        // Y : 가로 , X: 세로
        blockbefore = document.getElementById(`${curX} ${curY}`);
        blockafter = document.getElementById(`${++curX} ${curY}`);

        if (blockafter.style.background != "black") {

            return false;

        } else {
            if (i++ < 1) {
                if (i = 1) {
                    blockbefore.style.background = "black";
                }
                blockafter.style.background = "skyblue";
            }
        }
    }
}
function init(){
    downblock();
    setTimeout(() => {
        init();
    }, 10000);
}
(function () {
    setTable();
    init();
})()