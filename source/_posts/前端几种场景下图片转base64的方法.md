---
title: 前端几种场景下图片转base64的方法
date: 2018-05-22 23:34:17
tags: ["base64","node","canvas","file","图片"]
---

# 1. node服务器环境

node可以通过fs文件操作模块直接操作图片文件，将文件读取成buffer流，然后再通过toString方法，把文件转成dataUrl。

        let fs = require('fs')
        let imageBuf = fs.readFileSync('./../testImg.jpg')
        console.log('data:image/jpeg;base64,'+imageBuf.toString('base64'))
        
# 2. 前端文件上传场景

在前端上传文件的场景中，我们可以通过上传控件拿到文件的File对象，再通过FileReader对象的readAsDataURL方法，可以直接在文件上传完毕之后得到文件的dataUrl。
        
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
        <input type="file" id="file">
        <button onclick="upload()">upload</button>
        <script>
            function upload() {
                let fileReader = new FileReader()
                let file = document.getElementById('file').files[0]
                if(file) {
                    fileReader.readAsDataURL(file)
                    fileReader.onload = function (e) {
                        console.log(fileReader.result)
                    }
                }
            }
        </script>
        </body>
        </html>
        
# 3. 通过canvas绘制图片后转base64

canvas元素有个方法toDataURL(type, encoderOptions)可以将canvas元素转换成base64的图片dataUrl，type用于指定图片的格式(image/jpeg)。这样我们就可以先把图片绘制在canvas中，再把绘制好的canvas转换成dataUrl。这种场景也适用于网络资源中的图片，可以先加载网络上的图片绘制在canvas中然后转换成base64(注：canvas绘制图片时使用的图片不能跨域，需要设置图片对象image.crossOrigin = "Anonymous")。

        <!DOCTYPE html>
        <html >
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
        <script>
            let image = new Image()
            image.src = './../testImg.jpg'
            image.onload = function() {
                image.crossOrigin = "Anonymous" // 解决canvas绘制图片时跨域的问题，canvas引用的图片不能跨域
                let canvas = document.createElement('canvas')
                canvas.width = image.width
                canvas.height = image.height
                let ctx = canvas.getContext('2d')
                ctx.drawImage(image, 0, 0, image.width, image.height)
                let uri = canvas.toDataURL('image/jpeg')
                console.log(uri)
            }
        </script>
        </body>
        </html>
        
[demo地址](https://github.com/hswx/demo/tree/master/%E5%9B%BE%E7%89%87%E6%88%96%E8%80%85%E6%96%87%E4%BB%B6%E4%BC%A0base64%E7%9A%84%E5%87%A0%E7%A7%8D%E6%96%B9%E5%BC%8F)