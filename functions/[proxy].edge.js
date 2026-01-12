export default async function handler(request, context) {
    const url = new URL(request.url);
  
    console.log("Request received at:", url.pathname);
  
    // Redirect /csr to /about-us
    if (url.pathname === "/csr") {
      return Response.redirect(new URL("/about-us", url.origin), 301);
    }
  
    if (url.pathname === "/legacy") {
      return new Response(
        JSON.stringify({ message: "Hello from Edge Function!", time: new Date() }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
  
    return fetch(request);
  }