var uuid,token,x=1,record='',begin=1,end=1;
function game()//向服务器获取上部操作
{
    var xmlhttp,obj;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function()
    {
        if(xmlhttp.readyState==4&&xmlhttp.status==200)
        {
            var txt=xmlhttp.responseText;
            obj=JSON.parse(txt);//将json字符串变成对象
            if(obj.data.last_msg=='对局刚开始'&&begin==1)//判断为游戏开始
            {
                begin=0;
                if(obj.data.your_turn)
                self.postMessage('begin');//先手
                else
                self.postMessage('begin2');//后手
            }
            if(obj.data.err_msg&&obj.data.err_msg=='对局已结束'&&end==1)//判断为游戏结束
            {
                end=0;
                self.postMessage('end');
            }
            if(obj.data.your_turn)
            {
                if(record!=obj.data.last_code)//判断为我的回合且还未修改过页面状态
                { 
                    record=obj.data.last_code;
                    self.postMessage(obj.data.last_code);//向主线程发送上部操作信息
                }
            }
        }
    }
    xmlhttp.open("GET","http://172.17.173.97:9000/api/game/"+uuid+"/last",true);
    xmlhttp.setRequestHeader("Authorization",token);
    xmlhttp.send();
}
self.onmessage=function(event)//worker初始化并开始监听
{
    var theRequest = new Object();
    if (event.data.indexOf("?") != -1) {
    var str = event.data.substr(1);
    var strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }}
    uuid=theRequest['uuid'];
    token=theRequest['token'];//获取主线程发来的数据
    setInterval('game()',1000);//循环请求
}