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

上面代码中，在==let==命令声明变量==tmp==之前，都属于变量==tmp==的“死区”。



“暂时性死区”也意味着==typeof==不再是一个百分百安全的操作。

~~~~js
typeof x; // ReferenceError
let x;
~~~~

上面代码中，变量==x==使用==let==命令声明，所以在声明之前，都属于==x==的“死区”，只要用到该变量就会报错。因此，==typeof==运行时就会抛出一个==ReferenceError==。



作为比较，如果一个变量根本没有被声明，使用==typeof==反而不会报错。

~~~~js
typeof undeclared_variable  // "undefined"
~~~~

上面代码中，==undeclared_variable==是一个不存在的变量名，结果返回“undefined”。所以，在没有==let==之前，==typeof==运算符是百分之百安全的，永远不会报错。现在这一点不成立了。这样的设计是为了让大家养成良好的编程习惯，变量一定要在声明之后使用，否则就报错。



有些“死区”比较，不太容易发现。

~~~~js
function bar(x = y, y = 2) {
  return [x, y];
}

bar(); // 报错
~~~~

上面代码中，嗲用==bar==函数之所以报错（某些实现可能不报错），是因为参数==x==默认值等于另一个参数==y==，而此时==y==还没有声明，属于“死区”。如果==y==的默认值是==x==，就不会报错。因为此时==x==已经声明了

~~~~js
function bar(x = 2, y = x) {
  return [x, y];
}

console.log(bar()); // [ 2, 2 ]
~~~~

另外，下面的代码也会报错，与==var==的行为不同

~~~~js
// 不报错
var x = x

// 报错
let x = x
//ReferenceError: Cannot access 'x' before initialization
~~~~

上面代码报错，也是因为暂时性死区。使用==let==声明变量时，只要变量在还没有声明完成前使用，就会报错。上面这行就属于这种情况，在变量==x==的声明语句还没有完成前，就去取==x==的值，导致报错。



ES6规定暂时性死区和==let==、==const==语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。这样的错误在ES5是很常见的，现在有了这种规定，避免此类错误就很容易了。



总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

----

#### 不允许重复

==let==不允许在相同的作用域内，重复声明同一个变量。

~~~~js
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}
~~~~

因此，不能在函数内部重新声明参数。

~~~~js
function func(arg) {
  let arg;
}
func() // 报错

function func(arg) {
  {
    let arg;
  }
}
func() // 不报错
~~~~



---



## 2.块级作用域

#### 为什么需要块级作用域？

ES5只有全局作用域和函数作用域，没有块级作用域，这带来很多 不合理的场景。

第一种场景，内部变量可能会覆盖外层变量。

~~~~js
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = "hello world";
  }
}

f(); // undefined
~~~~

上面的代码的愿意是，==if==代码块的外部使用外层==tmp==变量，内部使用内层的==tmp==变量。但是，函数==f==执行后，输出结果==undefined==，原因在于变量提升，导致内部的==tmp==变量覆盖了外层的==tmp==变量。



第二种场景，用来计数的循环变量泄露为全局变量。

~~~~js
var s = "hello";

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5
~~~~

上面代码中，变量==i==只用来控制循环，但是循环结束后，并没有消失，泄露成了全局变量。



----

#### ES6的块级作用域

==let==实际上为JavaScript新增了块级作用域。

~~~~js
function f1() {
    let n = 5;
    if(true) {
        let n = 10;
    }
    console.log(n); //5
}
~~~~

上面的函数有两个代码块，都声明了变量==n==，运行后输出5.这表示外层代码块不受内层代码块的影响。如果两次都使用==var==定义变量==n==，最后输出的值是10.

ES6允许块级作用域的任意嵌套。

~~~~js
{{{{
    {let insane = 'Hello World'}
    console.log(insane); // 报错
}}}}
~~~~

上面代码使用了一个五层的块级作用域，每一层都是一个单独的作用域。第四层作用域无法读取第五层作用域的内部变量。



内层作用域可以定义外层作用域的同名变量。

~~~~js
{{{{
    let insane = 'Hello World';
    {let insane = 'Hello World'}
}}}}
~~~~

块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名IIFE）不再必要了。

~~~~js
(function(){
    var tmp = ...;
}());

//块级作用域写法
{
    let tmp = ''';
}
~~~~

