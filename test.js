'use strict'

const { test } = require('tap')
const EventEmitter = require('events')
const once = require('.')

test('polyfil', async ( { is } ) => {
  require('./polyfill')
  is(once, EventEmitter.once)
})

test('once an event', async ( { is } ) => {
  const ee = new EventEmitter()

  process.nextTick(() => {
    ee.emit('myevent', 42)
  })

  const [value] = await once(ee, 'myevent')
  is(value, 42)
})

test('once an event with two args', async ( { same } ) => {
  const ee = new EventEmitter()

  process.nextTick(() => {
    ee.emit('myevent', 42, 24)
  })

  const value = await once(ee, 'myevent')
  same(value, [42, 24])
})

test('catches errors', async ( { is } ) => {
  const ee = new EventEmitter()

  const err = new Error('kaboom')
  process.nextTick(() => {
    ee.emit('error', err)
  })

  try {
    await once(ee, 'myevent')
  } catch (_e) {
    is(_e, err)
  }
})

test('stop listening after catching error', async ( { is, fail } ) => {
  const ee = new EventEmitter()

  const err = new Error('kaboom')
  process.nextTick(() => {
    ee.emit('error', err)
    ee.emit('myevent', 42, 24)
  })

  process.on('multipleResolves', () => fail('resolve multiple times'))

  try {
    await once(ee, 'myevent')
  } catch (e) {
    is(e, err)
  }
  process.removeAllListeners('multipleResolves')
})

test('once error', async ( { is } ) => {
  const ee = new EventEmitter()

  const err = new Error('kaboom')
  process.nextTick(() => {
    ee.emit('error', err)
  })

  try {
    await once(ee, 'error')
  } catch (_e) {
    is(_e, err)
  }
})

