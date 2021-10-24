var url;
function GetRequest() {
url = location.search; //获取url中"?"符后的字串
}
document.getElementById('on').onclick=function()
{
    window.open('../room/room.html'+url,'_self');
}