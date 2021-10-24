var token,page=1,totalnum,uuidlist=new Array(6);
function updatelist(x)//更新房间列表
{
    document.getElementById('pagenum').innerHTML='第'+x+'页';
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
            var i;
            obj=JSON.parse(txt);
            totalnum=obj.data.total_page_num;
            for(i=0;i<obj.data.games.length;i++)
            {
                uuidlist[i]=obj.data.games[i].uuid;
                document.getElementById('no'+i).innerHTML='uuid:'+obj.data.games[i].uuid+"<br>"+'host:'+obj.data.games[i].host_id+"<br>"+'client:'+obj.data.games[i].client_id+"<br>"+'created_at:'+obj.data.games[i].created_at;
            }
        }
    }
    xmlhttp.open("GET","http://172.17.173.97:9000/api/game/index?page_size=6&page_num="+x,true);
    xmlhttp.setRequestHeader("Authorization",token);
    xmlhttp.send();
}
function GetRequest() //获取token，初始化
{
var url = location.search; //获取url中"?"符后的字串
if (url.indexOf("?") != -1)     //判断是否有参数
{
    var str = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
    var strs = str.split("=");   //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
    token=strs[1];
}
updatelist(1);
}
function backpage()//前往上一页
{
    if(page>1)
    {
        page--;
        updatelist(page);
    }
}
function nextpage()//前往下一页
{
    if(page<totalnum)
    {
        page++;
        updatelist(page);
    }
}
function newroom()//创建新房间
{
    var xmlhttp;
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
            var obj=JSON.parse(txt);
            window.open('../联机/联机.html?token='+token+'&uuid='+obj.data.uuid+'&p=0','_self');
        }
    }
    xmlhttp.open("POST","http://172.17.173.97:9000/api/game",true);
    xmlhttp.setRequestHeader("Authorization",token);
    xmlhttp.send();
}
function into(x)//进入uid为x的房间
{
    var xmlhttp;
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
            window.open('../联机/联机.html?token='+token+'&uuid='+x+'&p=1','_self');
        }
    }
    xmlhttp.open("POST","http://172.17.173.97:9000/api/game/"+x,true);
    xmlhttp.setRequestHeader("Authorization",token);
    xmlhttp.send();
}
function sear()//搜索房间加入
{
    var uid=document.getElementById('box1').value;
    into(uid);
}
function goto(x)//加入列表上编号为x的房间
{
    into(uuidlist[x]);
}
function spage()//列表页面跳转
{
    var num=parseInt(document.getElementById('box2').value);
    page=num;
    if(num>0&&num<=totalnum)
    {
        updatelist(num);
    }
    else
    {
        alert('不存在此页');
    }
}