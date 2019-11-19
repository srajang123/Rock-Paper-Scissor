//scores
var username;
var usr=document.querySelector('.user');
var comp=document.querySelector('.comp');
var final=document.querySelector('.result');
//total games
var count=0;
var dra=document.querySelector('.draw1');
var drb=document.querySelector('.draw2');
//buttons
var but1=document.querySelector('#rock');
var but2=document.querySelector('#paper');
var but3=document.querySelector('#scissor');
//choices
var uchoice;
var cchoice;

//output table
var tab=document.querySelector('table#his');

//rulebook
var happen=0;
var rule=document.querySelector('.rules');
var chk=document.querySelector('#read');
var hidel=document.querySelector('.hid');
var uname=document.querySelector('.uname');
var but4=document.querySelector('.but');
let tid=document.querySelector('.username');
chk.addEventListener('click',(c)=>{
    hidel.style.visibility="visible";
    chk.style.visibility="collapse";
})
but4.addEventListener('click',(c)=>{
    let name=uname.value;
    if(name=="")
        alert('Please Provide your name');
    else
    {
        username=name.toUpperCase();
        
        rule.style.visibility="collapse";
        hidel.style.visibility="collapse";
        tid.innerHTML=username;
        happen=1;
    }
});
//rulebooks ending

//loading crterias
but1.style.height="0%";
but1.style.width="0%";
but2.style.height="0%";
but2.style.width="0%";
but3.style.height="0%";
but3.style.width="0%";
var a=but3;
b=1;
c=4;
var id=setInterval(incrementer3,100);
function incrementer1()
{
    console.log(b,c);
    if(b>19)
    {
        console.log("OH!");
        clearInterval(id);
        b=1;
        c=4;
        a=but2;
        id=setInterval(incrementer2,100);
    }
    else
    {
    e=a.style;
    b+=2;
    c+=2;
    e.height=b+"%";;
    e.width=c+"%";
    //e.borderRadius="50%";
    }
}
function incrementer2()
{
    console.log(b,c);
    if(b>19)
    {
        console.log("OH!");
        clearInterval(id);
        rule.style.visibility="visible";
    }
    else
    {
    e=a.style;
    b+=2;
    c+=2;
    e.height=b+"%";;
    e.width=c+"%";
    //e.borderRadius="50%";
    }
}
function incrementer3()
{
    console.log(b,c);
    if(b>19)
    {
        console.log("OH!");
        clearInterval(id);
        b=1;
        c=4;
        a=but1;
        id=setInterval(incrementer1,100);
    }
    else
    {
    e=a.style;
    b+=2;
    c+=2;
    e.height=b+"%";;
    e.width=c+"%";
    //e.borderRadius="50%";
    }
}
//loading ends

//listening events
but1.addEventListener('click',(c)=>{
    userchoose(0);
});
but2.addEventListener('click',(c)=>{
    userchoose(1);
});
but3.addEventListener('click',(c)=>{
    userchoose(2);
})

function userchoose(a){
    if(happen==0)return;
    count++;
    b=compchoose();
    uchoice=a;
    cchoice=b;
    tell(b);
    decision(a,b);
    if(count==5)
        end();
}
// selecting computers choice
function compchoose(){
    return Math.floor(Math.random()*3);
}
function decision(a,b)
{
    if(a==0)
    {
        if(b==0)
            draw();
        else if(b==1)
            lost();
        else if(b==2)
            win();
    }
    else if(a==1)
    {
        if(b==0)
            win();
        else if(b==1)
            draw();
        else if(b==2)
            lost();
    }
    else if(a==2)
    {
        if(b==0)
            lost();
        else if(b==1)
            win();
        else if(b==2)
            draw();
    }
}
function tell(a)
{
    console.log('Computer choosed: '+a);
}
function win()
{
    usr.innerHTML=Number(usr.innerHTML)+1;
    newrow("Won");
}
function lost()
{
    comp.innerHTML=Number(comp.innerHTML)+1;
    newrow("Lost");
}
function draw()
{
    newrow("Draw");
}
function newrow(a){
    let tr=document.createElement('tr');
    let td1=document.createElement('td');
    let td2=document.createElement('td');
    let td3=document.createElement('td');
    let td4=document.createElement('td');
    td1.className="his";
    td2.className="his";
    td3.className="his";
    td4.className="his";
    td1.innerHTML=decrypt(uchoice);
    td2.innerHTML=decrypt(cchoice);
    td3.innerHTML=a;
    td4.innerHTML=count;
    tr.appendChild(td4);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tab.appendChild(tr);
    if(tab.style.visibility=="")
        tab.style.visibility="visible";
}
function decrypt(a)
{
    switch(a)
    {
        case 0: return "Rock";
        case 1: return "Paper";
        case 2: return "Scissor";
    }
}
function end()
{
    console.log('Game Ends');
    /* backend helper*/
    var res_name=document.querySelector('#users');
    var res_score1=document.querySelector('#score1');
    var res_score2=document.querySelector('#score2');
    res_name.value=username;
    res_score1.value=usr.innerHTML;
    res_score2.value=comp.innerHTML;
    end_wait();
}
function end_wait()
{
    //but1.parentElement.style.visibility="collapse";  
    but1.parentElement.parentElement.removeChild(but1.parentElement);
    final.style.visibility="visible";
    final.style.color="#ff25ff";
    var x=document.createElement('h2');
    x.className="countdown";
    counter(x,3);
}
function counter(x,u)
{
    if(u<0){
        drawingl(0);
        drawingr(80);
        winner(x);
        return;
    }
    x.innerHTML=u;
    final.appendChild(x);
    console.log(u);
    setTimeout(function(){counter(x,u-1)},1000);
}
function drawingl(y)
{
    console.log("/");
    //console.log(a);
    let b=dra.style;
    b.display="block";
    b.backgroundColor="red";
    b.height="0.5%";
    b.width="20%";
    b.marginTop="-5%";
    b.marginLeft=y+"%";
    console.log(b.marginLeft);
    if(y==30)return;
    setTimeout(function(){drawingl(y+1)},100);
}
function drawingr(y)
{
    //console.log(a);
    let b=drb.style;
    b.display="block";
    b.backgroundColor="red";
    b.height="0.5%";
    b.width="20%";
    b.marginTop="-0.2%";
    b.marginLeft=y+"%";
    console.log(b.marginLeft);
    if(y==49)return;
    setTimeout(function(){drawingr(y-1)},100);
}

function winner(x)
{
    let give;
    console.log(usr.value,comp.value);
    if(usr.innerHTML>comp.innerHTML)
        give=username+" won the game";
    else if(comp.innerHTML>usr.innerHTML)
        give="Computer"+" won the game";
    else    
        give="The game resulted in a "+"Draw";
    x.innerHTML=give;
    x.parentElement.paddingLeft="0%";
    x.style.textAlign="center";
    console.log(x.style.textAlign)
    console.log(give);
    var delay=setTimeout(()=>{document.forms["datasend"].submit();},3000);
}
