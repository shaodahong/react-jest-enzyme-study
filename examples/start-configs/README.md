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

我们先来个简单个例子测试下，新建一个名为 [example.test.js](examples\start-configs\example.test.js) 文件，然后添加代码

```js
function sum(a, b) {
  return a + b;
}

test("sum function", () => {
  expect(sum(1, 2)).toBe(3);
});
```

> Jest 默认会寻找 `__test__` 目录下文件或者 `/(spec|test)\.[jt]sx?$/` 匹配的文件作为测试文件

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

`passed` 代表我们测试通过了，观察代码 `sum` 是我们写的一个求和函数，`test` 是 `jest` 为我们提供的一个方法，它还有个别名叫 `it`，一般情况下我们会使用 `it`，因为简短，它接受三个参数，第一个是测试的名称，第二个是一个函数，包含我们要测试的代码，第三个是超时时间，很少用。

第二个参数函数支持返回一个 `Promise`，当然也支持 `async await`，或者可以传递一个参数，一般我们命名为 `done`，可以用来测试异步代码，举例：

```js
test("test callback", done => {
  function callback(data) {
    expect(data).toBe(1);
    done();
  }

  getApi(callback);
});
```

`done` 的执行表明我们测试代码结束，这对我们测试异步代码会非常的有用，后面会详细说

`expect` 和 `toBe` 是 `期望(value)匹配(wantValue)` 的意思，也是 `jest` 给我们提供用来断言测试结果的方法，`expect(sum(1, 2)).toBe(3)` 可以解释为 `期望(sum(1, 2) 的结果) 匹配 3`，如果匹配测试通过，不匹配控制台会输出对比的结果，我们把 3 改成 2 运行下 `yarn jest -e` ， `-e` 可以对比差异结果，控制台会报错

```bash
expect(received).toBe(expected) // Object.is equality

Expected: 2
Received: 3

  4 |
  5 | test("sum function", () => {
> 6 |   expect(sum(1, 2)).toBe(2);
    |                     ^
  7 | });
  8 |
```

可以很直观的看到我们期望的值是 `2`，但是实际上值是 `3`

这个时候应该对 Jest 测试框架有大概的认识了
