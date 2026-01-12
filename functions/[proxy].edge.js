export default async function handler(request, context) {
    const url = new URL(request.url);
  
    console.log("Request received at:", url.pathname);
  
    // Geolocation headers example - based on Contentstack Launch documentation
    if (url.pathname === "/appliances" || url.pathname === "/geo") {
      const country = request.headers.get('visitor-ip-country');
      const region = request.headers.get('visitor-ip-region');
      const city = request.headers.get('visitor-ip-city');
      
      return new Response(
        JSON.stringify({
          location: `${city}, ${region}, ${country}`,
          geolocation: {
            country: country || 'Unknown',
            region: region || 'Unknown',
            city: city || 'Unknown',
          },
          timestamp: new Date().toISOString(),
          headers: {
            'visitor-ip-country': country,
            'visitor-ip-region': region,
            'visitor-ip-city': city,
          }
        }),
        {
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, must-revalidate'
          }
        }
      );
    }
  
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