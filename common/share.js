/**
 * 配置分享模块
 * @param {string} page
 * @param {any} options 配置的内容
 * @param {string} options{ title }  转发标题
 * @param {string} options{ path } 转发路径
 * @param {string} options{ imageUrl } 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
 */
const ROUTER_TITLE = {
  "pages/w-button/index": "Button 按钮",
  "pages/w-icon/index": "Icon 图标",
  "pages/w-avatar/index": "Avatar 头像",
  "pages/w-steps/index": "Steps 步骤条",
  "pages/w-countdown/index": "CountDown 倒计时",
  "pages/w-badge/index": "Badge 徽章",
  "pages/w-tag/index": "Tag 标签",
  "pages/w-accordion/index": "Accordion 手风琴",
  "pages/w-layout/index": "Layout 栅格",
  "pages/w-card/index": "Card 卡片",
  "pages/w-pane/index": "Pane 窗格",
  "pages/w-cell/index": "Cell 列表",
  "pages/w-popup/index": "Popup 弹出层",
  "pages/w-scrollable-tab-view/index": "ScrollableTabView 可滑动视图",
  "pages/w-drop-menu/index": "DropMenu 下拉菜单",
  "pages/w-tabs/index": "Tabs 导航切换栏",
  "pages/w-segmented-control/index": "SegmentedControl 分段器",
  "pages/w-action-sheet/index": "ActionSheet 操作菜单",
  "pages/w-toast/index": "Toast 提示",
  "pages/w-alert/index": "Alert 弹出框",
  "pages/w-confirm/index": "Confirm 确认框",
  "pages/w-notice/index": "Notice 通告",
  "pages/w-dialog/index": "Dialog 消息框",
  "pages/w-loading/index": "Loading 加载指示器",
  "pages/w-activity-indicator/index": "ActivityIndicator 活动指示器",
  "pages/w-form/index": "Form 表单",
  "pages/w-input/index": "Input 输入框",
  "pages/w-switch/index": "Switch 开关",
  "pages/w-radio/index": "Radio 单选框",
  "pages/w-cell-picker/index": "CellPicker 复选框",
  "pages/w-address-picker/index": "AddressPicker 选择器",
  "pages/w-date-picker/index": "DatePicker 地区联动选择器",
  "pages/w-calendar/index": "Calendar 时间选择器",
  "pages/w-range/index": "Range 日历选择器",
  "pages/w-checkbox/index": "Checkbox 区域选择",
  "pages/w-number/index": "Number 步进器",
  "pages/w-vcode/index": "Vcode 验证码",
  "pages/w-qr-code/index": "QRCode 二维码生成",
  "pages/w-count-up/index": "CountUp 指数",
  "pages/w-swiper-out/index": "SwiperOut 侧滑菜单",
  "pages/w-marquee/index": "Marquee 垂直滚动视图",
  "pages/w-rater/index": "Rate 星级评分"
};
export const registerShareEvent = (page, options = {}) => {
  function onShareAppMessage(event) {
    const pages = getCurrentPages();
    const current = pages[pages.length - 1];
    return {
      title: `${ROUTER_TITLE[current.route] || 'Wuss-Weapp组件库'}`,
      path: current.route,
      ...options
    };
  }
  page["onShareAppMessage"] = onShareAppMessage;
};
