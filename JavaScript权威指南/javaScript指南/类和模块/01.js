// 这是一个构造函数，用以创建新创建的“范围对象”
// 注意，这里并没有创建并返回一个对象，仅仅是初始化
function Range(from, to) {
  // 存储“范围对象”的起始位置
  // 这两个属性是不可继承的，每个对象都拥有唯一的属性
  this.from = from;
  this.to = to;
}

// 所有的“范围对象”都继承自这个对象
// 注意，属性的名字必须是prototype
Range.prototype = {
  includes: function (x) {
    return x <= this.to && x >= this.from;
  },
  foreach: function (f) {
    for (var i = Math.ceil(this.from); i <= this.to; i++) f(i);
  },
  toString: function () {
    return "(" + this.from + "..." + this.to + ")";
  },
};

// var r = new Range(1, 3); // 创建一个范围对象
// console.log(r.includes(2)); // true
// r.foreach(console.log); // 1 2 3
// console.log(r.toString()); // (1...3)

// console.log(r.constructor);

var F = function () {};
var p = F.prototype;
var c = p.contructor;
console.log(c === Object);

var r = new Range(1, 5);
console.log(Range === Range.prototype.contructor);
