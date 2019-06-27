## 初始化测试配置

[Jest](https://github.com/facebook/jest) 是 Facebook 出品的一个测试框架，开箱即用，交互反馈友好，[Enzyme](https://github.com/airbnb/enzyme) 是 Airbnb 出品的 React 测试库，先来安装依赖

```bash
$ yarn add enzyme enzyme-adapter-react-16 jest -D
```

> 建议使用 `yarn` 来管理包，速度和稳定性略微优于 `npm`，一般和程序运行无关的包使用 `-D` 安装到 `devDependencies` 下面

安装完成后为了以后可以简便使用我们在 `package.json` 中添加 `scripts` 命令

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

这时候我们运行下

```bash
$ yarn test
```

可以看到控制台是没有测试结果输出的

我们先来个简单个例子测试下，新建一个名为 [example-test.js](examples\start-configs\example.test.js) 文件，然后添加代码

```js
function sum(a, b) {
  return a + b;
}

test("sum function", () => {
  expect(sum(1, 2)).toEqual(3);
});
```

这时候再次运行下 `yarn test`，控制台应该会输出

```bash
PASS  example.test.js
√ sum function (2ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.846s
Ran all test suites.
Done in 3.00s.
```

`passed` 代表我们测试通过了

为了结合 Enzyme 和自定义一些配置，我们需要生成一个 Jest 配置文件

```bash
yarn test --init
```

Jest 会根据你的回答帮助你生成配置文件，一般来说第一个选择 `jsdom (browser-like)` 剩下的都是 `N` 就行，因为生成后还是需要手动配置下才能使用

完成后在项目的根目录应该看到了一个 `jest.config.js` 文件，打开它，发现全是英文，这时候先不要慌，打开谷歌翻译……

接下来我们需要配置下几个重要的属性

```json
{}
```
