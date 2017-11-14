var express = require('express');
var child_process = require('child_process');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');

/* GET users listing. */
router.get('/', function (req, res, next) {
    fs.readdir('./../blog/source/_posts', function (err, files) {
        res.json({result:files})
    })

});

router.delete('/:fileName', function (req, res, next) {
    if(!req.params.fileName){
        res.sendStatus(400);
        res.end();
    }else{
        console.log(req.url);
        console.log(req.query)
        fs.unlink('./../blog/source/_posts/'+req.params.fileName,function (err) {
            if(err){
                res.status(404).send(err);
                res.end();
            }else {
                var result='';
                var ls = child_process.spawn('./bin/shell');
                ls.stdout.on('data', function (data) {
                    result=result+data+'<br>';
                });

                ls.stderr.on('data', function (data) {
                    result=result+data+'<br>';
                });

                ls.on('close', function (data) {
                    res.json({result});
                })
            }

        })

    }


})

router.post('/', function (req, res, next) {
    var form = new formidable.IncomingForm();
    var uploadPath = './../blog/source/_posts/';
    form.uploadDir=uploadPath;
    form.parse(req, function(err, fields, files) {
        var originName = files.file.name;
        var nowName = files.file.path;
        fs.stat(uploadPath+originName,function (err) {
            if(err){
                fs.rename(nowName,uploadPath+originName,function (err) {
                    if(err){
                        res.json(err);
                    }else{
                        var result='';
                        var ls = child_process.spawn('./bin/shell');
                        ls.stdout.on('data', function (data) {
                            result=result+data+'<br/>';
                        });

                        ls.stderr.on('data', function (data) {
                            result=result+data+'<br/>';
                        });

                        ls.on('close', function (data) {
                            res.json({result});
                        })
                    }
                })
            }else {
                fs.unlink(nowName,function (err) {})
                res.json({result:'该文件已存在'});
            }
        })

    });
})

module.exports = router;
