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
let curX = 10;
let curY = 11;

document.onkeydown = keyDownEventHandler;

function keyDownEventHandler(e) {

    if (e.keyCode == 37) { //좌
        let blockbefore, blockafter;
        let i = 0;

        if (i++ < 1) {

            if (i = 1) {
                blockbefore = document.getElementById(`${curX} ${curY}`);
                blockbefore.style.background = "black";
            }
            blockafter = document.getElementById(`${curX} ${--curY}`);
            blockafter.style.background = "skyblue";
        }
    }


    else if (e.keyCode == 38) {//상

        let blockbefore, blockafter;
        let i = 0;

        if (i++ < 1) {
            blockbefore = document.getElementById(`${curX} ${curY}`);
            if (i = 1) {
                blockbefore.style.background = "black";
            }
            blockafter = document.getElementById(`${--curX} ${curY}`);
            blockafter.style.background = "skyblue";
        }

    } else if (e.keyCode == 39) {//우

        let blockbefore, blockafter;
        let i = 0;

        if (i++ < 1) {
            blockbefore = document.getElementById(`${curX} ${curY}`);
            if (i = 1) {
                blockbefore.style.background = "black";
            }
            blockafter = document.getElementById(`${curX} ${++curY}`);
            blockafter.style.background = "skyblue"
        }

    } else if (e.keyCode == 40) {//하

        let blockbefore, blockafter;
        let i = 0;

        if (i++ < 1) {
            blockbefore = document.getElementById(`${curX} ${curY}`);
            if (i = 1) {
                blockbefore.style.background = "black";
            }
            blockafter = document.getElementById(`${++curX} ${curY}`);
            blockafter.style.background = "skyblue"
        }
    }
}

(function () {
    setTable();
})()
