## 快速上手

### 使用之前

在开始使用 Wuss Weapp 之前，你需要先阅读 [微信小程序自定义组件](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/) 的相关文档。

### 如何使用

1. 通过 `npm` 安装，需要依赖小程序基础库 2.2.1 以上版本，同时依赖开发者工具的 `npm` 构建。具体详情可查阅 [官方 npm 文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)。

2. 到 [GitHub](https://github.com/phonycode/wuss) 下载 Wuss Weapp 的代码，将 `dist` 目录拷贝到自己的项目中。然后按照如下的方式使用组件，以 Button 为例，其它组件在对应的文档页查看：

3. 添加需要的组件。在页面的 json 中配置（路径根据自己项目位置配置）：

```json
"usingComponents": {
    "w-button": "/dist/w-button/index"
}
```

2. 在 wxml 中使用组件：

```html
<w-button type="info" bind:click="buttonClick">这是一个按钮</w-button>
```

### 预览所有组件

我们内置了所有组件的示例，您可以扫描下方的的小程序码体验

<img width="200" src="./logo.png">

或按以下方式在微信开发者工具中查看：

```shell
git clone https://github.com/phonycode/wuss.git
```

然后，直接将项目在微信开发者工具中打开即可。
