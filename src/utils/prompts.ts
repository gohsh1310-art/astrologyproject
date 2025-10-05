import { BirthChart } from '../store/useStore'
import { getCurrentTransits, getMoonPhase, getRetrogradePlanets } from './astrology'

interface Prompt {
  type: 'reflection' | 'affirmation' | 'ritual' | 'action'
  title: string
  content: string
  icon: string
}

export function generateDailyPrompts(birthChart: BirthChart | null): Prompt[] {
  const prompts: Prompt[] = []
  const transits = getCurrentTransits()
  const moonPhase = getMoonPhase()
  const retrogrades = getRetrogradePlanets()

  if (moonPhase === 'New Moon') {
    prompts.push({
      type: 'ritual',
      title: 'NEW MOON MANIFESTATION',
      content: 'Tonight is the New Moon—a powerful time for setting intentions. Write down 3 specific goals you want to manifest this lunar cycle. Be clear, be bold, be specific.',
      icon: '🌑'
    })
  }

  if (moonPhase === 'Full Moon') {
    prompts.push({
      type: 'ritual',
      title: 'FULL MOON RELEASE',
      content: 'The Full Moon illuminates what needs to be released. Write a letter to yourself about what you\'re ready to let go of. Burn it (safely) or tear it up as a symbolic release.',
      icon: '🌕'
    })
  }

  if (retrogrades.includes('Mercury')) {
    prompts.push({
      type: 'action',
      title: 'MERCURY RETROGRADE ALERT',
      content: 'Mercury is retrograde. Back up your files, double-check communications, and revisit old projects. This is a time for reflection, not rushing forward.',
      icon: '⚠️'
    })
  }

  if (birthChart) {
    if (transits.sun.sign === birthChart.sun.sign) {
      prompts.push({
        type: 'affirmation',
        title: 'SOLAR RETURN ENERGY',
        content: `The Sun is in your sign (${birthChart.sun.sign})! This is YOUR season. Affirmation: "I am stepping into my power. I honor my authentic self. I am worthy of all my desires."`,
        icon: '☀️'
      })
    }

    if (transits.moon.sign === birthChart.moon.sign) {
      prompts.push({
        type: 'reflection',
        title: 'LUNAR RETURN CHECK-IN',
        content: `The Moon is in ${birthChart.moon.sign}, your natal Moon sign. How are you feeling emotionally today? What do you need to feel safe and nurtured?`,
        icon: '🌙'
      })
    }

    prompts.push({
      type: 'reflection',
      title: `${birthChart.sun.sign.toUpperCase()} SUN REFLECTION`,
      content: `As a ${birthChart.sun.sign} Sun, your core identity thrives on ${getSunSignTrait(birthChart.sun.sign)}. How did you express this part of yourself today?`,
      icon: '✨'
    })

    prompts.push({
      type: 'affirmation',
      title: `${birthChart.moon.sign.toUpperCase()} MOON AFFIRMATION`,
      content: `Your ${birthChart.moon.sign} Moon needs ${getMoonSignNeed(birthChart.moon.sign)}. Today's affirmation: "${getMoonAffirmation(birthChart.moon.sign)}"`,
      icon: '💫'
    })
  }

  prompts.push({
    type: 'reflection',
    title: 'DAILY COSMIC CHECK-IN',
    content: 'What cosmic energy did you feel most strongly today? Did you notice any synchronicities or meaningful coincidences?',
    icon: '🔮'
  })

  prompts.push({
    type: 'action',
    title: 'TRANSIT AWARENESS',
    content: `Current transits: Sun in ${transits.sun.sign}, Moon in ${transits.moon.sign}. How can you work WITH these energies instead of against them?`,
    icon: '🌠'
  })

  return prompts
}

function getSunSignTrait(sign: string): string {
  const traits: Record<string, string> = {
    'Aries': 'courage, initiative, and bold action',
    'Taurus': 'stability, sensuality, and building lasting value',
    'Gemini': 'curiosity, communication, and mental agility',
    'Cancer': 'nurturing, emotional depth, and creating safe spaces',
    'Leo': 'creative self-expression, generosity, and radiant confidence',
    'Virgo': 'precision, service, and practical improvement',
    'Libra': 'harmony, beauty, and balanced relationships',
    'Scorpio': 'intensity, transformation, and emotional truth',
    'Sagittarius': 'adventure, wisdom-seeking, and expansive thinking',
    'Capricorn': 'ambition, discipline, and long-term achievement',
    'Aquarius': 'innovation, independence, and humanitarian vision',
    'Pisces': 'compassion, imagination, and spiritual connection'
  }
  return traits[sign] || 'authentic self-expression'
}

function getMoonSignNeed(sign: string): string {
  const needs: Record<string, string> = {
    'Aries': 'independence and excitement',
    'Taurus': 'comfort and stability',
    'Gemini': 'mental stimulation and variety',
    'Cancer': 'emotional security and home',
    'Leo': 'appreciation and creative outlets',
    'Virgo': 'order and purposeful activity',
    'Libra': 'harmony and beautiful surroundings',
    'Scorpio': 'depth and emotional intensity',
    'Sagittarius': 'freedom and adventure',
    'Capricorn': 'structure and achievement',
    'Aquarius': 'space and intellectual connection',
    'Pisces': 'solitude and spiritual practice'
  }
  return needs[sign] || 'emotional fulfillment'
}

function getMoonAffirmation(sign: string): string {
  const affirmations: Record<string, string> = {
    'Aries': 'I honor my need for independence while staying connected to my emotions',
    'Taurus': 'I create comfort and security from within',
    'Gemini': 'I trust my emotional intelligence as much as my mental clarity',
    'Cancer': 'I am safe to feel deeply and express my needs',
    'Leo': 'I am worthy of love and recognition exactly as I am',
    'Virgo': 'I release perfectionism and embrace emotional authenticity',
    'Libra': 'I find balance between my needs and others\' needs',
    'Scorpio': 'I trust the transformative power of my emotions',
    'Sagittarius': 'I am free to explore my feelings without judgment',
    'Capricorn': 'I allow myself to be vulnerable and receive support',
    'Aquarius': 'I honor my unique emotional landscape',
    'Pisces': 'I set healthy boundaries while staying compassionate'
  }
  return affirmations[sign] || 'I honor my emotional truth'
}
