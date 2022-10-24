//전역변수
const blockArray = [
    [[2,0],[2,1],[2,2],[2,3]]
    // [[2, 2], [1, 2], [1, 1], [0, 1]],
    // [[1,1],[1,0],[0,2],[0,1]],
    // [[2,1],[1,1],[1,2],[0,2]],
    // [[1,2],[1,1],[0,1],[0,0]],
    // [[1,2],[1,1],[0,2],[0,1]],
    // [[2,0],[1,1],[1,0],[0,0]],
    // [[1,1],[0,2],[0,1],[0,0]],
    // [[2,2],[1,2],[1,1],[0,2]],
    // [[1,2],[1,1],[1,0],[0,1]],
    // [[3,1],[2,1],[1,1],[0,1]],
    // [[1,3],[1,2],[1,1],[1,0]],
    // [[2,2],[2,1],[1,1],[0,1]],
    // [[1,0],[0,2],[0,1],[0,0]],
    // [[2,2],[1,2],[0,2],[0,1]],
    // [[1,2],[1,1],[1,0],[0,2]],
    // [[2,2],[2,1],[1,2],[0,2]],
    // [[2,2],[2,1],[2,0],[1,0]],
    // [[2,1],[1,1],[0,1],[0,2]],
    // [[1,2],[0,2],[0,1],[0,0]]
];

let nextBlock = parseInt(Math.random() * blockArray.length); //도형 모양 랜덤으로 생성
let currentBlock = nextBlock; //제일 처음 도형이 어떤것인지 알려주는 것 초기화
let blockPoint = [1, 1]; //도형위치가 게임테이블 어디에 있는지 알려주는 배열 
let createPoint = [1, parseInt(22 / 2) - 2]; //게임테이블에 어디서 도형을 만들지 보여주는 배열(default 1 9에서 만듬)
let blockCell = []; //currentShape초기화 하기위해 만든 것
let time = 0;
let score = 0;

