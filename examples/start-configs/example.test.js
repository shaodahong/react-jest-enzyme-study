function sum(a, b) {
  return a + b;
}

test("sum function", () => {
  expect(sum(1, 2)).toBe(2);
});
