let a = { x: 1, y: 2, z: 5 };
// Array.prototype.push.call(a, "m");
let b = Array.prototype.join.call(a, "=");
console.log(b);
