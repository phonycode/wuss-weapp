module.exports = {
  head: [['link', { rel: 'icon', href: '../logo.png' }]],
  title: 'Wuss Weapp',
  base: '/wuss/',
  description: '🐳 wuss 一款高质量，组件齐全，高自定义的微信小程序UI组件库',
  themeConfig: {
    sidebarDepth: 0,
    nav: [
      { text: '首页', link: '/' },
      { text: '快速上手', link: '/quickstart' },
    ],
    repo: 'phonycode/wuss',
    docsDir: 'docs',
    docsBranch: 'dev',
    editLinks: true,
    sidebar: [
      {
        title: '开发指南',
        collapsable: false,
        children: [['/quickstart', '快速上手'], ['/CHANGELOG', '更新日志']],
      },
      {
        title: '基础组件',
        collapsable: false,
        children: [
          ['/component_mds/button', 'Button 按钮'],
          ['/component_mds/avtar', 'Icon 图标'],
          ['/component_mds/avtar', 'Avtar 头像'],
          ['/component_mds/avtar', 'Steps 步骤条'],
          ['/component_mds/avtar', 'Countdown 倒计时'],
          ['/component_mds/avtar', 'Dialog 消息框'],
          ['/component_mds/badge', 'Badge 徽章'],
          ['/component_mds/avtar', 'Tag 标签'],
        ],
      },
      {
        title: '布局',
        collapsable: false,
        children: [['/component_mds/badge', 'Pane 窗格']],
      },
      {
        title: '操作反馈',
        collapsable: false,
        children: [['/component_mds/alert', 'Alert 弹出框']],
      },
    ],
  },
};
