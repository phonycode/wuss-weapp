## Avtar 头像

用来代表用户或事物，支持图片、图标或字符展示。

### 使用指南

在 page.json 中引入组件

```json
"usingComponents": {
  "w-avtar": "path/to/w-avtar/index",
}
```

### 代码演示

size 类型

支持 `small`、`default`、`large` 两种类型，默认为 `default`

```html
	<w-avatar size="small">W</w-avatar>
	<w-avatar>W</w-avatar>
	<w-avatar size="large">W</w-avatar>
```

### API

#### 属性

| 属性  | 说明                                           | 类型   | 默认值  |
| ----- | ---------------------------------------------- | ------ | ------- |
| size  | 设置头像的大小，可选值为 small、default、large | string | default |
| shape | 指定头像的形状，可选值为 circle、square        | string | circle  |
| src   | 图片类头像的 src 地址                          | string | -       |

#### 事件

| 事件名     | 说明         | 参数 |
| ---------- | ------------ | ---- |
| bind:click | 点击头像触发 | -    |

#### slot

| 名称 | 说明                 |
| ---- | -------------------- |
| -    | 文本类头像自定义内容 |

#### 自定义类名

| 类名       | 说明         |
| ---------- | ------------ |
| wuss-class | 根节点样式类 |
