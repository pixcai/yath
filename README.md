# yath
Yet Another Tester for HTML

# Install
```shell
npm install --save yath
```

# Usage
```html
<script src="node_modules/yath/dist/yath.min.js"></script>
```
```js
var test = yath(document.getElementById('root'));

test('test yath', function(t) {
  t.fail('This is a fail message');
  t.pass('This is a pass message');
  t.print('p', 'This is a custom format message', {
    color: 'purple',
    textAlign: 'center'
  });

  t.comment('test equal')
    .equal(1, 1)
    .equal(1, 0)
    .equal(1.1, 1.1)
    .equal('a', 'a')
    .equal('a', 'b', 'error: "a" != "b"')
    .equal(false, false)
    .equal(true, false);

  t.comment('test deepEqual')
    .deepEqual({
      a: 1,
      b: [2, 3]
    }, {
      a: 1,
      b: [2, 3]
    })

  t.comment('test strictEqual')
    .strictEqual(typeof t.assert, 'function')
    .strictEqual(t.assert, t.true)
    .strictEqual(t.assert, t.ok)

    t.test('sub test', {
      name: {
        style: {
          color: 'green'
        }
      },
      comment: {
        style: {
          background: 'lightblue'
        }
      }
    }, function(t) {
      t.test('sub sub test', {
        comment: {
          style: {
            background: 'purple'
          }
        },
        actual: {
          style: {
            'font-size': '1.2em'
          }
        },
        expected: {
          style: {
            'font-size': '1.2em'
          }
        }
      }, function(t) {
        t.comment('test deepStrictEqual')
          .deepStrictEqual({
            a: 1
          }, obj)
          .deepStrictEqual({
            a: 1,
            b: {
              c: 'defg',
              h: ['i', 'j', 'k', 'l'],
              m: {
                n: 1.1314
              }
            }
          }, {a: {
          	b: 1
          }});
      });

  t.comment('test throw')
    .throws(function() {
      throw new ReferenceError('throw something');
    }, /test/)
    .throws(function() {
      throw new ReferenceError('throw something');
    }, /something/);

  t.comment('test doesNotThrow')
    .doesNotThrow(function() {
      throw new ReferenceError('throw something');
    }, /something/)
    .doesNotThrow(function() {
      throw new ReferenceError('throw something');
    }, /test/);
});
```

# API
## assert(value[, message])
Assert `value` equal `true`

Alias: `is`, `ok`, `isOk`, `true`

## notOk(value[, message])
Assert `value` equal `false`

Alias: `false`, `isNotOk`

## equal(actual, expected[, message])
Assert `actual` == `expected`. If not, throw message `message`

Alias: `equals`, `isEqual`, `isEquals`

## notEqual(actual, expected[, message])
Assert `actual` != `expected`. If not, throw message `message`

Alias: `doesNotEquals`, `doesNotEqual`, `isNotEquals`, `isNotEqual`, `notEquals`

## deepEqual(actual, expected[, message])
Assert if `actual` equal `expected` in deep. If not, throw message `message`

Alias: `same`, `deepEquals`, `isEquivalent`

## notDeepEqual(actual, expected[, message])
Assert if `actual` not equal `expected` in deep. If not, throw message `message`

Alias: `notSame`, `isNotDeepEquals`, `isNotEquivalent`, `notDeepEquals`, `isNotDeepEquals`

## strictEqual(actual, expected[, message])
Alias: `isStrictEqual`, `strictEquals`, `isStrictEquals`

## notStrictEqual(actual, expected[, message])
Alias: `isNotStrictEqual`, `notStrictEquals`, `isNotStrictEquals`

## deepStrictEqual(actual, expected[, message])
Alias: `isDeepStrictEqual`, `deepStrictEquals`, `isDeepStrictEquals`

## notDeepStrictEqual(actual, expected[, message])
Alias: `isNotDeepStrictEqual`, `notDeepStrictEquals`, `isNotDeepStrictEquals`

## throws(fn, expected[, message])
Assert if `fn` throw an error `expected`. If not, throw message `message`

## doesNotThrow(fn, expected[, message])
Assert if `fn` does not throw an error `expected`. If not, throw message `message`

# License
MIT