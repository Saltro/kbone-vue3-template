export default {
  origin: 'https://test.miniprogram.com',
  entry: '/',
  router: {
    page1: ['/a'],
    page2: ['/b'],
  },
  redirect: {
    notFound: 'page1',
    accessDenied: 'page1',
  },
  generate: {
    globalVars: [['SVGElement', 'function SVGElement() {}']], // 兼容 vue3 3.0.8+ 版本
  },
  app: {
    navigationBarTitleText: 'miniprogram-project',
  },
  projectConfig: {
    appid: 'wxxxxxxxxxxxx',
    projectname: 'kbone-vue3-template',
  },
  packageConfig: {
    author: 'saltro',
  },
};
