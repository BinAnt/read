let obj = Object.fromEntries([
  ["foo", "bar"],
  ["baz", 42],
]);
console.log(obj);
// { foo: "bar", baz: 42 }

let o = Object.fromEntries(new URLSearchParams("foo=bar&baz=qux"));
console.log(o);
// { foo: "bar", baz: "qux" }
