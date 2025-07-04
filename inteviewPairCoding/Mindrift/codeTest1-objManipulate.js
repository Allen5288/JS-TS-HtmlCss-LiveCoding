'use strict';

function createObject(s) {
  this.foo = s;
}

function deleteFoo(obj) {
  delete obj.foo;
  delete obj.__proto__.foo;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
  const s = readLine();
  const obj = Object.create({
    foo: s
  });
  const obj1 = new createObject(s);
  deleteFoo(obj1);
  deleteFoo(obj);
  if (Object.keys(obj1).length !== 0) {
    ws.write("foo property not deleted correctly for object created using 1st method.\n");
  }
  if (Object.keys(obj.__proto__).length !== 0) {
    ws.write("foo property not deleted correctly for object created using 2nd method.\n");
  }
  ws.write(obj1.foo + '\n');
}