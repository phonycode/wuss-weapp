[button官方]: https://developers.weixin.qq.com/miniprogram/dev/component/button.html

## Button 按钮

点击后会触发一个操作。

### 使用指南

在 page.json 中引入组件

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

### API

#### 属性

| 属性      | 说明                                                    | 类型    | 默认值  |
| --------- | ------------------------------------------------------- | ------- | ------- |
| type      | 按钮类型，可选值为 default/info/warn/danger             | string  | default |
| disabled  | 设置禁用                                                | boolean | false   |
| loading   | 设置按钮载入状态                                        | boolean | false   |
| inline    | 设置为行内按钮                                          | boolean | false   |
| ghost     | 设置为幽灵按钮                                          | boolean | false   |
| dashed    | 设置为虚线按钮                                          | boolean | false   |
| icon      | 添加按钮图标                                            | string  | -       |
| iconSize  | 设置按钮图标大小                                        | string  | 40      |
| iconColor | 设置按钮图标颜色                                        | string  | -       |
| styles    | 按钮自定义样式                                          | string  | -       |
| color     | 按钮字体颜色                                            | string  | -       |
| bgColor   | 按钮背景颜色                                            | string  | -       |
| flat      | 开启按钮扁平化                                          | boolean | false   |
| full      | 撑满容器                                                | boolean | false   |
| openType  | 设置为虚线按钮                                          | boolean | false   |
| formType  | 微信表单能力，具体支持可参考 [微信官方文档][button官方] | string  | -       |
| openType  | 微信开放能力，具体支持可参考 [微信官方文档][button官方] | string  | -       |

#### 事件

| 事件名     | 说明                                   | 参数 |
| ---------- | -------------------------------------- | ---- |
| bind:click | 点击按钮且按钮状态不为加载或禁用时触发 | -    |

#### slot

| 名称 | 说明       |
| ---- | ---------- |
| -    | 自定义内容 |

#### 自定义类名

| 类名                    | 说明                  |
| ----------------------- | --------------------- |
| wuss-class              | 根节点样式类          |
| wuss-button-hover-class | button 的 hover-class |
