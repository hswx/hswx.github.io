---
title: bodymovin(Lottie)插件编写跨平台复杂动效
date: 2018-04-23 22:30:49
tags: ["bodymovin","动效"]
---

# bodymovin(Lottie)插件编写跨平台复杂动效
你还在为各种复杂动画头疼么，设计师想出了一个非常炫酷的动效，可是对程序员来说是很痛苦的，就web前端来说可能要写一堆的css和js才能完成这个动效，写出来的可能还是个bug。

最近发现一个动画插件bodymovin(Lottie)。首先在AE上做好的动画并导出为json文件，通过bodymovin可以将json数据在web([bodymovin.js](https://github.com/airbnb/lottie-web))/ios([lottie-ios](https://github.com/airbnb/lottie-ios))/安卓([lottie-android](https://github.com/airbnb/lottie-android))上渲染出AE中做好的动画，实现跨平台三端通用，支持渲染成svg/canvas/html三种格式。甚至对我们前端来说，有专门用于react框架的插件lottie-react-native。

bodymovin最后给出的就是如下的一串json文件，在动画生成实际的json文件之后，可以自行更改。这里展示的是资源是图片的情况下生成的json文件

    {
        "v": "4.6.9", // bodymovin版本号
        "fr": 25,
        "ip": 0,
        "op": 125,
        "w": 984, // 动画宽度
        "h": 560, // 动画高度
        "nm": "anim", // 动画名称
        "ddd": 0,
        "assets": [ // 静态资源数组
          {
            "id": "image_0", // 静态资源id
            "w": 168, // 静态资源宽度
            "h": 194, // 静态资源高度
            "u": "images/", // 静态资源所在目录
            "p": "img_0.png" // 静态资源文件名
          }
          ...
        ]
        "layers":[ ... ] // 动画数据
      
关于AE生成json文件的方法，这里不做赘述，那是设计师的事儿，感兴趣的可以看[官方教程](https://github.com/airbnb/lottie-web#plugin-installation)，还有中文版[教程1](https://www.cnblogs.com/zamhown/p/6688369.html)，[教程2](https://github.com/bigxixi/bodymovin#%E5%AE%89%E8%A3%85%E6%96%B9%E5%BC%8F1%E6%8E%A8%E8%8D%90)

## 安装

从github中build/player/目录下获取最新版本[lottie.js文件](https://github.com/airbnb/lottie-web/tree/master/build/player)。当然，也可以使用npm或者bower等工具进行下载

    npm install lottie-web
    
或
    
    bower install lottie-web
    
## 引入

可以直接通过script标签引入js文件  
    
    <script src="js/lottie.js" type="text/javascript"></script>

当然，从lottie的源码来看，也是可以通过import等模块化引入方式进行引入的。源码中还有一点，在全局引入的方式中，将全局变量lottie赋值给了bodymovin，因此全局既可以用lottie，也可以用bodymovin。原本插件叫bodymovin，后来改成了lottie。
    
        (typeof navigator !== "undefined") && (function(root, factory) {
            if (typeof define === "function" && define.amd) {
                define(function() {
                    return factory(root);
                });
            } else if (typeof module === "object" && module.exports) {
                module.exports = factory(root);
            } else {
                root.lottie = factory(root);
                root.bodymovin = root.lottie;
            }
        }((window || {}), function(window) {