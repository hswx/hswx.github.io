---
title: Node.js创建HTTP服务
date: 2017-10-27 16:30:39
tags: ["Node.js","HTTP","http"]
---
   
   1、引入模块，通过变量来接收
   
   2、通过http.createServer()创建服务，注意后面跟上一个匿名函数
   
   request 请求
   
   response 响应
   
   3、通过server.listen()监听了端口号和访问地址
   
   4、通过response.writeHead()设置网页状态码和文档内容类型
   
   5、通过response.end()返回结果

	var http = require("http");//变量http得到被引入模块"http"的所有接口
	
	//创建服务器，参数是一个回调函数，表示如果有请求进来，要做什么
	var server = http.createServer(function (request,response) {
	    /*
	       设置响应HTTP头部信息
	       第一个参数：传入网页状态码，200表示请求正常
	       第二个参数：设置文档内容类型，text/html表示html文档类型，charset=UTF-8表示文档编码类型是UTF-8
	     */
	    response.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
	
	    /*
	      Node.js没有web容器概念，不管访问路径是什么，同一个host下都是返回同一个页面，并不会有区别
	      比如localhost:3000和localhost:3000/test返回同样的结果
	     */
	    console.log(1);//发起请求时，控制台会出现两次：一次是正常请求，一次是小图标favicon.icon
	    console.log("请求地址"+request.url);
	    response.end("hello");//如果没有执行response.end()会存在挂起状态
	});
	
	server.listen(3000,"127.0.0.1");
	
	/*
	   服务器默认端口号：80端口
	   Tomcat默认端口：8080
	 */