# events.once

Polyfill for Node core [`events.once`](https://nodejs.org/dist/latest-v10.x/docs/api/events.html#events_once_emitter_name).

## Usage 

`events.once` can be used directly or can polyfill
the events module.

### Polyfill

```js
require('events.once/polyfill')
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

Instead of requiring directly it can also be preloaded
when starting a process:

```sh
node -r events.once/polyfill my-app.js
```


### As an export


```js
const once = require('events.once')
const { EventEmitter } = require('events')
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

### Does it work with WebPack? 

Yes

### Does it work with Browserify? 

Yes

## License

MIT
