## 如何测试组件

为了能够简单方便的测试组件，我们使用 Enzyme 来辅助我们进行测试，我们先写一个非常简单的组件

```jsx
import React from 'react';

export default class Component extends React.Component {
  name = 'hello';
  render() {
    return <div>{this.name} world</div>;
  }
}
```

这个 `Component` 组件非常简单，渲染成功的话就是页面上会有个 `<div>hello world</div>`

Enzyme 给我们提供三种渲染组件的方式, `shallow` `mount` 和 `render`

`shallow` 称为**浅渲染**，使用虚拟 dom，它只渲染该组件本身，并不会渲染子组件，而且最新的版本中也会触发 `componentDidMount` 和 `componentDidUpdate` 生命周期了，也是测试 React 组件最常用的渲染方式

`mount` 称为**完整渲染**，需要真实的 dom 环境，它使用 [jsdom](https://github.com/jsdom/jsdom) 模拟浏览器环境对组件进行完整的渲染，包括子组件，常用于测试高阶组件

`render` 称为**静态渲染**，使用虚拟 dom 生成 HTML 结构，包括子组件，并且它使用的是第三方 [Cheerio](http://cheeriojs.github.io/cheerio/) 的解析库，`Cheerio` 库写过 node 的应该很熟悉，它还有个别名叫做 node 版本的 jQuery

`shallow` `mount` 和 `render` 渲染组件后会返回一个包装器，如果你会 jQuery，那么恭喜，你已经掌握了 Enzyme

我们开始编写测试用例：

```js
import React from 'react';
import Component from './index';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

it('Component test', () => {
  const wrapper = shallow(<Component />);
  expect(wrapper.text()).toBe('hello world');
});
```

`Enzyme` 使用也很简单，引入后配置 `Adapter`，Adapter 是干什么的？Adapter 是适配器的意思，适配你的 React 版本，不同的版本需要不同的 Adapter，查看自己的 React 版本然后安装相应的 Adapter 版本后配置即可

然后控制台运行 `yarn jest`，可以看到测试通过

但是问题来了，这样测试效率太低，测试本身是服务代码质量，如果花费大量的时间进行低效的测试用例编写，会非常的枯燥，所以我们要简化配置，使用统一解决方案-**快照**

### 简化配置

为了方便全局使用，我们在项目根目录新建一个 `test` 文件夹，在 `test` 文件夹中新建名为 `setup.js` 的文件

```js
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
```

然后在根目录新建 Jest 的配置文件 `jest.config.js`

```js
module.exports = {
  setupFiles: ['./test/setup.js']
};
```

在 `Jest` 配置文件中我们把 `setup.js` 路径添加到 `setupFiles` 参数，它是一个数组，在每一个测试文件的执行前会执行 `setupFiles` 中的文件，这样我们就不需要再每个测试文件中写重复的配置

### 快照

我们在使用浏览器搜索的时候有见过下图中的网页快照

![快照](/examples/component/imgs/214147.png)

Jest 快照可以理解为对组件测试状态的备份，一个组件在相同条件的前提下渲染，每次的渲染结果和上一次的一定是相等的，那么我们只要保存第一次的渲染结果，在下一次运行测试的时候进行比对，如果相等说明测试成功，否则测试失败

为了生成可视化的快照，我们需要借助一个 [enzyme-to-json](https://github.com/adriantoine/enzyme-to-json#readme) 将 Enzyme 的包装器转换成快照，我们先安装它

```bash
$ yarn add enzyme-to-json -D
```

然后在 `jest.config.js` 添加

```json
{
  "snapshotSerializers": ["enzyme-to-json/serializer"]
}
```

这时候我们重新编写下刚才的测试用例

```jsx
import React from 'react';
import Component from './index';
// import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';

// Enzyme.configure({ adapter: new Adapter() });

it('Component test', () => {
  const wrapper = shallow(<Component />);
  expect(wrapper).toMatchSnapshot();
});
```

会看到在测试文件同级目录下生成一个 `*test.js.snap` 文件，打开后发现就是一个静态的 html 结构

```
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Component test 1`] = `
<div>
  hello
   world
</div>
`;
```

这时候我们修改下组件

```
import React from 'react';

export default class Component extends React.Component {
  name = 'hello';
  render() {
    return <div>{this.name} monkey</div>;
  }
}
```

把 `world` 换成 `monkey`，运行测试，可以清楚的看到控制台报错了

```bash
  ● Component test

    expect(received).toMatchSnapshot()

    Snapshot name: `Component test 1`

    - Snapshot
    + Received

      <div>
        hello
    -    world
    +    monkey
      </div>

       6 | it('Component test', () => {
       7 |   const wrapper = shallow(<Component />);
    >  8 |   expect(wrapper).toMatchSnapshot()
         |                   ^
       9 | });
      10 |

      at Object.toMatchSnapshot (examples/component/index.test.js:8:19)

 › 1 snapshot failed.

 Snapshot Summary
 › 1 snapshot failed from 1 test suite. Inspect your code changes or re-run jest with `-u` to update them.
```

错误提示的很友好，快照匹配失败，增量 `monkey` 减量 `world`，检查代码改动或者重新运行测试并加上 `-u` 参数更新快照