//게임테이블 그리기
function setTable() {
    let table = "<table id=\"gametable\">";
    for (let i = 0; i < 30; i++) {
        table += "<tr>";
        for (let j = 0; j < 20; j++) {
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
//한줄이 꽉참 감지
function checkLine(){
    let check=0;
    for(var i=1; i<29; i++){
        for(var j=1; j<19; j++){
            if(document.getElementById(`${i} ${j}`).style.background == 'tomato'){
                check+=1;
            }
            // console.log(check);
        }
        if(check==18){
            lineClear(i);
        }
        check=0;
    }
}

//한줄이 꽉차면 한줄 삭제
function lineClear(line){
    //[28,1-18]
    for(var i=1; i<19; i++){
        document.getElementById(`${line} ${i}`).style.background = 'black';
    }
    score+=100;

}

//스코어 관리
function scoreManager(){
    document.getElementById("score").textContent = score;
}

// 게임테이블 좌표 반환
function gebi(y, x) {
    let $td = document.getElementById(y + " " + x);
    return $td;
}


document.onkeydown = keyDownEventHandler;

function keyDownEventHandler(e) {
    switch (e.keyCode) {

        case 37: setTimeout("moveLR(-1)", 0);
            resetBlock(1);
            moveleft = true;
            break;

        case 39: setTimeout("moveLR(1)", 0);
            resetBlock(-1);
            moveright = true;
            break;

        case 32: setTimeout("moveFS(1)", 0);
            resetBlock(-1);
            movefast = true;
            break;

    }
}



document.onkeyup = keyUpEventHandler;
function keyUpEventHandler(e) {
    switch (e.keyCode) {
        case 37: moveleft = false;
            break;
        case 39: moveright = false;
            break;
        case 32: movefast = false;
            break;
    }
}


function moveLR(delta) {

    for (let h = 0; h < blockCell.length; h++) { // blockcell의 length란 4로 블록 각각의 td 위치를 의미함 
        blockCell[h][1] += delta;
    }
}


function moveFS(delta) {

    for (let h = 0; h < blockCell.length; h++) {
        blockCell[h][0] += delta;
    }
} 


//게임 테이블 도형 초기화

function resetBlock(delta) {
    for (let i = 0; i < blockCell.length; i++) {
        let el = gebi(blockCell[i][0], blockCell[i][1] - delta);
        el.style.background = 'black';
    }
}


function resetBlock() {
    for (let i = 0; i < blockCell.length; i++) {
        let el = gebi(blockCell[i][0], blockCell[i][1]);
        el.style.background = 'black';
    }
}


function showShape() {
    for (let i = 0; i < blockCell.length; i++) {
        let el = gebi(blockCell[i][0], blockCell[i][1]);
        el.style.background = 'tomato';
    }
}


function moveDown() {
    console.log('movedown실행중');
    if (time++ > 3) {
        console.log('movedown실행종료');
        return;
    }
    resetBlock();
    for (let i = 0; i < blockCell.length; i++) blockCell[i][0]++;
    blockPoint[0]++;
    showShape();
    setTimeout(() => {
        moveDown();
    }, 100);
}


//시작
function init() {
    currentBlock = '';
    console.log('init실행');
    displaycurrentBlock();
    displayNextBlock();
    // move();
    downblock();
    checkLine();
    scoreManager();
    // setTimeout(() => {
    //     init()
    // }, 3000);
}


//다음 도형 보여주기
function displayNextBlock() {
    resetNextBlock();
    nextBlock = parseInt(Math.random() * blockArray.length);
    let block = blockArray[nextBlock];
    for (let i = 0; i < 4; i++) {
        let y = block[i][0];
        let x = block[i][1];
        document.getElementById(String(y) + String(x)).style.background = 'tomato';
    }
}


function moveDown() {
    resetBlock();
    blockPoint = [1];
    for (let a = 0; a < blockCell.length; a++) {
        blockCell[a][0] += blockPoint[0];
    }
    showShape();
}


//현재 도형 그리기
function displaycurrentBlock() {
    currentBlock = [];
    resetBlock();
    blockPoint[0] = createPoint[0];
    blockPoint[1] = createPoint[1];
    currentBlock = nextBlock;
    let block = blockArray[currentBlock];
    displayNextBlock();
    for (let i = 0; i < block.length; i++) {
        let sy = blockPoint[0] + block[i][0];
        let sx = blockPoint[1] + block[i][1];
        let el = gebi(parseInt(sy), parseInt(sx));
        el.style.background = 'tomato';
        blockCell.push([sy, sx]);
    }
}


//다음 도형 초기화
function resetNextBlock() {
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++)
            document.getElementById(String(i) + String(j)).style.background = "rgb(14,31,49)";
}

//
function isCanMove(){
    let isTouch=false;
    let mine=[];
    for(let h=0;h<blockCell.length;h++){ // blockcell의 length란 4로 블록 각각의 td 위치를 의미함 
        let currentBlock = gebi(blockCell[h][0],blockCell[h][1]); //현재 블록의 위치 td값
        mine.push(currentBlock);
        let nextLine = gebi(blockCell[h][0]+1,blockCell[h][1]); //그좌표의 바로밑 td값
        // console.log('mine td',h,mine[h]);
        // console.log('next line td' ,nextLine);
        
        if((nextLine!==mine[0]) && (nextLine!==mine[1]) && (nextLine!==mine[2]) && (nextLine!==mine[3])){ //다음블럭이  내블럭이 아니고
            if( nextLine.style.background !=='black'){ //다음블럭이 존재할때
                // console.log('멈춤');
            isTouch=true; //멈춤
            } 
        }
    }
    return isTouch;
}


function downblock() {
    // let block1;
    // let block2;
    let i = 0;
    let nextLine;
    let isTouch = false;
    console.log(nextLine);
    let it = setInterval(() => {
        if (i++ < 25) {
            let mine = [];
            // block1 = document.getElementById(String(i-1)+" 10");
            // if(i!=1){ //블록의 위치좌표는 0로 시작하지 않아서 
            //     block1.style.background="black";
            // }
            // block2 = document.getElementById(String(i)+" 10");
            // block2.style.background="white";
            if (isTouch) {
                console.log('멈춤');
                i += 100; return;
            }


            moveDown();
            isTouch=isCanMove();


            // for(let h=0;h<blockCell.length;h++){ // blockcell의 length란 4로 블록 각각의 td 위치를 의미함 
            //     let currentBlock = gebi(blockCell[h][0]+i,blockCell[h][1]); //현재 블록의 위치 td값
            //     mine.push(currentBlock);
            //     let beforeBlock = gebi(blockCell[h][0]+i-1,blockCell[h][1]); //이전 블록의 위치
            //     nextLine = gebi(blockCell[h][0]+i+1,blockCell[h][1]); //그좌표의 바로밑 td값

            //     // currentBlock.style.background = 'tomato';
            //     // beforeBlock.style.background='black';

            //     if((nextLine!==mine[0]) && (nextLine!==mine[1]) && (nextLine!==mine[2]) && (nextLine!==mine[3])){ //다음블럭이  내블럭이 아니고
            //         if( nextLine.style.background !=='black'){ //다음블럭이 존재할때
            //         isTouch=true; //멈춤
            //         } 
            //     }
            // }


        } else {
            clearInterval(it);
            blockCell = [];
            init();
        }
    }, 100);


}
(function () {
    setTable();
    init();
})();