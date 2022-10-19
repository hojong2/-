//전역변수
var blockArray = [
    [[2,2],[1,2],[1,1],[0,1]],
    [[1,1],[1,0],[0,2],[0,1]],
    [[2,1],[1,1],[1,2],[0,2]],
    [[1,2],[1,1],[0,1],[0,0]],
    [[1,2],[1,1],[0,2],[0,1]],
    [[2,0],[1,1],[1,0],[0,0]],
    [[1,1],[0,2],[0,1],[0,0]],
    [[2,2],[1,2],[1,1],[0,2]],
    [[1,2],[1,1],[1,0],[0,1]],
    [[3,1],[2,1],[1,1],[0,1]],
    [[1,3],[1,2],[1,1],[1,0]],
    [[2,2],[2,1],[1,1],[0,1]],
    [[1,0],[0,2],[0,1],[0,0]],
    [[2,2],[1,2],[0,2],[0,1]],
    [[1,2],[1,1],[1,0],[0,2]],
    [[2,2],[2,1],[1,2],[0,2]],
    [[2,2],[2,1],[2,0],[1,0]],
    [[2,1],[1,1],[0,1],[0,2]],
    [[1,2],[0,2],[0,1],[0,0]]
];

let nextBlock = parseInt(Math.random() * blockArray.length); //도형 모양 랜덤으로 생성
let currentBlock = nextBlock; //제일 처음 도형이 어떤것인지 알려주는 것 초기화
let blockPoint=[1,1]; //도형위치가 게임테이블 어디에 있는지 알려주는 배열 
let createPoint=[1,14]; //게임테이블에 어디서 도형을 만들지 보여주는 배열(default 1 9에서 만듬)
let blockCell=[]; //currentShape초기화 하기위해 만든 것

function setTable(){
    let table="<table id=\"gametable\">";
    for(var i=0; i<30; i++){ 
        table+="<tr>";
        for(var j=0; j<20; j++){ 
            if(j===0 || j===19 || i===0 || i===29){0
                table+=`<td style="background:#16293f; width:16px; height:16px" id="${String(i)} ${String(j)}"></td>`;  //아이디 값을 배열 형태로 지정

            }else{
                table+=`<td style="background:black; width:16px; height:16px" id="${String(i)} ${String(j)}"></td>`;
            }
        }
        table+="</tr>";
    }
    table+="</table>";

    document.write(table);
}

    

//블럭 내리기
function downblock(){
    document.onkeydown = keyboard;
    let block1; //이전 블럭
    let block2; //현재 블럭
    let block3; //다음 블럭
    var i=0;
        var it=setInterval(() => {
            if(i++<28){
                    
                // console.log(String(i)+" 10");
                    block3 = document.getElementById(String(i)+" 10");
                    //다음 블럭이 흰색이면(아래에 블럭이 있으면) 정지
                    if(block3.style.background==="white") i+=100;
                    //이전 블럭을 검은색으로 교채 
                    block1 = document.getElementById(String(i-1)+" 10"); 
                    if(i!=1){
                        block1.style.background="black";
                    }
                    //현재 블럭을 흰색으로 교채
                    block2 = document.getElementById(String(i)+" 10");
                    block2.style.background="white";
                    // keyboard(e, block2, block3);
            }else{
                clearInterval(it);
                Module.it();
            }
        }, 300);

    
}




// 게임테이블 좌표 반환
function gebi(y,x){
    let $td = document.getElementById(y+" "+x);
    return $td;
}

//게임 테이블 도형 초기화
function resetBlock(){
    for(var i=0;i<blockCell.length;i++){
        var el = gebi(blockCell[i][0],blockCell[i][1]);
        el.style.background = 'black';
    }
}
//시작
function init(){
    displaycurrentBlock();
    displayNextBlock();
    downblock();
    setTimeout(() => {
        init();
    }, 1000);
}
//다음 도형 보여주기
function displayNextBlock(){
    resetNextBlock();
    nextBlock = parseInt(Math.random() * blockArray.length);
    let block = blockArray[nextBlock];
    for(var i=0;i<4;i++){
        var y = block[i][0];
        var x = block[i][1];
        document.getElementById(String(y)+String(x)).style.background = 'tomato';
    }
}
//현재 도형 그리기
function displaycurrentBlock(){
    resetBlock();
    blockPoint[0] = createPoint[0];
    blockPoint[1] = createPoint[1];
    currentBlock = nextBlock;
    let block = blockArray[currentBlock];
    displayNextBlock();
    for(let i=0;i<block.length;i++){
        let sy = blockPoint[0]+block[i][0];
        let sx = blockPoint[1]+block[i][1];
        let el = gebi(parseInt(sy), parseInt(sx));
        el.style.background = 'tomato';
        blockCell.push([sy,sx]);
    }
   
}
//다음 도형 초기화
function resetNextBlock(){
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++)
            document.getElementById(String(i)+String(j)).style.background = "rgb(14,31,49)";
}

(function(){
    
    setTable();
    init();
}) ();