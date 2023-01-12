ctx

ctx.helper.success({})
ctx.request
this.ctx.body

this.ctx.request.query
this.ctx.request.params
ctx.request.body
ctx.request.header
ctx.cookies.get('count')
ctx.cookies.set('count', null)
ctx.status
this.ctx.body

通过 ctx.set(key, value) 方法可以设置一个响应头，ctx.set(headers) 设置多个 Header。
ctx.set('show-response-time', used.toString());

