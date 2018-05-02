---
title: bodymovin(Lottie)插件编写跨平台复杂动效
date: 2018-04-23 22:30:49
tags: ["bodymovin","动效"]
---

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


![bodymovin](/hswxBlog/images/bodymovin.gif)
        
## 初始化

    let animationInstance = bodymovin.loadAnimation(options)
    
<span id="options">options</span>对象可以放入以下参数：

| 参数 | 类型 | 备注 |
| - | :-: | - |
| name | String | 动画名称，用于后续的使用 |
| container | Object | 渲染动画的dom元素对象 |
| renderer | String | 动画的渲染方式，可以是svg/html/canvas |
| loop | Boolean/Integer | 循环播放的次数，可以是false（不循环）/true（无限循环）/n（n为正整数，表示循环n次） |
| autoplay | Boolean | 加载完是否自动播放 |
| animationData | Object | 动画数据对象（该属性与path只能用其中一个） |
| path | String | 动画数据文件的相对路径，使用该属性的时候，需要在服务器环境运行，推荐使用http-server |

demo示例请点击[此处](https://github.com/hswx/demo/tree/master/bodymovin%E7%A4%BA%E4%BE%8B)下载

## 实例方法

初始化之后会得到一个动画实例 animationInstance ，该实例可以使用以下方法：

play() // 播放动画。
stop() // 停止动画（下次播放从头开始）。
pause() // 暂停动画（下次播放从当前暂停处开始）。
setSpeed(speed) // 设置动画播放的速度，1为正常速度。
goToAndStop(value, isFrame) // 跳转到某一时间（或帧）后暂停。value表示跳转到的点，类型是数值。isFrame类型为Boolean，true表示跳转到某帧，false表示跳转到某个时间。
goToAndPlay(value, isFrame) // 跳转到某一时间（或帧）后播放。参数同上。
setDirection(direction) // 播放的矢量方向，>=0表示正向播放，<0表示倒序播放。 
playSegments(segments, forceFlag) // 播放某一段。segments类型是数组，形式为[(a,b),(c,d),(e,f)...]，表示播放第a帧到b帧，然后第c帧到d帧，依此类推。forceFlag为第二个参数为Boolean类型，表示是否立即播放本段动画还是等待当前动画播放完毕。
destroy() // 销毁动画实例。

## 全局方法

bodymovin对象也有以下几个方法可以使用：

bodymovin.play(name) // 播放name名称的动画。
bodymovin.stop(name) // 停止name名称的动画。
bodymovin.setSpeed(speed, name) // 设置名称为name的动画的速度，name可不填，1为正常速度。
bodymovin.setDirection(direction， name) // 称为name的动画播放的矢量方向，name可不填，>=0表示正向播放，<0表示倒序播放。 
bodymovin.searchAnimations() // 查找class值为"bodymovin"的dom元素。 
bodymovin.loadAnimation() // 初始化一个动画实例。参数见[用法](#options)。
bodymovin.destroy() // 销毁所有动画实例
bodymovin.registerAnimation() // 注册一个自定义元素，它必须包含"data-animation-path"属性并指向data.json的地址。
bodymovin.setQuality() // 画质设置，默认为高画质(high), 可选值为'high'、'medium'、'low', 或者大于1的数字。对于有的动画这些设置差别不大。

## 事件监听

bodymovin可以监听以下事件，或者可以直接用addEventListener监听事件(complete/loopComplete/enterFrame/segmentStart)：

onComplete // 动画播放完成
onLoopComplete // 每个动画循环播放完成
onEnterFrame // 进入某一帧前触发
onSegmentStart // 某个播放片段开始前触发
