$(function () {
	//1.监听游戏规则的点击
	$(".rules").click(function () {
		$(".rule").stop().fadeIn(100);
	});
	//2.监听关闭按钮的点击
	$(".close").click(function () {
		$(".rule").stop().fadeOut(100);
	});
	//3.监听开始按钮点击
	$(".start").click(function () {
		$(this).stop().fadeOut(100);
	//调用处理进度条方法
	progressHandler ();
	//调用灰太狼动画的方法
	StartwolfAnimation ();
	});
	//4.点击重新开始按钮
	$(".reStart").click(function () {
		$(".mask").stop().fadeOut(100);
		progressHandler ();
		//重新开始动画
		StartwolfAnimation();
	});
	//定义一个专门的进度条方法
	function progressHandler() {
		//重新设置进度条宽度
		$(".progress").css({
				width: 180
				});
		//开启定时器处理进度条
		var timer = setInterval(function () {
			//拿到当前进度条长度\
			var progressWidth = $(".progress").width();
			progressWidth -= 5;
			//重新给进度条宽度
			$(".progress").css({
				width: progressWidth
				});
			//监听进度条是否走完
			if (progressWidth <= 0) {
				//关闭定时器
				clearInterval(timer);
				//显示重新开始界面
				$(".mask").stop().fadeIn(100);
				//停止灰太狼动画
				StopWolfAnimation();
			};
		}, 1000);
	};
	var wolfTimer;
	//定义灰太狼动画方法
	function StartwolfAnimation () {
		//1.定义一个数组专门保存灰太狼和小灰灰图片
		var wolf_1 = ['./img/h0.png','./img/h1.png','./img/h2.png',
		'./img/h3.png','./img/h4.png','./img/h5.png','./img/h6.png',
		'./img/h7.png','./img/h8.png','./img/h9.png'];
		var wolf_2 = ['./img/x0.png','./img/x1.png','./img/x2.png',
		'./img/x3.png','./img/x4.png','./img/x5.png','./img/x6.png',
		'./img/x7.png','./img/x8.png','./img/x9.png'];
		//2.定义一个数组保存所有肯出现的位置
		var arrPos = [
		{left:"100px",top:"115px"},
		{left:"20px",top:"160px"},
		{left:"190px",top:"142px"},
		{left:"105px",top:"193px"},
		{left:"19px",top:"221px"},
		{left:"202px",top:"212px"},
		{left:"120px",top:"275px"},
		{left:"30px",top:"295px"},
		{left:"209px",top:"297px"}
		];
		//3.创建一个图片
		var $wolfImage = $("<img src='' class='wolfImage'>");
		//随机获取图片位置
		var posIndex = Math.round(Math.random() * 8);//获取0---8的值
		//4.设置图片位置
		$wolfImage.css({
			position: "absolute",
			left: arrPos[posIndex].left,
			top: arrPos[posIndex].top
		});
		//随机获取数组类型
		var wolfType = Math.round(Math.random()) ==0 ? wolf_1 : wolf_2;
		//5.设置图片内容
		window.wolfIndex = 0;//将局部变量转换成全局变量
		window.wolfIndexEnd = 5;
		wolfTimer = setInterval(function() {
			if (wolfIndex > wolfIndexEnd) {
				$wolfImage.remove();
				clearInterval(wolfTimer);
				//执行下一个动画
				StartwolfAnimation ();
			}
			$wolfImage.attr("src", wolfType[wolfIndex]);
			wolfIndex++;	
		}, 300);
		//6.将图片添加到界面上
		$(".container").append($wolfImage);
		//7.调用处理游戏规则的方法
		gameRules($wolfImage);
	}

	function gameRules($wolfImage) {
		$wolfImage.one("click", function () {//用one绑定事件,事件只能执行一次
			//修改索引
			window.wolfIndex = 5;//将局部变量转换成全局变量
			window.wolfIndexEnd = 9;
			//拿到当前图片的地址
			var $src = $(this).attr("src");
			//根据图片地址判断是否为灰太狼
			var flag = $src.indexOf("h") >=0;//查找src中是否有"h"字符,如果没有返回-1,如果有返回不是-1,>=0表示找到了
			//根据点击内容判断分数
			if (flag) {
				$(".score").text(parseInt($(".score").text()) + 10);
			} else {
				$(".score").text(parseInt($(".score").text()) - 10);
			}
		});
	}

	function StopWolfAnimation () {
		$(".wolfImage").remove();
		clearInterval(wolfTimer);
	}
});