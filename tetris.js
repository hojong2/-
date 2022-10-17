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
function downblock(){
    let block1;
    let block2;
    for(let i=1;i<29;i++){

        setTimeout(() => {
            console.log(String(i)+" 10");
            block1 = document.getElementById(String(i-1)+" 10");
            if(i!=1){
                block1.style.background="black";
            }
            block2 = document.getElementById(String(i)+" 10");
            block2.style.background="white";
            
        }, 500*i);
    } 
    
}
(function(){
    setTable();
    downblock();
})()