const API_KEY = process.env.LOCATION_API_KEY

export const getLocationByIpAddress = async (ip: string) => {
    if (!ip) return undefined;
    console.log(`User ip is: ${ip}`);
    try {
        const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${ip}`);
        const {city, country_name, time_zone} = await response.json();

        console.log(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${ip}`)
        console.log(`${city}, ${country_name}, ${time_zone}`);

        return {
          city,
          country: country_name,
          timezone: time_zone.name
        }
        
    } catch(error) {
        console.log(error);
        return undefined;
    }
};