//전역변수
const blockArray = [
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
let createPoint=[1,parseInt(22/2)-2]; //게임테이블에 어디서 도형을 만들지 보여주는 배열(default 1 9에서 만듬)
let blockCell=[]; //currentShape초기화 하기위해 만든 것
let time =0;
//게임테이블 그리기
function setTable(){
    let table="<table id=\"gametable\">";
    for(let i=0; i<30; i++){ 
        table+="<tr>";
        for(let j=0; j<20; j++){ 
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
// 게임테이블 좌표 반환
function gebi(y,x){
    let $td = document.getElementById(y+" "+x);
    return $td;
}


//현재 blockCell 도형 그리기
function showShape(){
    for(let i=0;i<blockCell.length;i++){
        let el = gebi(blockCell[i][0],blockCell[i][1]);
        el.style.background = 'tomato';
    }
}


//다음 도형 넥스트 테이블에 보여주기
function displayNextBlock(){
    resetNextBlock();
    nextBlock = parseInt(Math.random() * blockArray.length);
    let block = blockArray[nextBlock];
    for(let i=0;i<4;i++){
        let y = block[i][0];
        let x = block[i][1];
        document.getElementById(String(y)+String(x)).style.background = 'tomato';
    }
}

//시작위치에 현재 도형 생성 및 그리기
function displaycurrentBlock(){
    currentBlock=[];
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
//현재 움직이는 도형 초기화
function resetBlock(){
    for(let i=0;i<blockCell.length;i++){
        let el = gebi(blockCell[i][0],blockCell[i][1]);
        el.style.background = 'black';
    }
}

//다음 도형 초기화
function resetNextBlock(){
    for(let i=0;i<4;i++)
        for(let j=0;j<4;j++)
            document.getElementById(String(i)+String(j)).style.background = "rgb(14,31,49)";
}

//도형 한칸 내리기
function moveDown(){
    resetBlock();
    blockPoint=[1];
    for(let a=0;a<blockCell.length;a++){
        blockCell[a][0]+=blockPoint[0];
    }
    showShape();
}
//움직일수 있는지 즉 멈추는 지 판단
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

//도형 자동내리기
function downblock(){
    let i=0;
    let isTouch=false;
    let it=setInterval(() => {
        if(i++<26){
            if(isTouch){
                i+=100;return;
            }
            moveDown();
            isTouch=isCanMove();
        }else{
            clearInterval(it);
            blockCell=[];
            init();
        }
    }, 500);
    
}


//시작
function init(){
    currentBlock='';
    console.log('init실행');
    displaycurrentBlock();
    displayNextBlock();
    downblock();
}

(function(){
    setTable();
    init();
}) ();