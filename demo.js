const fs = require('fs')
const path = require('path')

var dirname = process.argv[2]   // 获取要创建文件夹名称
var filenames =  fs.readdirSync('./')   // 获取进程目录下的文件列表

// 判断是否传入要创建文件夹名称
if(!dirname) {
    console.log('缺少文件夹名称参数')
    process.exit()
}

forFiles(0)

// 判断是否已存在该文件夹
function forFiles(i) {
    if(i > filenames.length-1) {
        newDir()    // 如果不存在则创建该文件夹
    } else if(filenames[i] === dirname) {
        return console.log('该文件夹已存在')
    } else {
        i++
        forFiles(i)
    }
}
function newDir() {
    var dirpath = path.dirname(process.argv[1])    // 获取demo.js所在目录地址
    fs.mkdirSync(dirname)   // 创建该文件夹
    process.chdir(dirname)    // 进入该文件夹
    fs.mkdirSync('css')    // 创建所需文件夹
    fs.mkdirSync('js')
    fs.copyFileSync(dirpath + '/template/index.html', './index.html')    // 从模板复制对应的文件
    fs.copyFileSync(dirpath + '/template/css/style.css', './css/style.css')    // 似乎没有找到怎么复制文件夹
    fs.copyFileSync(dirpath + '/template/js/main.js', './js/main.js')    // 那就先一个个复制吧...
}

process.exit()