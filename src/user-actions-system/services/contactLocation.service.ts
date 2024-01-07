interface LocationData {
  ip: string
  region: string;
  country: string;
  timezone: string;
}

export async function fetchLocation(ip: string): Promise<LocationData | undefined> {
  try {
    
    const apiUrl = `http://api.positionstack.com/v1/reverse?access_key=b69247c6cee0ac2d9ace48a04d8f6618&query=${ip}`;
    const locationResponse = await fetch(apiUrl);
    const [locationData] = await locationResponse.json();

    return {
      ip,
      region: locationData.region,
      country: locationData.country,
      timezone: locationData.timezone,
      
    };
  } catch (error) {
    console.error('Error fetching location:', error);
    throw error;
  }
}