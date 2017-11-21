---
title: js模块化
date: 2017-11-21 17:00:14
tags: ["打包","模块化","CMD","AMD","CommonJS","webpack","browserify","requireJs","seajs"]
---

# 1 为什么要模块化

看个具体例子吧，有三个js文件分别是util.js，a-util.js，a.js：

	//util.js
	function getFormatString(word,type) {
	    if(type===1){
	        return word+"1";
	    }
	    if(type===2){
	        return word+"2";
	    }
	}
	
	//a-util.js
	function aGetFormatDate(word) {
	    return getFormatString(word,2);
	}
	
	//a.js
	var word="hello";
	console.log(aGetFormatDate(word));
 
其中a.js的执行依赖于a-util.js，a-util.js的执行依赖于util.js。按照这样的依赖顺序，页面使用的时候必须这样写：

	<script src="util.js"></script>
	<script src="a-util.js"></script>
	<script src="a.js"></script>

这样的写法暴露出了很多的问题：

1.这些代码中的函数必须是全局变量才能暴露给使用方，造成了全局污染。

2.加载的时候，浏览器会停止网页渲染，加载文件越多，网页失去响应的时间就会越长。

3.js文件之间存在依赖关系，因此必须严格保证加载顺序，当依赖关系很复杂的时候，代码的编写和维护都会变得困难。

这样我们就需要对各个文件进行模块化的处理，管理各个文件模块之间的依赖，按需异步加载相关的js文件，这样才能避免网页失去响应，方便代码的编写与维护。

# 2 CMD、AMD、CommonJS

## CommonJS

CommonJS规范主要用于服务端。CommonJS中，有一个全局性方法require()，用于加载模块。

CommonJS定义的模块分为:{模块引用(require)} {模块定义(exports)} {模块标识(module)}

require()用来引入外部模块；exports对象用于导出当前模块的方法或变量，唯一的导出口；module对象就代表模块本身。浏览器不兼容CommonJS的根本原因，就在于缺少require,exports,module以及global这四个Node.js环境的变量。

## CMD和AMD

CMD(Common Module Definition，[CMD 模块定义规范](https://github.com/seajs/seajs/issues/242))和AMD(Asynchronous Module Definition，[AMD (中文版)](https://github.com/amdjs/amdjs-api/wiki/AMD-(%E4%B8%AD%E6%96%87%E7%89%88)))都是前端的异步加载机制。

seajs应用了CMD规范，依赖就近，用的时候再require。需要使用把模块变为字符串解析一遍才知道依赖了那些模块，牺牲性能来带来开发的便利性。

	define(function(require, exports, module) {
	   var clock = require('clock');
	   clock.start();
	});


requireJs应用了AMD规范。先定义所有依赖，然后在加载完成后的回调函数中执行。js可以方便知道依赖模块是谁，立即加载。

	require(['clock'],function(clock){
	  clock.start();
	});

## webpack和browserify

webpack和browserify属于前端模块化打包工具。seajs和requirejs会在页面上加载一个CMD/AMD解释器，使得浏览器在线加载模块以实现模块化。而webpack和browserify属于预编译方案，不需要浏览器加载解释器，webpack和browserify会在本地编译各个风格的模块化js，编译成浏览器能够执行的js文件。
![](https://pic4.zhimg.com/v2-ae9253e557d902369b1beaed998061cb_r.jpg)

> 参考：[浅析模块化规范](http://www.jianshu.com/p/09ffac7a3b2c)，[Webpack、Browserify和Gulp三者之间到底是怎样的关系](https://www.zhihu.com/question/37020798)

