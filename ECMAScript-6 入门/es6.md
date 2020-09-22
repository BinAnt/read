## 1.let 命令

#### 基本用法

ES6新增了==**let**==命令，用来声明变量。它的用法类似于==**var**==，但是所声明的变量，只有在==**let**==命令所在的代码块内有效。

~~~~js
{
  let a = 10;
  var b = 1;
}

console.log(a); // ReferenceError: a is not defined
console.log(b); // 1
~~~~

上面的代码在代码块之中，分别用**==let==**和==var==声明了两个变量。然后再代码块志气调用这两个变量，结果==let==声明的变量报错，==var==声明的变量返回了正确的值。这表明，==let==声明的变量只有在它所在的代码块有效。



==for==循环的计数器，就很适合使用==let==命令。

~~~~js
for (let i = 0; i < 10; i++) {
  // ...
}
console.log(i);// ReferenceError: i is not defined
~~~~



上面的代码如果使用==var==，最后输出的是==10==。

~~~~js
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
~~~~

上面代码中，变量==i==是==var==命令声明的，在全局范围内都有效，所以全局只有一个变量==i==。每一次循环，变量==i==的值都会发生变化，而循环内被赋给数组==a==的函数内部的==console.log（i）==，里面的==i==指向的就是全局==i==.  也就是说，所有的数组==a==的成员里面的==i==，指向的都是同一个==i==，导致运行时输出的最后一轮的i的值，也就是**10**。



如果使用==let==，声明的变量仅在块级作用域内有效，最后输出是 6.

~~~~js
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
~~~~

上面代码中，变量==i==是==let==声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6.



另外，==for==循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

~~~~js
for (let i = 0; i < 3; i++) {
  let i = "abc";
  console.log(i);
}
// abc
// abc
// abc
~~~~

上面代码正确运行，输出了3次==abc==。这表明函数内部的变量==i==与循环变量==i==不在同一个作用域，有各自单独的作用域。

----

#### 不存在变量提升

==var== 命令会发生“变量提升”现象，即变量可以再声明之前使用，值为==undefined==。这种现象多多少少有些奇怪的，按照一般的逻辑，变量应该在变量声明语句之后才可以使用。

为了纠正这种现象，let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。

~~~~js
console.log(foo); // 输出undefined
var foo = 2;

console.log(bar); // ReferenceError: Cannot access 'bar' before initialization
let bar = 3;
~~~~

----

#### 暂时性死区

只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

~~~~js
var tmp = 123;

if (true) {
  tmp = "abc"; // ReferenceError: Cannot access 'tmp' before initialization
  let tmp;
}
~~~~

上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以再let声明变量前，对tmp赋值会报错。



ES6明确规定，如果区块中存在==let==和==const==命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前使用这些变量，就会报错。



总之，在代码块内，使用==let==命令声明变量之前，该变量都是不可用的，这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）

~~~~js
if (true) {
  // TDZ开始
  //   tmp = "abc"; // ReferenceError
  //   console.log(tmp); // ReferenceError
  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
~~~~

