$(document).ready(function()
{
    $('#login').click(function()
    {
        var x1=$("#box1").val();
        var x2=$("#box2").val();
        $.post("http://172.17.173.97:8080/api/user/login",
        {
            student_id:x1,
            password:x2
        },
        function(data,status)
        {
            if(status!='success')
            {
                alert('账号或密码错误');
                return;
            }
            window.open('../对战选择/对战选择.html?data='+data.data.token,'_self');
        },"json")
    })
});