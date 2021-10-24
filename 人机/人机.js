var flags=new Array(53);
var i,rest=52,element;
var stack=[],mycard1=[],mycard2=[],mycard3=[],mycard4=[],opcard1=[],opcard2=[],opcard3=[],opcard4=[];
var len=0,mynum1=0,mynum2=0,mynum3=0,mynum4=0,opnum1=0,opnum2=0,opnum3=0,opnum4=0;
for(i=0;i<=51;i++)
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
function orienta(element,x)//修改element的牌面为x
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
   orienta(element,x);
}
function updateMyCard()//更新手牌牌面
{
   var j,element;
   if(mynum1)
   {
        element=document.getElementById('my1');
        orienta(element,mycard1[mynum1-1]);
    }
    else
    {
        element=document.getElementById('my1');
        reset(element);
    }
    if(mynum2)
    {
        element=document.getElementById('my2');
        orienta(element,mycard2[mynum2-1]);
    }
    else
    {
        element=document.getElementById('my2');
        reset(element);
    }
    if(mynum3)
    {
        element=document.getElementById('my3');
        orienta(element,mycard3[mynum3-1]);
    }
    else
    {
        element=document.getElementById('my3');
        reset(element);
    }
    if(mynum4)
    {
        element=document.getElementById('my4');
        orienta(element,mycard4[mynum4-1]);
    }
    else
    {
        element=document.getElementById('my4');
        reset(element);
    }
    return;
}
function updateOpCard()//更新对手手牌牌面
{
    var j,element;
    if(opnum1)
    {
        element=document.getElementById('op1');
        orienta(element,opcard1[opnum1-1]);
    }
    else
    {
        element=document.getElementById('op1');
        reset(element);
    }
    if(opnum2)
    {
        element=document.getElementById('op2');
        orienta(element,opcard2[opnum2-1]);
    }
    else
    {
        element=document.getElementById('op2');
        reset(element);
    }
    if(opnum3)
    {
        element=document.getElementById('op3');
        orienta(element,opcard3[opnum3-1]);
    }
    else
    {
        element=document.getElementById('op3');
        reset(element);
    }
    if(opnum4)
    {
        element=document.getElementById('op4');
        orienta(element,opcard4[opnum4-1]);
    }
    else
    {
        element=document.getElementById('op4');
        reset(element);
    }
    return;
}
function judge(x)//判断x与判定牌是否相同
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
function transTurn(x)
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
function play(num)//打出手牌
{
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
    setTimeout('robot()',2000);
    if(gameover())
        return;
    return;
}
document.getElementById('paidui').onclick=function draw_card()//打出牌堆顶的牌
{
    var x=newcard();
    rest--;
    element=document.getElementById('paidui');
    orienta(element,x);
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
    if(gameover())
        return;
    transTurn(0);
    setTimeout('robot()',2000);
    if(gameover())
        return;
    return;
}
function com()//判断对手是否可以打出手牌
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
function robot()//机器人
{
    if(!com())
    {
        var x=newcard();
        rest--;
        element=document.getElementById('paidui');
        orienta(element,x);
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
    return;
}