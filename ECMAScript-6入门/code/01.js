const list = [1,2,3,4,5]

// ES5写法
let a = list[0], b = list.slice(1)
console.log(a, b); // 1 [ 2, 3, 4, 5 ]

// ES6写法
[c, ...rest] = list
console.log(c, rest); //1 [ 2, 3, 4, 5 ]

console.log([...'hello']); // [ 'h', 'e', 'l', 'l', 'o' ]