//전역변수
var shapeArray = [
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

let nextShape = parseInt(Math.random() * shapeArray.length); //랜덤으로 생성
let currentShape = nextShape; //제일 처음 도형 초기화
let shapePoint=[1,1]; //도형위치 초기화
let createPoint=[1,parseInt(22/2)-2]; //만드는 위치
let shapeCell=[]; //currentShap 초기화 하기위해 만든 것

//게임테이블 그리기
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
// 게임테이블 좌표 반환
function gebi(y,x){
    let $td = document.getElementById(y+" "+x);
    return $td;
}

//게임 테이블 도형 초기화
function removeShape(){
    for(var i=0;i<shapeCell.length;i++){
        var el = gebi(shapeCell[i][0],shapeCell[i][1]);
        el.style.background = 'black';
    }
}
//시작
function init(){
    displaycurrentShape();
    displayNextShape();
    setTimeout(() => {
        init();
    }, 3000);
}
//다음 도형 보여주기
function displayNextShape(){
    resetNextTable();
    nextShape = parseInt(Math.random() * shapeArray.length);
    var shape = shapeArray[nextShape];
    for(var i=0;i<4;i++){
        var y = shape[i][0];
        var x = shape[i][1];
        document.getElementById(String(y)+String(x)).style.background = 'tomato';
    }
}
//현재 도형 그리기
function displaycurrentShape(){
    removeShape();
    shapePoint[0] = createPoint[0];
    shapePoint[1] = createPoint[1];
    currentShape = nextShape;
    var shape = shapeArray[currentShape];
    displayNextShape();
    for(var i=0;i<shape.length;i++){
        var sy = shapePoint[0]+shape[i][0];
        var sx = shapePoint[1]+shape[i][1];
        var el = gebi(parseInt(sy), parseInt(sx));
        el.style.background = 'tomato';
        shapeCell.push([sy,sx]);
    }
   
}
//다음 도형 초기화
function resetNextTable(){
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++)
            document.getElementById(String(i)+String(j)).style.background = "rgb(14,31,49)";
}
(function(){
    setTable();
    init();
}) ();