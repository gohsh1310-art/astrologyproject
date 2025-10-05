import * as Astronomy from 'astronomy-engine'

const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
]

export function calculateZodiacSign(longitude: number): { sign: string; degree: number } {
  const signIndex = Math.floor(longitude / 30)
  const degree = longitude % 30
  return {
    sign: ZODIAC_SIGNS[signIndex],
    degree: Math.round(degree * 100) / 100
  }
}

export function calculateBirthChart(date: Date, latitude: number, longitude: number) {
  const observer = new Astronomy.Observer(latitude, longitude, 0)
  
  const sun = Astronomy.SunPosition(date)
  const moon = Astronomy.GeoMoon(date)
  const mercury = Astronomy.GeoVector('Mercury', date, false)
  const venus = Astronomy.GeoVector('Venus', date, false)
  const mars = Astronomy.GeoVector('Mars', date, false)
  const jupiter = Astronomy.GeoVector('Jupiter', date, false)
  const saturn = Astronomy.GeoVector('Saturn', date, false)
  const uranus = Astronomy.GeoVector('Uranus', date, false)
  const neptune = Astronomy.GeoVector('Neptune', date, false)
  const pluto = Astronomy.GeoVector('Pluto', date, false)

  const sunLon = Astronomy.EclipticLongitude('Sun', date)
  const moonLon = Astronomy.EclipticLongitude('Moon', date)
  const mercuryLon = Astronomy.EclipticLongitude('Mercury', date)
  const venusLon = Astronomy.EclipticLongitude('Venus', date)
  const marsLon = Astronomy.EclipticLongitude('Mars', date)
  const jupiterLon = Astronomy.EclipticLongitude('Jupiter', date)
  const saturnLon = Astronomy.EclipticLongitude('Saturn', date)
  const uranusLon = Astronomy.EclipticLongitude('Uranus', date)
  const neptuneLon = Astronomy.EclipticLongitude('Neptune', date)
  const plutoLon = Astronomy.EclipticLongitude('Pluto', date)

  const risingSign = calculateRisingSign(date, latitude, longitude)

  return {
    sun: { ...calculateZodiacSign(sunLon), house: 1 },
    moon: { ...calculateZodiacSign(moonLon), house: 4 },
    rising: calculateZodiacSign(risingSign),
    mercury: { ...calculateZodiacSign(mercuryLon), house: 3 },
    venus: { ...calculateZodiacSign(venusLon), house: 2 },
    mars: { ...calculateZodiacSign(marsLon), house: 1 },
    jupiter: { ...calculateZodiacSign(jupiterLon), house: 9 },
    saturn: { ...calculateZodiacSign(saturnLon), house: 10 },
    uranus: { ...calculateZodiacSign(uranusLon), house: 11 },
    neptune: { ...calculateZodiacSign(neptuneLon), house: 12 },
    pluto: { ...calculateZodiacSign(plutoLon), house: 8 }
  }
}

function calculateRisingSign(date: Date, latitude: number, longitude: number): number {
  const lst = calculateLocalSiderealTime(date, longitude)
  const ascendant = Math.atan2(
    Math.sin(lst * Math.PI / 180),
    Math.cos(lst * Math.PI / 180) * Math.sin(latitude * Math.PI / 180)
  ) * 180 / Math.PI
  
  return (ascendant + 360) % 360
}

function calculateLocalSiderealTime(date: Date, longitude: number): number {
  const jd = Astronomy.MakeTime(date).tt / 86400.0 + 2451545.0
  const t = (jd - 2451545.0) / 36525.0
  const gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * t * t - t * t * t / 38710000.0
  const lst = (gmst + longitude) % 360
  return lst < 0 ? lst + 360 : lst
}

export function getCurrentTransits() {
  const now = new Date()
  const sunLon = Astronomy.EclipticLongitude('Sun', now)
  const moonLon = Astronomy.EclipticLongitude('Moon', now)
  const mercuryLon = Astronomy.EclipticLongitude('Mercury', now)
  const venusLon = Astronomy.EclipticLongitude('Venus', now)
  const marsLon = Astronomy.EclipticLongitude('Mars', now)

  return {
    sun: calculateZodiacSign(sunLon),
    moon: calculateZodiacSign(moonLon),
    mercury: calculateZodiacSign(mercuryLon),
    venus: calculateZodiacSign(venusLon),
    mars: calculateZodiacSign(marsLon)
  }
}

export function getMoonPhase(date: Date = new Date()): string {
  const phase = Astronomy.MoonPhase(date)
  
  if (phase < 45) return 'New Moon'
  if (phase < 90) return 'Waxing Crescent'
  if (phase < 135) return 'First Quarter'
  if (phase < 180) return 'Waxing Gibbous'
  if (phase < 225) return 'Full Moon'
  if (phase < 270) return 'Waning Gibbous'
  if (phase < 315) return 'Last Quarter'
  return 'Waning Crescent'
}

export function getRetrogradePlanets(date: Date = new Date()): string[] {
  const retrogrades: string[] = []
  
  const planets = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn']
  
  planets.forEach(planet => {
    const current = Astronomy.HelioVector(planet as any, date)
    const future = Astronomy.HelioVector(planet as any, new Date(date.getTime() + 86400000))
    
    const currentLon = Math.atan2(current.y, current.x)
    const futureLon = Math.atan2(future.y, future.x)
    
    if (futureLon < currentLon) {
      retrogrades.push(planet)
    }
  })
  
  return retrogrades
}
