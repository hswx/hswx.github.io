---
title: flex布局
date: 2017-11-01 11:51:08
tags: ["flex"]
---

# 概念 
Flex即"弹性布局"，任何一个容器元素都可以指定为 Flex 布局。设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效，采用flex的相关属性来代替。详细讲解及demo跳转到[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)，[Flex 布局示例](http://static.vgee.cn/static/index.html)。

	.box{
	  display: flex;
	}
	
# 1 容器属性
	
容器属性：flex-direction、flex-wrap、flex-flow、justify-content、align-items、align-content。容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。

## 1.1 flex-direction

row(默认值)：主轴为水平方向，起点在左端。

row-reverser：主轴为水平方向，起点在右端。

column：主轴为垂直方向，起点在顶部。

column：主轴为垂直方向，起点在底部。

## 1.2 flex-wrap

nowrap（默认）：不换行。

wrap：换行，第一行在上方。

wrap-reverse：换行，第一行在下方。

## 1.3 flex-flow

flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。

## 1.4 justify-content

flex-start（默认值）：主轴左对齐。

flex-end：主轴右对齐。

center： 主轴居中。

space-between：主轴两端对齐，项目之间的间隔都相等。

space-around：主轴每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

## 1.5 align-items

flex-start：交叉轴的起点对齐。

flex-end：交叉轴的终点对齐。

center：交叉轴的中点对齐。

baseline: 项目的第一行文字的基线对齐。

stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。 

## 1.6 align-content（多根轴线的情况）

flex-start：与交叉轴的起点对齐。

flex-end：与交叉轴的终点对齐。

center：与交叉轴的中点对齐。

space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。

space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。

stretch（默认值）：轴线占满整个交叉轴。

# 2 子元素属性

子元素属性：order、flex-grow、flex-shrink、flex-basis、flex、align-self。

## 2.1 order

order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

## 2.2 flex-grow

flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

## 2.3 flex-shrink

flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。负值对该属性无效。

## 2.4 flex-basis

flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

## 2.5 flex

flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

## 2.6 align-self

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。