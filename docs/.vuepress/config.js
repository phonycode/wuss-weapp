module.exports = {
  // head: [['link', { rel: 'icon', href: `/logo.png` }]],
  title: 'Wuss Weapp',
  base: '/wuss/',
  description: '🐳 wuss 一款高质量，组件齐全，高自定义的微信小程序UI组件库',
  themeConfig: {
    sidebarDepth: 0,
    nav: [
      { text: '首页', link: '/' },
      { text: '快速上手', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/phonycode/wuss' },
    ],
    repo: 'phonycode/wuss',
    docsDir: 'docs',
    docsBranch: 'dev',
    editLinks: true,
    sidebar: [
      {
        title: '开发指南',
        collapsable: false,
        children: [
          ['/', '介绍'],
          ['/quickstart', '快速上手'],
          ['/CHANGELOG', '更新日志'],
        ],
      },
      {
        title: '基础组件',
        collapsable: false,
        children: [
          ['/component_mds/button', 'Button 按钮'],
          ['/component_mds/badge', 'Badge 徽章'],
          ['/component_mds/alert', 'Alert 弹出框'],
          ['/component_mds/avtar', 'Avtar 头像'],
        ],
      },
      {
        title: '布局',
        collapsable: false,
        children: [['/component_mds/badge', 'Pane 窗格']],
      },
    ],
  },
};
