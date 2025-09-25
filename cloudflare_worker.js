addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const targetUrl = url.searchParams.get('url')
  
  if (!targetUrl) {
    return new Response('Usage: ' + url.origin + '?url=https://example.com', {
      headers: { 'Content-Type': 'text/plain' }
    })
  }
  
  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body
    })
    
    return new Response(response.body, {
      status: response.status,
      headers: response.headers
    })
  } catch (error) {
    return new Response('Error: ' + error.message, { status: 500 })
  }
}