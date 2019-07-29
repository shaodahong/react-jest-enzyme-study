## 测试组件-状态

React 组件受控 `state` 和 `props`，不同的 `state` 和 `props` 会导致多样的渲染结果，比如

```jsx
export default class ComponentStatus extends React.Component {
  state = {
    name: 'hello'
  };
  handler = () => {
    const { ext = '' } = this.props;
    if (!ext) {
      return this.state.name;
    }
    return this.state.name + ' ' + ext;
  };
  render() {
    return <div>{this.handler()}</div>;
  }
}
```

编写快照测试

```js
it('ComponentStatus test', () => {
  const wrapper = shallow(<ComponentState />);
  expect(wrapper).toMatchSnapshot();
});
```

生成的快照是组件的初始状态

```jsx
<div>hello</div>
```

但是在复杂的一些业务中 `props` 和 `state` 会得到处理，我们需要保证渲染的结果是预期的结果

```jsx
<ComponentStatus ext="shanghai">
```

预期会渲染出

```jsx
<div>hello shanghai</div>
```

我们编写对应的测试用例，第一步依旧是浅渲染出组件，第二步在之前有提到过，只要你会 `jQuery`，那么你就写测试，我们获取组件的文字内容来断言

```js
it('ComponentStatus props', () => {
  const wrapper = shallow(<ComponentState ext="shanghai" />);
  expect(wrapper.text()).toBe('hello shanghai');
});
```

但是这里也有一个问题，如果这个组件的测试用例需要写很多，那么我们会写很多的 `const wrapper = shallow(<ComponentState ext="shanghai" />);` 类似的代码，这不应该是一个好的测试框架该有的表现，所以 `Jest` 给我们提供了一种套件 `describe`，这样我们可以很直观且方便的让同类测试放到一个套件里

```js
describe('套件名称', () => {
  it('测试名称' () => {
    ...
  })

  it('测试名称' () => {
    ...
  })

  ...
}
```

但是如果这个套件功能仅仅是一层皮，那么我们肯定会不屑一顾
