export default async function handler(request, context) {
    const url = new URL(request.url);
  
    console.log("Request received at:", url.pathname);
  
    // Redirect /csr to /about-us
    if (url.pathname === "/csr") {
      return Response.redirect(new URL("/about-us", url.origin), 301);
    }
  
    // Rewrite /rewrite-test to /ssr (rewrite example)
    if (url.pathname === "/rewrite-test") {
      const rewriteUrl = new URL("/ssr", url.origin);
      rewriteUrl.search = url.search; // Preserve query params
      
      const response = await fetch(rewriteUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });
      
      // Create a new response with the fetched content and custom headers
      const responseBody = await response.text();
      return new Response(responseBody, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          ...Object.fromEntries(response.headers),
          "x-powered-by": "launch-edge-function",
          "x-rewrite": "true",
        },
      });
    }
  
    if (url.pathname === "/legacy") {
      return new Response(
        JSON.stringify({ message: "Hello from Edge Function!", time: new Date() }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
  
    return fetch(request);
  }