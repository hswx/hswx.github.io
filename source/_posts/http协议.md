---
title: http协议
date: 2017-10-30 14:05:29
tags: ["http"]
---

# 1 http与tcp、udp、https的关系

TCP和UDP都是网络层上的协议，是建立在IP层之上的。

TCP是有连接的传输，它通过对它下层IP包的冲突、错误检测和重传，保证了最终接收到的数据是可靠的。TCP/IP包括：物理层、数据链路层、网络层、传输层、应用层。

UDP是无连接的，数据包发出去就不管了，没有数据包是否成功并且正确发送的检查，不能保证数据传输100%正确，但是开销会比较小。

HTTP是超文本传输协议，基于TCP协议，HTTP连接最显著的特点是客户端发送的每次请求都需要服务器回送响应，在请求结束后，会主动释放连接。从建立连接到关闭连接的过程称为“一次连接”。

HTTPS是安全超文本传输协议，HTTP是应用层协议，TCP是传输层协议，在应用层和传输层之间，增加了一个安全套接层SSL/TLS：

SSL (Secure Socket Layer，安全套接字层)

TLS (Transport Layer Security，传输层安全协议)

# 2 http一次连接

1. DNS域名解析，找到连接的ip地址
2. 通过3次握手建立TCP连接
3. 向web服务器发送请求命令
4. web服务器响应请求，返回相应数据
5. 浏览器得到数据，渲染页面呈现给用户

# 3 http状态码

## 1 1xx:信息
100 Continue 服务器仅接收到部分请求，但是一旦服务器并没有拒绝该请求，客户端应该继续发送其余的请求。

101 Switching Protocols 服务器转换协议：服务器将遵从客户的请求转换到另外一种协议。

## 2 2xx:成功

200 OK 请求成功（其后是对GET和POST请求的应答文档。）

201 Created 请求被创建完成，同时新的资源被创建。

202 Accepted 供处理的请求已被接受，但是处理未完成。

203 Non-authoritative Information 文档已经正常地返回，但一些应答头可能不正确，因为使用的是文档的拷贝。

204 No Content 没有新文档。浏览器应该继续显示原来的文档。如果用户定期地刷新页面，而Servlet可以确定用户文档足够新，这个状态代码是很有用的。

205 Reset Content 没有新文档。但浏览器应该重置它所显示的内容。用来强制浏览器清除表单输入内容。

206 Partial Content 客户发送了一个带有Range头的GET请求，服务器完成了它。

## 3 3xx:重定向

300 Multiple Choices 多重选择。链接列表。用户可以选择某链接到达目的地。最多允许五个地址。

301 Moved Permanently 所请求的页面已经转移至新的url。

302 Found 所请求的页面已经临时转移至新的url。

303 See Other 所请求的页面可在别的url下被找到。

304 Not Modified 未按预期修改文档。客户端有缓冲的文档并发出了一个条件性的请求（一般是提供If-Modified-Since头表示客户只想比指定日期更新的文档）。服务器告诉客户，原来缓冲的文档还可以继续使用。

305 Use Proxy 客户请求的文档应该通过Location头所指明的代理服务器提取。

306 Unused 此代码被用于前一版本。目前已不再使用，但是代码依然被保留。

307 Temporary Redirect 被请求的页面已经临时移至新的url。

## 4 4xx:客户端错误

400 Bad Request 服务器未能理解请求。

401 Unauthorized 被请求的页面需要用户名和密码。

402 Payment Required 此代码尚无法使用。

403 Forbidden 对被请求页面的访问被禁止。

404 Not Found 服务器无法找到被请求的页面。

405 Method Not Allowed 请求中指定的方法不被允许。

406 Not Acceptable 服务器生成的响应无法被客户端所接受。

407 Proxy Authentication Required 用户必须首先使用代理服务器进行验证，这样请求才会被处理。

408 Request Timeout 请求超出了服务器的等待时间。

409 Conflict 由于冲突，请求无法被完成。

410 Gone 被请求的页面不可用。

411 Length Required "Content-Length" 未被定义。如果无此内
容，服务器不会接受请求。 

412 Precondition Failed 请求中的前提条件被服务器评估为失败。

413 Request Entity Too Large 由于所请求的实体的太大，服务器不会接受请求。

414 Request-url Too Long 由于url太长，服务器不会接受请求。当post请求被转换为带有很长的查询信息的get请求时，就会发生这种情况。

415 Unsupported Media Type 由于媒介类型不被支持，服务器不会接受请求。

416 Requested Range Not Satisfiable 服务器不能满足客户在请求中指定的Range头。

417 Expectation Failed 执行失败。

423 锁定的错误。

## 5 5xx:服务器错误

500 Internal Server Error 请求未完成。服务器遇到不可预知的情况。

501 Not Implemented 请求未完成。服务器不支持所请求的功能。

502 Bad Gateway 请求未完成。服务器从上游服务器收到一个无效的响应。

503 Service Unavailable 请求未完成。服务器临时过载或当机。

504 Gateway Timeout 网关超时。

505 HTTP Version Not Supported 服务器不支持请求中指明的HTTP协议版本。