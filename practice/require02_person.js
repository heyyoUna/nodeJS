const Person = require('./person');

console.log('original person', Person);


const p1 = new Person('Bill', 26);

console.log('to Json:', p1);
console.log('to String:', p1.toString());
