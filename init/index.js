#!/usr/bin/env node  
const fs = require('fs');
const process = require('process');
const path = require('path');
console.log(__dirname);
var changeContent = {
    dir:process.argv[2],    // 获取命令行我们传的参数（我们传的参数需用区分大小写，因为涉及到文件名以及文件夹名）
    lowdir:process.argv[2].toLocaleLowerCase() // 这里我把参数都转换为小写，给需用写小写的地方切换为小写
}

// 读取目录函数（用promise封装一个读取目录的函数来读取我们项目的目录，以下几个函数都是这样实现的，由于着急没有封装错误处理机制，所以我们初始化项目的项目名称相同的话就会报错）
var dirPromise = function (dir){
    return new Promise((resolve,reject)=>{
        fs.readdir(dir,function(err,files){
            if(!err){
                resolve(files);
            }else{
                reject(err);
            }
        })
    })
}
// 读取文件内容函数
var contentPromise =function (dir){
    return new Promise((resolve,reject)=>{
        fs.readFile(dir,'utf-8',function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(err);
            }
        })
    })
}
// 写入代码函数
var writeContenPromise = function(dir,data){
    return new Promise((resolve,reject)=>{
        fs.writeFile(dir,data,function(err){
            if(!err){
                console.log('写入成功')
            }
        })
    })
}
// 改变文件名称
var reNameFile = function(olddir,newdir){
    return new Promise((resolve,reject)=>{
        fs.rename(olddir,newdir,function(err){
            !err&&resolve('修改成功');
        })
    })
}
// 创建文件
var createFile = function(dir){
    return new Promise((resolve,reject)=>{
        fs.writeFile(dir,function(err){
            if(!err){
                resolve('创建成功');
            }
        })
    })
}
// 給dev中添加新的頁面步驟
contentPromise('./webpack/dev.config.js').then((data)=>{
    let replaceData = data;
    let entry = replaceData.trim().slice(replaceData.indexOf('entry'), replaceData.indexOf('output'));
    // 这里我的实现方式是把entry整个对象拿出来，因为拿出来是一个字符串，我直接在其后面把我需用加的内容以字符串的方式添加进去，prod.config文件处理方式相同，page.js也一样
    let newPage = `,'${changeContent.lowdir}': [
        'webpack-hot-middleware/client?overlay='+overlay+'&path=http://' + host + ':' + port + '/__webpack_hmr',
        './src/containers/${changeContent.dir}/client.js'
    ]`
    let newEntry='entry: {'+entry.trim().slice(8,-2)+newPage+'},';
    let lastData = replaceData.replace(entry,newEntry)
    writeContenPromise('./webpack/dev.config.js',lastData);
    // console.log(lastData)
})
// 给prod.config中添加内容
contentPromise('./webpack/prod.config.js').then((data)=>{
    let replaceData = data;
    let entry = replaceData.trim().slice(replaceData.indexOf('entry'), replaceData.indexOf('output'));
    let newPage = `,
    '${changeContent.lowdir}': [
        './src/containers/${changeContent.dir}/client.js'
    ]`
    let newEntry='entry: {'+entry.trim().slice(8,-2)+newPage+'},';
    let lastData = replaceData.replace(entry,newEntry)
    writeContenPromise('./webpack/prod.config.js',lastData);
    // console.log(lastData)
})
// 給page.js文件中添加內容(通过字符串截取的方式)
contentPromise('./src/routes/page.js').then((data)=>{
    let replaceData = data;
    let lastData = replaceData.slice(0,-26)+`
router.get('/${changeContent.lowdir}/?*', function(req, res, next) {
    const rootReucer = require("../containers/${changeContent.dir}/rootReducer");
    reactRender(req,res,"${changeContent.lowdir}",null,rootReucer)
});
module.exports = router;`
    // console.log(replaceData.slice(0,-26))
    writeContenPromise('./src/routes/page.js',lastData);
    // console.log(lastData)
})
// 创建html文件
let htmlData = `{% extends 'layout.html' %}
{% block css %}
<link href="{{css.${changeContent.lowdir}}}" rel="stylesheet" type="text/css" charSet="UTF-8"/>
{% endblock %}
{% block js %}
<script src="{{js.${changeContent.lowdir}}}" charSet="UTF-8" ></script>
{% endblock %}
`
writeContenPromise('./src/template/'+changeContent.lowdir+'.html',htmlData).then((data)=>{
    console.log('创建html文件成功')
})
// 在container中新建容器（container容器里面的文件我封装我的命令里面，我直接copy到咱们对应的项目目录中）

dirPromise(path.resolve(__dirname,'publicTemplate/containers','.')).then((file)=>{
    // console.log(data)
    fs.mkdirSync(`./src/containers/${changeContent.dir}`);
    file.map((item,index)=>{
        console.log(item)
        // 这里我对我们将要新建的目录文件名称把模板修改成我们定义的文件名称
        if(item=='message.js'){
            fs.createReadStream(path.resolve(__dirname,`publicTemplate/containers/${item}`,'.')).pipe(fs.createWriteStream(`./src/containers/${changeContent.dir}/${changeContent.dir}.js`));
        }else{
            fs.createReadStream(path.resolve(__dirname,`publicTemplate/containers/${item}`,'.')).pipe(fs.createWriteStream(`./src/containers/${changeContent.dir}/${item}`));            
        }
    })
})



