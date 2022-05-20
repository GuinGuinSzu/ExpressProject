<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>滑块解锁封装js方法</title>
    <!--注：这里首次用到了iconfont的语法，即矢量图标-->
    <link rel="stylesheet" href="font/iconfont.css">
    <style>
        *{
            padding: 0;
            margin: 0;
        }
        #box{
            position: relative;
            width: 300px;
            height: 40px;
            margin: 0 auto;
            margin-top: 10px; 
            background-color: #e8e8e8;
            box-shadow: 1px 1px 5px rgba(0,0,0,0.2);
        }
        .bgColor{
            position: absolute;
            left:0;
            top:0;
            width:40px;
            height: 40px;
            background-color: lightblue;
        }
        .txt{
            position: absolute;
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            color: #000;
            text-align: center;
        }
        .slider{
            position: absolute;
            left:0;
            top:0;
            width: 50px;
            height: 38px;
            border: 1px solid #ccc;
            background: #fff;
            text-align: center;
            cursor: move;
        }
        .slider>i{
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
        }
        .slider.active>i{
            color:green;
        }
    </style>
</head>
<body>
    <div id="box" onselectstart="return false;">
        <div class="bgColor"></div>
        <div class="txt" >滑动解锁</div>
        <!--给i标签添加上相应字体图标的类名即可-->
        <div class="slider"><i class="iconfont icon-double-right"></i></div>
    </div>  
    <script>
        //一、定义了一个获取元素的方法
        function getEle(selector){
            return document.querySelector(selector);
        }
        //二、获取到需要用到的DOM元素
        var box = getEle("#box"),//容器
            bgColor = getEle(".bgColor"),//背景色
            txt = getEle(".txt"),//文本
            slider = getEle(".slider"),//滑块
            icon = getEle(".slider>i"),
            successMoveDistance = box.offsetWidth- slider.offsetWidth,//解锁需要滑动的距离
            downX,//用于存放鼠标按下时的位置
            isSuccess = false;//是否解锁成功的标志，默认不成功
 
        //三、给滑块添加鼠标按下事件
        slider.onmousedown = mousedownHandler;
 
        //3.1鼠标按下事件的方法实现
        function mousedownHandler(e){
            bgColor.style.transition = "";
            slider.style.transition = "";
            var e = e || window.event || e.which;
            downX = e.clientX;
            //在鼠标按下时，分别给鼠标添加移动和松开事件
            document.onmousemove = mousemoveHandler;
            document.onmouseup = mouseupHandler;
        };
 
        //四、定义一个获取鼠标当前需要移动多少距离的方法
        function getOffsetX(offset,min,max){
            if(offset < min){
                offset = min;
            }else if(offset > max){
                offset = max;
            }
            return offset;
        }
 
        //3.1.1鼠标移动事件的方法实现
        function mousemoveHandler(e){
            var e = e || window.event || e.which;
            var moveX = e.clientX;
            var offsetX = getOffsetX(moveX - downX,0,successMoveDistance);
            bgColor.style.width = offsetX + "px";
            slider.style.left = offsetX + "px";
 
            if(offsetX == successMoveDistance){
                success();
            }
            //如果不设置滑块滑动时会出现问题（目前还不知道为什么）
            e.preventDefault();
        };
 
        //3.1.2鼠标松开事件的方法实现
        function mouseupHandler(e){
            if(!isSuccess){
                bgColor.style.width = 0 + "px";
                slider.style.left = 0 + "px";
                bgColor.style.transition = "width 0.8s linear";
                slider.style.transition = "left 0.8s linear";
            }
            document.onmousemove = null;
            document.onmouseup = null;
        };
 
        //五、定义一个滑块解锁成功的方法
        function success(){
            isSuccess = true;
            txt.innerHTML = "解锁成功";
            bgColor.style.backgroundColor ="lightgreen";
            slider.className = "slider active";
            icon.className = "iconfont icon-xuanzhong";
            //滑动成功时，移除鼠标按下事件和鼠标移动事件
            slider.onmousedown = null;
            document.onmousemove = null;
        };
    </script>
</body>
</html>