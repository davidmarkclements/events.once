# events.once

Polyfill for Node core [`events.once`](https://nodejs.org/dist/latest-v10.x/docs/api/events.html#events_once_emitter_name).

## Usage 

```js
require('events.once')
const { once, EventEmitter } = require('events')
async function run() {
  const ee = new EventEmitter()
  process.nextTick(() => {
    ee.emit('myevent', 42)
  })
  const [value] = await once(ee, 'myevent')
  console.log(value)
  const err = new Error('kaboom')
  process.nextTick(() => {
    ee.emit('error', err)
  })
  try {
    await once(ee, 'myevent')
  } catch (err) {
    console.log('error happened', err)
  }
}
run()
```

As well as polyfilling, the `once` method is also exported, allowing for:

```js
const once = require('events.once')
const EventEmitter = require('events')
```

## License

MIT
