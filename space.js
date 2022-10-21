//전역변수
const blockArray = [
    [[2, 2], [1, 2], [1, 1], [0, 1]],
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
let blockPoint = [1, 1]; //도형위치가 게임테이블 어디에 있는지 알려주는 배열 
let createPoint = [1, parseInt(22 / 2) - 2]; //게임테이블에 어디서 도형을 만들지 보여주는 배열(default 1 9에서 만듬)
let blockCell = []; //currentShape초기화 하기위해 만든 것
let time = 0;
// let fast = 300;

let it = null;


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
            clearInterval(it);
            downblock(10);
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

    showShape();
}


function moveFS(delta) {
    fast = 10;
    for (let h = 0; h < blockCell.length; h++) {
        blockCell[h][0] += delta;
    }

    showShape();

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
    this.currentBlock = null;
    // move();
    downblock();
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


function downblock(fast=300) {

    // let block1;
    // let block2;
    let i = 0;
    let nextLine;
    let isTouch = false;
    console.log(nextLine);
    

    it = setInterval(() => {
        if (i++ < 25) {
            let mine = [];

            if (isTouch) {
                console.log('멈춤');
                i += 100; return;
            }

            moveDown();

        } else {
            clearInterval(it);
            blockCell = [];
            init();

        }
    }, fast);
}

(function () {
    setTable();
    init();
})();