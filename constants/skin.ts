export type Wear = 'FN' | 'MW' | 'FT' | 'WW' | 'BS';

export interface Skin {
  id: string;
  name: string;
  image: string;
  rarity: string;
  // Limites du float (Optionnel, 0 et 1 par défaut)
  minFloat: number;
  maxFloat: number;
  // Ta structure de prix intelligente
  prices: {
    normal: Record<Wear, number>; // { FN: 100, MW: 80 ... }
    stattrak: Record<Wear, number>;
  };
}

export const SKINS: Record<string, Skin> = {
  //case kilowatt
  'skin_ak_inheritance': {
    id: 'skin_ak_inheritance',
    name: 'AK-47 | Inheritance',
    image: 'https://cdn.skinbaron.de/steamdata/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhh2MzYfi9B6dC3nY60mvLwOq7c2G4G68cm07rCodz3iQS18hZpZjr6LYLAJw47ZFiGr1a5x7vv15S46pzXiSw09t9Tqzg?optimizer=image',
    rarity: 'covert',
    minFloat: 0.00,
    maxFloat: 1, // Le Fade est très clean, il va rarement jusqu'à Battle Scarred
    prices: {
      normal: { FN: 214.74, MW: 113.26, FT: 66.34, WW: 65.31, BS: 56.69 }, // 0 = n'existe pas
      stattrak: { FN: 456, MW: 222, FT: 129, WW: 137, BS: 105 }
    }
  },
  'skin_awp_chrome_canon': {
    id: 'skin_awp_chrome_canon',
    name: 'AWP | Chrome Canon',
    image: 'https://cdn.skinbaron.de/steamdata/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhh2MzYfi9B6dC3nY60mvLwOq7c2G4G68cm07rCodz3iQS18hZpZjr6LYLAJw47ZFiGr1a5x7vv15S46pzXiSw09t9Tqzg?optimizer=image',
    rarity: 'covert',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {

      normal: { FN: 10, MW: 7, FT: 4, WW: 3, BS: 2 },
      stattrak: { FN: 268, MW: 92, FT: 53, WW: 45, BS: 43 }
    }
  },
  'skin_m4a1-s_black_lotus': {
    id: 'skin_m4a1-s_black_lotus',
    name: 'M4A1-S | Black Lotus',
    image: 'https://cdn.skinbaron.de/steamdata/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhh2MzYfi9B6dC3nY60mvLwOq7c2G4G68cm07rCodz3iQS18hZpZjr6LYLAJw47ZFiGr1a5x7vv15S46pzXiSw09t9Tqzg?optimizer=image',
    rarity: 'classified',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 27, MW: 12, FT: 7.75, WW: 9, BS: 8 },
      stattrak: { FN: 63, MW: 33, FT: 22, WW: 26, BS: 23 }
    }
  },
  'skin_usp-s_jawbreaker': {
    id: 'skin_usp-s_jawbreaker',
    name: 'USP-S | Jawbreaker',
    image: 'https://cdn.skinbaron.de/steamdata/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhh2MzYfi9B6dC3nY60mvLwOq7c2G4G68cm07rCodz3iQS18hZpZjr6LYLAJw47ZFiGr1a5x7vv15S46pzXiSw09t9Tqzg?optimizer=image',
    rarity: 'classified',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 33, MW: 10, FT: 6, WW: 5, BS: 4 },
      stattrak: { FN: 69, MW: 26, FT: 15, WW: 14, BS: 13 }
    }
  },
  'skin_five-seven_hybrid': {
    id: 'skin_five-seven_hybrid',
    name: 'Five-Seven | Hybrid',
    image: 'https://cdn.skinbaron.de/steamdata/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhh2MzYfi9B6dC3nY60mvLwOq7c2G4G68cm07rCodz3iQS18hZpZjr6LYLAJw47ZFiGr1a5x7vv15S46pzXiSw09t9Tqzg?optimizer=image',
    rarity: 'restricted',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 6, MW: 1.56, FT: 0.67, WW: 0.60, BS: 0.65 },
      stattrak: { FN: 7, MW: 2.67, FT: 1.62, WW: 1.34, BS: 1.38 }
    }
  },
  'skin_ssg08_dezastre': {
    id: 'skin_ssg08_dezastre',
    name: 'SSG 08 | Dezastre',
    image: 'https://cdn.skinbaron.de/steamdata/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhh2MzYfi9B6dC3nY60mvLwOq7c2G4G68cm07rCodz3iQS18hZpZjr6LYLAJw47ZFiGr1a5x7vv15S46pzXiSw09t9Tqzg?optimizer=image',
    rarity: 'mil-spec',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 1, MW: 0.23, FT: 0.11, WW: 0.10, BS: 0.10 },
      stattrak: { FN: 2, MW: 0.36, FT: 0.16, WW: 0.14, BS: 0.14 }
    }
  },
  'skin_kukri_knife_vanilla': {
    id: 'skin_kukri_knife_vanilla',
    name: 'Kukri Knife | Vanilla',
    image: 'https://cdn.skinbaron.de/steamdata/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhh2MzYfi9B6dC3nY60mvLwOq7c2G4G68cm07rCodz3iQS18hZpZjr6LYLAJw47ZFiGr1a5x7vv15S46pzXiSw09t9Tqzg?optimizer=image',
    rarity: 'gold',
    minFloat: 0.00,
    maxFloat: 0.07,
    prices: {
      normal: { FN: 144, MW: 0, FT: 0, WW: 0, BS: 0 },
      stattrak: { FN: 159, MW: 0, FT: 0, WW: 0, BS: 0 }
    }
  },
};