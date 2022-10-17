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
function fallblock(){
    let block = document.getElementById("1 10");
    block.style.background="white";
}
(function(){
    setTable();
    fallblock();
})()