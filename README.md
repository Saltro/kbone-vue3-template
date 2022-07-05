# kbone-vue3-template

一个使用 Vue3 进行小程序开发的 [kbone](https://github.com/wechat-miniprogram/kbone) 模板。

## 如何开发

1. 首先拉取本仓库代码，安装相关依赖，这里推荐使用 `pnpm` 安装依赖
2. 修改 `package.json` 中的 `name` 和 `mp.config.js` 中的 `projectConfig` 和 `packageConfig`
3. 执行打包命令 `npm run dev`，生成小程序代码
4. 使用开发者工具打开 dist/mp 目录即可。
5. 执行构建命令 `npm run build`，即可生成生产环境下的小程序代码

## 注意事项

第一次执行打包命令后，需要先进入 dist/mp 目录执行 `npm install` 安装相关的依赖包，然后用开发者工具打开 dist/mp 目录后再进行 npm 构建（关于 npm 构建可[点此查看官方文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)）。

## TODO

- [ ] 增加 ESLint, Prettier 支持
- [ ] 增加 commitlint, commitizen 支持

## License

MIT
