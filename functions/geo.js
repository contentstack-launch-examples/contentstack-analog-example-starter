// functions/geo.js
// Cloud Function example - based on Contentstack Launch documentation
// https://www.contentstack.com/docs/developers/launch/geolocation-headers#cloud-function-example

export default function handler(request, response) {
  const country = request.headers['visitor-ip-country'];
  const region = request.headers['visitor-ip-region'];
  const city = request.headers['visitor-ip-city'];

  response.status(200).json({
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
    },
    method: request.method,
  });
}

