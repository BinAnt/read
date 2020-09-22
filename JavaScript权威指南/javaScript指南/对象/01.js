var p = {
  x: 1.0,
  y: 1.0,
  get r() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  set r(newValue) {
    let oldValue = Math.sqrt(this.x * this.x + this.y * this.y);
    let ratio = newValue / oldValue;
    this.x *= ratio;
    this.y *= ratio;
  },
  get theta() {
    return Math.atan2(this.y, this.x);
  },
};

var q = new Object(p);
// console.log(q); // { x: 1, y: 1, r: [Getter/Setter], theta: [Getter] }

(q.x = 1), (q.y = 2);
// console.log(q.r); //2.23606797749979
// q.r = 2;
// console.log(q.theta, [q.x, q.y]); //1.1071487177940904 [ 0.8944271909999159, 1.7888543819998317 ]

// { value: 1, writable: true, enumerable: true, configurable: true }
// console.log(Object.getOwnPropertyDescriptor(q, "x"));

/** {
  get: [Function: get r],
  set: [Function: set r],
  enumerable: true,
  configurable: true
}
*/
// console.log(Object.getOwnPropertyDescriptor(q, "r"));

var o = Object.create(p);
// console.log(p.isPrototypeOf(o)); // true
// console.log(Object.prototype.isPrototypeOf(o)); // true
function classof(o) {
  if (o === null) return "Null";
  if (o === undefined) return "Undefined";
  return Object.prototype.toString.call(o).slice(8, -1);
}

console.log(classof("hello"));
