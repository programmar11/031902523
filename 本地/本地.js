var flags=new Array(53);//记录哪一些牌已经被翻出
var i,rest=52,element,round=true;//rest为剩余牌数，round用来区分当前回合
var stack=[],mycard1=[],mycard2=[],mycard3=[],mycard4=[],opcard1=[],opcard2=[],opcard3=[],opcard4=[];//stack记录判定区的牌，mycard为1p的手牌（下面），opcard为2p手牌
var len=0,mynum1=0,mynum2=0,mynum3=0,mynum4=0,opnum1=0,opnum2=0,opnum3=0,opnum4=0;//len为判定区牌数，mynum为1p的手牌数，opnum为2p手牌数
var robotp1=false,robotp2=false;//标记是否开启人机
for(i=0;i<=51;i++)//初始化
{
    flags[i]=0;
}
flags[52]=1;
function newcard()//从牌堆中抽卡
{
    var card=52;
    while(flags[card]!=0)
    {
        card=parseInt(Math.random()*52,10);
    }
    flags[card]=1;
    return card;
}
function orientation(element,x)//修改element的牌面为x
{
    element.style.backgroundImage="url('../cards/ima"+x+".jpg')";
}
function reset(element)//将element牌面置为空
{
   element.style.backgroundImage="url('../cards/ima.jpg')";
}
function reset2(element)//将element牌面置为卡背
{
   element.style.backgroundImage="url('../cards/ima.jpg')";
}
function changec2(x)//改变判定位的牌面
{
   var element=document.getElementById('panding');
   orientation(element,x);
}
function auto1()//改变1p托管状态
{
    if(robotp1)
    {
        document.getElementById('autop1').innerHTML='托管';
        robotp1=false;
    }
    else
    {
        document.getElementById('autop1').innerHTML='托管中';
        robotp1=true;
    }
    checkRobot();
}
function auto2()//改变2p托管状态
{
    if(robotp2)
    {
        document.getElementById('autop2').innerHTML='托管';
        robotp2=false;
    }
    else
    {
        document.getElementById('autop2').innerHTML='托管中';
        robotp2=true;
    }
    checkRobot();
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
function judge(x)//判断x与判定牌是否相同,p1,若是则把判定区所有牌移到p1手牌
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
function gameover()//判断牌堆是否抽完，结算
{
    if(!rest)
    {
        var j=mynum1+mynum2+mynum3+mynum4,k=opnum1+opnum2+opnum3+opnum4;
        if(j<k)
        {
            document.getElementById('turn1').innerHTML="";
            document.getElementById('turn2').innerHTML="胜利！";
        }
        else if(j==k)
        {
            document.getElementById('turn1').innerHTML="平局";
            document.getElementById('turn2').innerHTML="平局";
        }
        else
        {
            document.getElementById('turn1').innerHTML="胜利！";
            document.getElementById('turn2').innerHTML="";
        }
        return true;
    }
    else
        return false;
}
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
function play1(num)//p1打出手牌
{
    if(robotp1)
    {
        alert('请先关闭托管');
        return;
    }
    if(!round)
    {
        alert('现在不是P1的回合');
        return;
    }
    if(num==1)
    {
        if(mynum1)
        {
            mynum1--;
            if(judge(mycard1[mynum1]))
            {updateMyCard();}
            else
            {stack[len++]=mycard1[mynum1];updateMyCard();changec2(mycard1[mynum1]);}
        }
    }
    else if(num==2)
    {
        if(mynum2)
        {
            mynum2--;
            if(judge(mycard2[mynum2]))
            {updateMyCard();}
            else
            {stack[len++]=mycard2[mynum2];updateMyCard();changec2(mycard2[mynum2]);}
        }
    }
    else if(num==3)
    {
        if(mynum3)
        {
            mynum3--;
            if(judge(mycard3[mynum3]))
            {updateMyCard();}
            else
            {stack[len++]=mycard3[mynum3];
            updateMyCard();
            changec2(mycard3[mynum3]);}
        }
    }
    else if(num==4)
    {
        if(mynum4)
        {
            mynum4--;
            if(judge(mycard4[mynum4]))
            {updateMyCard();}
            else
            {stack[len++]=mycard4[mynum4];updateMyCard();
            changec2(mycard4[mynum4]);}
        }
    }
    transTurn(0);
    round=!round;
    if(robotp2)
    setTimeout('robot()',1000);
}
function play2(num)//p2打出手牌
{
    if(robotp2)
    {
        alert('请先关闭托管');
        return;
    }
    if(round)
    {
        alert('现在不是P2的回合');
        return;
    }
    if(num==1)
    {
        if(opnum1)
        {
            opnum1--;
            if(judge(opcard1[opnum1]))
            {updateOpCard();}
            else
            {stack[len++]=opcard1[opnum1];updateOpCard();changec2(opcard1[opnum1]);}
        }
    }
    else if(num==2)
    {
        if(opnum2)
        {
            opnum2--;
            if(judge(opcard2[opnum2]))
            {updateOpCard();}
            else
            {stack[len++]=opcard2[opnum2];updateOpCard();changec2(opcard2[opnum2]);}
        }
    }
    else if(num==3)
    {
        if(opnum3)
        {
            opnum3--;
            if(judge(opcard3[opnum3]))
            {updateOpCard();}
            else
            {stack[len++]=opcard3[opnum3];updateOpCard();changec2(opcard3[opnum3]);}
        }
    }
    else if(num==4)
    {
        if(opnum4)
        {
            opnum4--;
            if(judge(opcard4[opnum4]))
            {updateOpCard();}
            else
            {stack[len++]=opcard4[opnum4];updateOpCard();changec2(opcard4[opnum4]);}
        }
    }
    transTurn(1);
    round=!round;
    if(robotp1)
    setTimeout('robot2()',1000);
}
document.getElementById('paidui').onclick=function draw_card()//打出牌堆顶的牌
{
    if(round&&robotp1)
    {
        alert('请先关闭托管');
        return;
    }
    else if(!round&&robotp2)
    {
        alert('请先关闭托管');
        return;
    }
    var x=newcard();
    rest--;
    element=document.getElementById('paidui');
    orientation(element,x);
    setTimeout('reset2(element)',500);
    if(len==0)
    {
        stack[len++]=x;
        changec2(x);
    }
    else
    {
        if(round)
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
    }
    if(round)
    {
        transTurn(0);
    }
    else
    {
        transTurn(1);
    }
    round=!round;
    if(gameover())
        return;
    checkRobot();
}
function com()//判断p2是否可以打出手牌
{
    if(opnum1+opnum2+opnum3+opnum4)
    {
        var num=new Array(4),j,k,t,sign=new Array(4);
        num[0]=opnum1;
        num[1]=opnum2;
        num[2]=opnum3;
        num[3]=opnum4;
        sign[0]=1;
        sign[1]=2;
        sign[2]=3;
        sign[3]=4;
        for(j=0;j<4;j++)
        {
            for(k=j+1;k<4;k++)
            {
                if(num[j]<num[k])
                {
                    t=num[j];
                    num[j]=num[k];
                    num[k]=t;
                    t=sign[j];
                    sign[j]=sign[k];
                    sign[k]=t;
                }
            }
        }
        if(len==0)
        {
            if(sign[0]==1)
            {
                opnum1--;
                updateOpCard();
                stack[len++]=opcard1[opnum1];
                changec2(opcard1[opnum1]);
            }
            else if(sign[0]==2)
            {
                opnum2--;
                updateOpCard();
                stack[len++]=opcard2[opnum2];
                changec2(opcard2[opnum2]);
            }
            else if(sign[0]==3)
            {
                opnum3--;
                updateOpCard();
                stack[len++]=opcard3[opnum3];
                changec2(opcard3[opnum3]);
            }
            else if(sign[0]==4)
            {
                opnum4--;
                updateOpCard();
                stack[len++]=opcard4[opnum4];
                changec2(opcard4[opnum4]);
            }
            return true;
        }
        else
        {
            for(j=0;j<4;j++)
            {
                if(num[j]&&parseInt(stack[len-1]/13)!=sign[j]-1)
                    break;
            }
            if(j==4)
                return false;
            else
            {
                if(sign[j]==1)
                {
                    opnum1--;
                    updateOpCard();
                    stack[len++]=opcard1[opnum1];
                    changec2(opcard1[opnum1]);
                }
                else if(sign[j]==2)
                {
                    opnum2--;
                    updateOpCard();
                    stack[len++]=opcard2[opnum2];
                    changec2(opcard2[opnum2]);
                }
                else if(sign[j]==3)
                {
                    opnum3--;
                    updateOpCard();
                    stack[len++]=opcard3[opnum3];
                    changec2(opcard3[opnum3]);
                }
                else if(sign[j]==4)
                {
                    opnum4--;
                    updateOpCard();
                    stack[len++]=opcard4[opnum4];
                    changec2(opcard4[opnum4]);
                }
                return true;
            }
        }
    }
    else
        return false;
}
function robot()//p2机器人
{
    if(!com())
    {
        var x=newcard();
        rest--;
        element=document.getElementById('paidui');
        orientation(element,x);
        setTimeout('reset2(element)',500);
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
    }
    transTurn(1);
    round=!round;
    if(gameover())
    {
        robotp1=0;
        robotp2=0;
    }
    checkRobot();
    return;
}
function com2()//判断p1是否可以打出手牌
{
    if(mynum1+mynum2+mynum3+mynum4)
    {
        var num=new Array(4),j,k,t,sign=new Array(4);
        num[0]=mynum1;
        num[1]=mynum2;
        num[2]=mynum3;
        num[3]=mynum4;
        sign[0]=1;
        sign[1]=2;
        sign[2]=3;
        sign[3]=4;
        for(j=0;j<4;j++)
        {
            for(k=j+1;k<4;k++)
            {
                if(num[j]<num[k])
                {
                    t=num[j];
                    num[j]=num[k];
                    num[k]=t;
                    t=sign[j];
                    sign[j]=sign[k];
                    sign[k]=t;
                }
            }
        }
        if(len==0)
        {
            if(sign[0]==1)
            {
                mynum1--;
                updateMyCard();
                stack[len++]=mycard1[mynum1];
                changec2(mycard1[mynum1]);
            }
            else if(sign[0]==2)
            {
                mynum2--;
                updateMyCard();
                stack[len++]=mycard2[mynum2];
                changec2(mycard2[mynum2]);
            }
            else if(sign[0]==3)
            {
                mynum3--;
                updateMyCard();
                stack[len++]=mycard3[mynum3];
                changec2(mycard3[mynum3]);
            }
            else if(sign[0]==4)
            {
                mynum4--;
                updateMyCard();
                stack[len++]=mycard4[mynum4];
                changec2(mycard4[mynum4]);
            }
            return true;
        }
        else
        {
            for(j=0;j<4;j++)
            {
                if(num[j]&&parseInt(stack[len-1]/13)!=sign[j]-1)
                    break;
            }
            if(j==4)
                return false;
            else
            {
                if(sign[j]==1)
                {
                    mynum1--;
                    updateMyCard();
                    stack[len++]=mycard1[mynum1];
                    changec2(mycard1[mynum1]);
                }
                else if(sign[j]==2)
                {
                    mynum2--;
                    updateMyCard();
                    stack[len++]=mycard2[mynum2];
                    changec2(mycard2[mynum2]);
                }
                else if(sign[j]==3)
                {
                    mynum3--;
                    updateMyCard();
                    stack[len++]=mycard3[mynum3];
                    changec2(mycard3[mynum3]);
                }
                else if(sign[j]==4)
                {
                    mynum4--;
                    updateMyCard();
                    stack[len++]=mycard4[mynum4];
                    changec2(mycard4[mynum4]);
                }
                return true;
            }
        }
    }
    else
        return false;
}
function robot2()//p1机器人
{
    if(!com2())
    {
        var x=newcard();
        rest--;
        element=document.getElementById('paidui');
        orientation(element,x);
        setTimeout('reset2(element)',500);
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
    }
    transTurn(0);
    round=!round;
    if(gameover())
    {
        robotp1=0;
        robotp2=0;
    }
    checkRobot();
    return;
}
function checkRobot()//检查是否开启托管
{
    if(!round&&robotp2)
    setTimeout('robot()',1000);
    else if(round&&robotp1)
    setTimeout('robot2()',1000);
}