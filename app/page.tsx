import Feature from "@/components/feature";

export default async function Home() {
  const city = "Sao Paulo";
  const key = process.env.API_KEY;
  // 2. Consultar WeatherAPI usando a cidade detectada
  const weatherRes = await fetch(
    `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": `${key}`,
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
      },
      cache: "no-store",
      next: { revalidate: 86400 }, // Cache of 24 hours
    }
  );

  const weatherData = await weatherRes.json();

  const condition = weatherData?.current?.condition?.text || "Unavailable";
  const loc = weatherData?.location?.name || "Unavailable";
  const temp = weatherData?.current?.temp_c || 0;

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Feature props={{ loc, condition, temp }} />
    </div>
  );
}
