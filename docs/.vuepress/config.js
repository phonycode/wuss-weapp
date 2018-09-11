module.exports = {
  head: [['link', { rel: 'icon', href: `/logo.png` }]],
  title: 'Wuss v0.0.1',
  description: '🐳 wuss 一款高质量，组件齐全，高自定义的微信小程序UI组件库',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '快速上手', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/phonycode/wuss' },
    ],
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
        title: '组件',
        collapsable: false,
        children: [
          ['/component_mds/badge', 'Badge 徽章'],
          ['/component_mds/alert', 'Alert 提示框'],
          ['/component_mds/avtar', 'Avtar 头像'],
        ],
      },
    ],
  },
};
