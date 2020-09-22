var sum = function (x, y) {
  return x + y;
};
var square = function (x) {
  return x * x;
};
var data = [1, 1, 3, 5, 5];
var mean = data.reduce(sum) / data.length;
console.log(mean);
var dev = data.map((x) => x - mean);
console.log(dev);
var stddev = Math.sqrt(dev.map(square).reduce(sum) / (data.length - 1));
console.log(stddev, dev.map(square).reduce(sum));
