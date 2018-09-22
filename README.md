<p align="center">
  <img alt="logo" src="/assets/logo.png" width="120" style="margin-bottom: 10px;">
</p>

<h1 align="center">Wuss Weapp</h1>

<h3 align="center">一款高质量，组件齐全，高自定义的微信小程序 UI 组件库</h3>

### 文档

[https://phonycode.github.io/wuss](https://phonycode.github.io/wuss)

## 扫码体验

使用微信扫一扫体验小程序组件示例

<img width="200" src="/assets/qrcode.jpg">


## 演示图片

<img width="450" src="/assets/home.jpg">

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

我们内置了所有组件的示例，您可以扫描上方的的小程序码体验，或按以下方式在微信开发者工具中查看：

```shell
git clone https://github.com/phonycode/wuss.git
```

然后，直接将项目在微信开发者工具中打开即可。

## 贡献

有任何意见或建议都欢迎提 issue，提 issue 之前请先阅读是否已经有相关 issue 或者如果有相关但是已经关闭 issue 只是还未更新的版本，请不要在此 issue 下方回复，如果更新版本后依然存在 请提新出的 issue，感谢

## LICENSE

[MIT](https://github.com/phonycode/wuss/blob/master/LICENSE)
