function test(x) {
  if (x < 0) throw new Error("请输入一个正数");
  return x * x;
}

try {
  var n = -2;
  var f = test(n);
  console.log("输出结果：" + f);
} catch (err) {
  console.log(err, "catch");
} finally {
  console.log("finally");
}
