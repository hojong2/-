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

// 키 동작 처리

// 초기 시작 블럭 위치 지정
let curX = 2;
let curY = 9;

// 키보드 이벤트 리스너
document.onkeydown = keyDownEventHandler;

// 요소 지정 선언
function keyDownEventHandler(e) {

    let blockbefore, blockafter;
    let i = 0;

    if (e.keyCode == 37) { //좌

        // Y : 가로 , X: 세로
        blockbefore = document.getElementById(`${curX} ${curY}`);
        blockafter = document.getElementById(`${curX} ${--curY}`);  

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
    } else if (e.keyCode == 38) {//상
        
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

    } else if (e.keyCode == 39) {//우

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
    } else if (e.keyCode == 40) {//하

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

(function () {
    setTable();
})()
