var stack=[],mycard1=[],mycard2=[],mycard3=[],mycard4=[],opcard1=[],opcard2=[],opcard3=[],opcard4=[],token,uuid,turn=0,p,myworker;
var len=0,mynum1=0,mynum2=0,mynum3=0,mynum4=0,opnum1=0,opnum2=0,opnum3=0,opnum4=0,element;
myworker=new Worker('worker.js');//创建webworker线程
var arr=['1','2','3','4','5','6','7','8','9','10','J','Q','K'];
function transTurn(x)//改变回合标记
{
    if(x==1)
    {
        document.getElementById('turn1').innerHTML="";
        document.getElementById('turn2').innerHTML="你的回合";
    }
    else
    {
        document.getElementById('turn2').innerHTML="";
        document.getElementById('turn1').innerHTML="你的回合";
    }
    return;
}
function orientation(element,x)//修改element的牌面为x
{
    element.style.backgroundImage="url('../cards/ima"+x+".jpg')";
}
function reset(element)//将element牌面置为空
{
    element.style.backgroundImage="url('../cards/ima.jpg')";
}
function changec2(x)//改变判定位的牌面
{
   var element=document.getElementById('panding');
   orientation(element,x);
}
function gameover()//判断牌堆是否抽完，结算
{
    var xmlhttp,obj;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
    {
        if(xmlhttp.readyState==4&&xmlhttp.status==200)
        {
            var txt=xmlhttp.responseText;
            obj=JSON.parse(txt);
            if(p==parseInt(obj.data.winner))
            {
                alert('你赢了！');
            }
            else
            {
                alert('你输了');
            }
            worker.terminate();
        }
    }
    xmlhttp.open("GET","http://172.17.173.97:9000/api/game/"+uuid,true);
    xmlhttp.setRequestHeader("Authorization",token);
    xmlhttp.send();
}
function updateMyCard()//更新p1手牌牌面
{
   var j,element;
   if(mynum1)
   {
        element=document.getElementById('my1');
        orientation(element,mycard1[mynum1-1]);
    }
    else
    {
        element=document.getElementById('my1');
        reset(element);
    }
    if(mynum2)
    {
        element=document.getElementById('my2');
        orientation(element,mycard2[mynum2-1]);
    }
    else
    {
        element=document.getElementById('my2');
        reset(element);
    }
    if(mynum3)
    {
        element=document.getElementById('my3');
        orientation(element,mycard3[mynum3-1]);
    }
    else
    {
        element=document.getElementById('my3');
        reset(element);
    }
    if(mynum4)
    {
        element=document.getElementById('my4');
        orientation(element,mycard4[mynum4-1]);
    }
    else
    {
        element=document.getElementById('my4');
        reset(element);
    }
    return;
}
function updateOpCard()//更新p2手牌牌面
{
    var j,element;
    if(opnum1)
    {
        element=document.getElementById('op1');
        orientation(element,opcard1[opnum1-1]);
    }
    else
    {
        element=document.getElementById('op1');
        reset(element);
    }
    if(opnum2)
    {
        element=document.getElementById('op2');
        orientation(element,opcard2[opnum2-1]);
    }
    else
    {
        element=document.getElementById('op2');
        reset(element);
    }
    if(opnum3)
    {
        element=document.getElementById('op3');
        orientation(element,opcard3[opnum3-1]);
    }
    else
    {
        element=document.getElementById('op3');
        reset(element);
    }
    if(opnum4)
    {
        element=document.getElementById('op4');
        orientation(element,opcard4[opnum4-1]);
    }
    else
    {
        element=document.getElementById('op4');
        reset(element);
    }
    return;
}
function judge(x)//判断x与判定牌是否相同,自己,若是则把判定区所有牌移到自己手牌
{
    if(len==0)
    return false;
    if(parseInt(x/13)==parseInt(stack[len-1]/13))
    {
        stack[len++]=x;
            for(len--;len>=0;len--)
            {
                if(parseInt(stack[len]/13)==0)
                {
                    mycard1[mynum1++]=stack[len];
                }
                else if(parseInt(stack[len]/13)==1)
                {
                    mycard2[mynum2++]=stack[len];
                }
                else if(parseInt(stack[len]/13)==2)
                {
                    mycard3[mynum3++]=stack[len];
                }
                else if(parseInt(stack[len]/13)==3)
                {
                    mycard4[mynum4++]=stack[len];
                }
            }
            len=0;
            var element=document.getElementById("panding");
            reset(element);
            return true;
    }
    else
    {
        return false;
    }
}
function judge2(x)//判断x与判定牌是否相同(对手)
{
    if(len==0)
    return false;
    if(parseInt(x/13)==parseInt(stack[len-1]/13))
    {
        stack[len]=x;
            for(;len>=0;len--)
            {
                if(parseInt(stack[len]/13)==0)
                {
                    opcard1[opnum1++]=stack[len];
                }
                else if(parseInt(stack[len]/13)==1)
                {
                    opcard2[opnum2++]=stack[len];
                }
                else if(parseInt(stack[len]/13)==2)
                {
                    opcard3[opnum3++]=stack[len];
                }
                else if(parseInt(stack[len]/13)==3)
                {
                    opcard4[opnum4++]=stack[len];
                }
            }
            len=0;
            var element=document.getElementById("panding");
            reset(element);
            return true;
    }
    else
    {
        return false;
    }
}
function draw_card(x)//对方打出牌堆顶的牌x
{
    var element=document.getElementById('paidui');
    orientation(element,x);
    setTimeout('reset(element)',500);
    if(len==0)
    {
        stack[len++]=x;
        changec2(x);
    }
    else
    {
        if(judge2(x))
        {
            updateOpCard();
        }
        else
        {
            stack[len++]=x;
            changec2(x);
        }
    }
    return;
}
function draw_card2(x)//自己打出牌堆顶的牌x
{
    var element=document.getElementById('paidui');
    orientation(element,x);
    setTimeout('reset(element)',500);
    if(len==0)
    {
        stack[len++]=x;
        changec2(x);
    }
    else
    {
        if(judge(x))
        {
            updateMyCard();
        }
        else
        {
            stack[len++]=x;
            changec2(x);
        }
    }
    return;
}
function whichCard(code)//翻译卡牌号
{
    var Ccolor=code[4],num=(code.substr(5)),i;
    for(i=0;i<13;i++)
    {
        if(arr[i]==num)
        {
            num=i;
            break;
        }
    }
    if(Ccolor=='S')
    num+=0;
    else if(Ccolor=='D')
    num+=13;
    else if(Ccolor=='C')
    num+=26;
    else if(Ccolor=='H')
    num+=39;
    return num;
}
function transCard(x)//将x翻译为花色加数字
{
    if(x<13)
    return 'S'+arr[x];
    else if(x<26)
    return 'D'+arr[x-13];
    else if(x<39)
    return 'C'+arr[x-26];
    else
    return 'H'+arr[x-39];
}
function playout1(x)//对手打出手牌
{
    if(opnum1&&opcard1[opnum1-1]==x)
    {
        opnum1--;
        if(judge(opcard1[opnum1]))
        {updateOpCard();}
        else
        {stack[len++]=opcard1[opnum1];updateOpCard();changec2(opcard1[opnum1]);}
    }
    else if(opnum2&&opcard2[opnum2-1]==x)
    {
        opnum2--;
        if(judge(opcard2[opnum2]))
        {updateOpCard();}
        else
        {stack[len++]=opcard2[opnum2];updateOpCard();changec2(opcard2[opnum2]);}
    }
    else if(opnum3&&opcard3[opnum3-1]==x)
    {
        opnum3--;
        if(judge(opcard3[opnum3]))
        {updateOpCard();}
        else
        {stack[len++]=opcard3[opnum3];updateOpCard();changec2(opcard3[opnum3]);}
    }
    else if(opnum4&&opcard4[opnum4-1]==x)
    {
        opnum4--;
        if(judge(opcard4[opnum4]))
        {updateOpCard();}
        else
        {stack[len++]=opcard4[opnum4];updateOpCard();changec2(opcard4[opnum4]);}
    }
}
function playout2(x)//自己打出手牌
{
    if(mynum1&&mycard1[mynum1-1]==x)
    {
        mynum1--;
        if(judge(mycard1[mynum1]))
        {updateMyCard();}
        else
        {stack[len++]=mycard1[mynum1];updateMyCard();changec2(mycard1[mynum1]);}
    }
    else if(mynum2&&mycard2[mynum2-1]==x)
    {
        mynum2--;
        if(judge(mycard2[mynum2]))
        {updateMyCard();}
        else
        {stack[len++]=mycard2[mynum2];updateMyCard();changec2(mycard2[mynum2]);}
    }
    else if(mynum3&&mycard3[mynum3-1]==x)
    {
        mynum3--;
        if(judge(mycard3[mynum3]))
        {updateMyCard();}
        else
        {stack[len++]=mycard3[mynum3];updateMyCard();changec2(mycard3[mynum3]);}
    }
    else if(mynum4&&mycard4[mynum4-1]==x)
    {
        mynum4--;
        if(judge(mycard4[mynum4]))
        {updateMyCard();}
        else
        {stack[len++]=mycard4[mynum4];updateMyCard();changec2(mycard4[mynum4]);}
    }
}
function play(code)//计算表现对手操作
{
    var x=whichCard(code);
    if(parseInt(code[2])==0)
    {
        draw_card(x);
    }
    else
    {
        playout1(x);
    }
}
function play2(code)//计算表现自己操作
{
    var x=whichCard(code);
    if(parseInt(code[2])==0)
    {
        draw_card2(x);
    }
    else
    {
        playout2(x);
    }
}
function action(x)//自己行动
{
    if(turn==0)
    return;
    var xmlhttp,obj;
    if (window.XMLHttpRequest)
    {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
         xmlhttp=new XMLHttpRequest();
    }
    else
    {
        // IE6, IE5 浏览器执行代码
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if(xmlhttp.readyState==4&&xmlhttp.status==200)
        {
            var txt=xmlhttp.responseText;
            obj=JSON.parse(txt);
            play2(obj.data.last_code);
        }
    }
    
    if(x==0)//打出牌堆顶
    {
        xmlhttp.open("PUT","http://172.17.173.97:9000/api/game/"+uuid+'?type=0',true);
        xmlhttp.setRequestHeader("Authorization",token);
        xmlhttp.send();
    }
    else//打出手牌
    {
        var t;
        if(x==1&&mynum1>0)
        t=transCard(mycard1[mynum1-1]);
        else if(x==2&&mynum2>0)
        t=transCard(mycard2[mynum2-1]);
        else if(x==3&&mynum3>0)
        t=transCard(mycard3[mynum3-1]);
        else if(x==4&&mynum4>0)
        t=transCard(mycard4[mynum4-1]);
        else
        return;
        xmlhttp.open("PUT","http://172.17.173.97:9000/api/game/"+uuid+'?type=1&card='+t,true);
        xmlhttp.setRequestHeader("Authorization",token);
        xmlhttp.send();
    }
    transTurn(0);
    turn=0;
}
function start()//初始化
{

    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
    }
    uuid=theRequest['uuid'];
    token=theRequest['token'];
    p=theRequest['p'];
    document.getElementById('thisIsUid').innerHTML='uuid='+uuid;
    myworker.postMessage(url);//worker开始工作

}
myworker.onmessage=function(event)//接受worker数据
{
    if(event.data=='end')
    {
        gameover();
        return;
    }
    if(event.data=='begin')
    {alert('游戏开始');
    play(event.data);
    transTurn(1);
    turn=1;
    return;}
    if(event.data=='begin2')
    {alert('游戏开始');transTurn(0);return;}
    play(event.data);
    transTurn(1);
    turn=1;
}