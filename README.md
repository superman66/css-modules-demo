# CSS Modules 学习笔记

## 大纲
* CSS Module 介绍
* 为什么我们需要 CSS Module
* CSS Modules 使用教程
* CSS Module 在 React 中的实践


## CSS Modules 介绍
[GitHub - css-modules/css-modules: Documentation about css-modules](https://github.com/css-modules/css-modules) 来自官网的介绍。
CSS Modules 是所有的类名都只有*局部作用域*的 CSS 文件。所以 CSS Modules 既不是官方标准，也不是浏览器特性。而是在构建步骤中对 CSS 类名选择器限定作用域的一种方式。
在使用 CSS Modules，CSS 类名是动态生成的，唯一的，并准确对应到源文件中的各个类的样式。
这也是 CSS Modules 实现样式局部作用域的原理。

## 为何我们需要 CSS Modules
#### CSS 全局作用域问题
由于CSS的全局作用域的特点，任何一个样式都能对整个页面生效。因为很容易产生样式冲突的问题。
遇到这样的问题我们通常这么解决：
* CSS Class 命名长一点
* 加个父选择器限定下范围

#### JS CSS 无法共享变量

## CSS 模块化方案
目前现有的 CSS 模块化方案有很多，主要可以归纳为下面三种。

### CSS 命名约定
比如  [BEM](http://getbem.com/)（Block, Element, Modifier），就是通过约定 CSS 的命名来实现。

### CSS in JS
这种方式完全抛弃了 CSS，采用 JavaScript 来写 CSS 规则，并内联样式。

### 使用 JS 来管理样式模块
典型代表 CSS Modules

## 使用教程
 开启 css-modules。使用 css-loader 就支持
```
style-loader!css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]
```

button.css
```
.button{
	//
}
```
使用

```
import styles from './button.css'

<div className={styles.button}> </div>
```

### 全局作用域
```
:global(.global) { // 全局样式
  color: green;
  font-size: 30px;
}
.container {
  background: red;
  color: #fff;
}


```

使用 `:global(.className)` 关键字后，该样式规则就会变成全局了。
在使用时，就直接像普通css那样即可。
```
<div className="global">这是global 的样式</div>
```

### 定制哈希类名
CSS Modules 默认的hash算法是 [hash:base64] 。我们可以在`webpack.config.js`中定制该规则。
```
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
        ],
      },

```
这样在css中定义的 `container` 就会变成  `src-style__container--wbUj_`。

### 组合
在  CSS Modules 中，一个选择器可以继承另外一个选择器的规则，这叫做组合 composition。

```
.backgroud {
  background: red;
}
.container {
  composes: background;
  color: #fff;
}
```

这样 `.container` 就继承 了`.background` 的样式规则了。

### 输入其他模块
CSS Modules 不仅支持继承同个文件内的样式，还支持继承其他CSS文件里面的规则。
```
.another {
  composes: background from './another.css';
}

```

### 变量支持

## 在 React 中使用
react 使用同上，手动引入样式，然后使用。
这样的方式就是每次都得通过 `styles.**` 来获取样式名称。

可以使用  [https://github.com/gajus/babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules) 。该 babel 插件可以实现使用 `stylename`属性自动加载 CSS 模块。我们通过该插件来进行。
在 .babelrc 添加该插件：
```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": [
    ["react-css-modules", {
      "generateScopedName": "[path][name]__[local]--[hash:base64:5]"
    }]
  ]
  
}

```
需要注意的是，如果你在 `webpack.config.js` 中配置过 CSS Modules 的哈希算法，则需要在这里对 `generateScopedName ` 也设置成同样的规则 。

然后在React中只需要使用 `styleName="name"` 即可使用样式，无需每次都写 `styles.name`。
```
import React from 'react'
import styles from './index.css'

const CSSModuleDemo1 = () => {
  return (
    <div>
      <h3>Demo2</h3>
      <div className="global">这里同样使用了global样式</div>

      <div styleName="name">这里使用了 babel-plugin-react-css-modules</div>
    </div>
  )
}

export default CSSModuleDemo1

```
使用该插件还有其他两个好处
* 无需强制使用 cameCase 来命名类名，而可以像正常的css那样来写类名
* 很容易区分 gloabl 和 local 的样式
```
<div className='global-css' styleName='local-module'></div>
```

## 使用CSS 预编译

### Less
安装 less 、less-loader 依赖
```
npm i less less-loader -D
```

在 `webpack.config.js` 中配置：
```
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },

```
这样就可以直接结合 less 使用 CSS Modules。

