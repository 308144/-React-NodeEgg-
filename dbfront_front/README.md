#### 技术方案

## 关于 Eslint + Prettier + stylelint

- Eslint 借鉴了 airbnb 的规则 + 自定义的一些 rules
- Prettier 为熊猫 H5 团队讨论定义的规则
- stylelint scss 文件的报错并不会以报红的形式出现，在提交时会自动格式化。 目前 stylelint 主要依赖三个包： stylelint/stylelint-config-css-modules/stylelint-config-standard

## husky 和 lint-staged

- husky 从 v6 版本开始改版，目前项目引用的为 v7 版本，实现 git pre-commit 钩子执行 lint 和 prettier 的 fix。

## react-router-dom

- react-router-dom 为 v6 版本，具体带来的变化[https://github.com/remix-run/react-router/blob/main/docs/getting-started/installation.md]
- 一篇差异比较的文章推荐 [https://juejin.cn/post/6844904096059621389]

## 状态管理

- 使用 React Hook 的 useContext 和自定义 hook 的形式实现全局状态管理

## vite

## css

- 略

- 略
  
## 开发规范

- commit 规范
