function* generateNext () {
  yield 1
  yield 2
  yield 3
  yield 4
  yield 5
}

const iterableObj = {
  [Symbol.iterator]: generateNext
}

for (const n of iterableObj) {
  console.log(n)
}
