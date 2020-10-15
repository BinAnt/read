let proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log('GET ' + propertyKey);
    return target[propertyKey];
  },
  set(obj, prop, value) {
    obj[prop] = value
  }
});

let obj = Object.create(proto);
obj.foo = 2
console.log(obj.foo)
// obj.foo // "GET foo"

