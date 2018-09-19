## Button 按钮

点击后会触发一个操作。

### 使用指南

在 index.json 中引入 button 组件

```json
"usingComponents": {
  "w-button": "path/to/w-button/index",
}
```

### 代码演示

按钮类型

支持 `default`、`info`、`warn`、`danger` 四种类型，默认为 `default`

```html
<w-button type="default">Default</w-button>
<w-button type="info">Info</w-button>
<w-button type="warn">Warn</w-button>
<w-button type="danger">Danger</w-button>
```
