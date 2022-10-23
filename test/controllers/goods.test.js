'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('check buy api', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/goods/buy'
  })
  t.same(JSON.parse(res.payload), { success: true })
})


