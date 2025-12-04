import { Scene } from './types';

export const SCENES: Scene[] = [
  {
    id: 'egypt',
    title: 'Ancient Egypt',
    description: 'Pharaohs and Pyramids (c. 2500 BC)',
    promptModifier: 'in Ancient Egypt with the Great Pyramids in the background, wearing elaborate golden pharaoh jewelry and white linen robes, cinematic lighting, warm desert tones',
    icon: '🏺',
    color: 'from-yellow-600 to-orange-500'
  },
  {
    id: 'victorian',
    title: 'Victorian London',
    description: 'Steam and Cobblestones (c. 1890)',
    promptModifier: 'in foggy Victorian London on a cobblestone street, wearing a formal 19th-century suit or dress with steampunk accents, gaslight atmosphere, moody aesthetics',
    icon: '🎩',
    color: 'from-gray-700 to-slate-900'
  },
  {
    id: 'cyberpunk',
    title: 'Neo-Tokyo 2077',
    description: 'Neon Lights and Chrome (Future)',
    promptModifier: 'in a futuristic cyberpunk city with neon signs and flying cars, wearing high-tech tactical gear and glowing cybernetic accessories, vibrant pink and blue lighting',
    icon: '🦾',
    color: 'from-pink-600 to-purple-600'
  },
  {
    id: 'medieval',
    title: 'Medieval Kingdom',
    description: 'Knights and Castles (c. 1200)',
    promptModifier: 'in a medieval stone castle courtyard, wearing royal armor or medieval noble clothing, dramatic lighting, fantasy realism style',
    icon: '⚔️',
    color: 'from-red-700 to-rose-900'
  },
  {
    id: 'roaring20s',
    title: 'The Roaring 20s',
    description: 'Jazz and Art Deco (c. 1920)',
    promptModifier: 'at a lavish 1920s Art Deco jazz party, wearing a Great Gatsby style tuxedo or flapper dress, champagne gold lighting, vintage film grain style',
    icon: '🎷',
    color: 'from-emerald-700 to-teal-900'
  },
  {
    id: 'viking',
    title: 'Viking Age',
    description: 'Fjords and Longships (c. 900)',
    promptModifier: 'standing on the deck of a Viking longship in a snowy fjord, wearing fur and leather armor, epic cinematic composition, cold blue tones',
    icon: '🛡️',
    color: 'from-sky-700 to-blue-900'
  }
];
