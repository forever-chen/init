## 页面初始化命令行工具
* 首先在pakage.json文件中name定义了命令，以及入口文件
* 发布一个npm命令包要在入口文件的顶部，必须是第一行书写：`#!/usr/bin/env node`  这一行命令
## 封装内容
* 咱们项目初始化需要在template中定义一个html模板文件（这个文件中除了引入的js和css不同之外，大部分内容相同）
* 在webpack文件夹中dev.config和prod.config文件中我们都需要配置文件地（每添加一个新页面在这里书写的代码几乎相似，大部分时候我们是通过拷贝然后修改操作的）
* 在container容器组建中我们需要复制四个文件（client.js,reducer.js,route.js,以及我们新建的问页面的js文件）
## 代码简介
上面的这些之前我们新建一个页面都需要一步一步来做，有的时候会忘记一些细小的点或者是一个单词写错之后，服务启动之后都会报错，我写了这么一个初始化功能命令把这些基本工作一键生成，具体的实现方式我会在代码中给大家展示
## 使用过程
`
    因为我定义的命令包，所以我们全局安装：npm install -g xumin-init
    然后找到我们的项目根目录然后（这里我们需要看一下container中是否已经存在我们将要新建的文件名称，不存在我们可以正常执行命令）
    最后执行命令：xumin-init OrderList(这里我们按照新建文件夹的驼峰命名法定义)
`
