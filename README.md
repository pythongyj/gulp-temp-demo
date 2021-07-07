# feilu-jq-h5

## 启动方式

- 方式一
  > yarn start | npm run start
- 方式二
  > npx gulp dev | gulp dev

## 文件创建和使用方式

- accets 下为公共的 css 资源 创建的时候为 less 文件 引入绝对路径为 dist/accets
- lib 下为第三方的文件 会原封不动的移动到 dist/lib 文件夹下
- components 抽离的组件
  - 具体语法可参考 [书写语法](https://www.npmjs.com/package/gulp-file-include)
  - 组件的样式文件js文件在调用的页面引入
  - 为了避免冗余的代码覆盖，以及代码穿透，书写时，请保持所有代码尽量保持拥有作用域
- pages 页面文件
  - 创建方式，每个页面创建一个文件夹 此页面所有非公共文件均在此处
  - index.html
  - index.less
  - index.js
    - 注意：由于 css 虽然是用 less 写的，但是引入的时候依然是 css 即：./index.css
- .gitignore 忽略上传文件
