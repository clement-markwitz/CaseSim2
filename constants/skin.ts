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

export interface InventorySkin {
  id: string;
  owner_id: string;
  skins: Skin;
  wear: Wear;
  price: number;
  float_value: number;
  isStatTrak: boolean;
  isSouvenir: boolean;
  type: string;
  status: string;
}

export const SKINS: Record<string, Skin> = {
  //case kilowatt
  'skin_ak_inheritance': {
    id: 'skin_ak_inheritance',
    name: 'AK-47 | Inheritance',
    image: 'https://cdn.tradeit.gg/csgo%2FAK-47%20-%20Inheritance%20(Battle-Scarred)_240x152.webp',
    rarity: 'covert',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 214.74, MW: 113.26, FT: 66.34, WW: 65.31, BS: 56.69 },
      stattrak: { FN: 456, MW: 222, FT: 129, WW: 137, BS: 105 }
    }
  },
  'skin_awp_chrome_canon': {
    id: 'skin_awp_chrome_canon',
    name: 'AWP | Chrome Canon',
    image: 'https://cdn.tradeit.gg/csgo%2FAWP%20-%20Chrome%20Cannon%20(Factory%20New)_240x152.webp',
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
    image: 'https://cdn.tradeit.gg/csgo%2FM4A1-S%20-%20Black%20Lotus%20(Battle-Scarred)_240x152.webp',
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
    image: 'https://cdn.tradeit.gg/csgo%2FUSP-S%20-%20Jawbreaker%20(Battle-Scarred)_240x152.webp',
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
    image: 'https://cdn.tradeit.gg/csgo%2FFive-SeveN%20-%20Hybrid%20(Factory%20New)_240x152.webp',
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
    image: 'https://cdn.tradeit.gg/csgo%2FSSG%2008%20-%20Dezastre%20(Factory%20New)_240x152.webp',
    rarity: 'mil-spec',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 1, MW: 0.23, FT: 0.11, WW: 0.10, BS: 0.10 },
      stattrak: { FN: 2, MW: 0.36, FT: 0.16, WW: 0.14, BS: 0.14 }
    }
  },
  'skin_mp7_just_smile': {
    id: 'skin_mp7_just_smile',
    name: 'MP7 | Just Smile',
    image: 'https://cdn.tradeit.gg/csgo%2FMP7%20-%20Just%20Smile%20(Factory%20New)_240x152.webp',
    rarity: 'restricted',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 6.96, MW: 1.67, FT: 0.71, WW: 0.54, BS: 0.53 },
      stattrak: { FN: 7.91, MW: 3.01, FT: 1.49, WW: 1.22, BS: 1.25 }
    }
  },
  'skin_tec-9_slag': {
    id: 'skin_tec-9_slag',
    name: 'Tec-9 | Slag',
    image: 'https://cdn.tradeit.gg/csgo%2FTec-9%20-%20Slag%20(Factory%20New)_240x152.webp',
    rarity: 'mil-spec',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 0.97, MW: 0.21, FT: 0.11, WW: 0.11, BS: 0.09 },
      stattrak: { FN: 1.15, MW: 0.27, FT: 0.14, WW: 0.14, BS: 0.14 }
    }
  },
  'skin_m4a4_etch_lord': {
    id: 'skin_m4a4_etch_lord',
    name: 'M4A4 | Etch Lord',
    image: 'https://cdn.tradeit.gg/csgo%2FM4A4%20-%20Etch%20Lord%20(Factory%20New)_240x152.webp',
    rarity: 'restricted',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 6.37, MW: 1.35, FT: 0.60, WW: 0.54, BS: 0.55 },
      stattrak: { FN: 10.31, MW: 3.09, FT: 1.71, WW: 1.35, BS: 1.46 }
    }
  },
  'skin_dual_barettas_hideout': {
    id: 'skin_dual_barettas_hideout',
    name: 'Dual Barettas | Hideout',
    image: 'https://cdn.tradeit.gg/csgo%2FDual%20Berettas%20-%20Hideout%20(Battle-Scarred)_240x152.webp',
    rarity: 'mil-spec',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 0.45, MW: 0.18, FT: 0.11, WW: 0.10, BS: 0.11 },
      stattrak: { FN: 0.55, MW: 0.26, FT: 0.14, WW: 0.18, BS: 0.14 }
    }
  },
  'skin_mac-10_light_box': {
    id: 'skin_mac-10_light_box',
    name: 'MAC-10 | Light Box',
    image: 'https://cdn.tradeit.gg/csgo%2FStatTrak-%20MAC-10%20-%20Light%20Box%20(Battle-Scarred)_240x152.webp',
    rarity: 'mil-spec',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 1.09, MW: 0.23, FT: 0.11, WW: 0.10, BS: 0.09 },
      stattrak: { FN: 2.85, MW: 0.45, FT: 0.19, WW: 0.14, BS: 0.14 }
    }
  },
  'skin_ump-45_motorized': {
    id: 'skin_ump-45_motorized',
    name: 'UMP-45 | Motorized',
    image: 'https://cdn.tradeit.gg/csgo%2FStatTrak-%20UMP-45%20-%20Motorized%20(Battle-Scarred)_240x152.webp',
    rarity: 'mil-spec',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 0.54, MW: 0.18, FT: 0.10, WW: 0.10, BS: 0.08 },
      stattrak: { FN: 0.77, MW: 0.26, FT: 0.13, WW: 0.16, BS: 0.13 }
    }
  },
  'skin_xm1014_irezumi': {
    id: 'skin_xm1014_irezumi',
    name: 'XM1014 | Irezumi',
    image: 'https://cdn.tradeit.gg/csgo%2FXM1014%20-%20Irezumi%20(Battle-Scarred)_240x152.webp',
    rarity: 'mil-spec',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 0.50, MW: 0.18, FT: 0.10, WW: 0.13, BS: 0.08 },
      stattrak: { FN: 0.83, MW: 0.25, FT: 0.13, WW: 0.18, BS: 0.13 }
    }
  },
  'skin_nova_dark_sigil': {
    id: 'skin_nova_dark_sigil',
    name: 'Nova | Dark Sigil',
    image: 'https://cdn.tradeit.gg/csgo%2FNova%20-%20Dark%20Sigil%20(Battle-Scarred)_240x152.webp',
    rarity: 'mil-spec',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 0.45, MW: 0.17, FT: 0.11, WW: 0.09, BS: 0.09 },
      stattrak: { FN: 0.56, MW: 0.24, FT: 0.14, WW: 0.17, BS: 0.15 }
    }
  },
  'skin_glock-18_block-18': {
    id: 'skin_glock-18_block-18',
    name: 'Glock-18 | Block-18',
    image: 'https://cdn.tradeit.gg/csgo%2FGlock-18%20-%20Block-18%20(Battle-Scarred)_240x152.webp',
    rarity: 'restricted',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 2.68, MW: 1.10, FT: 0.60, WW: 0.76, BS: 0.59 },
      stattrak: { FN: 6.12, MW: 3.07, FT: 1.57, WW: 2.29, BS: 1.58 }
    }
  },
  'skin_sawed-off_analog_input': {
    id: 'skin_sawed-off_analog_input',
    name: 'Sawed-Off | Analog Input',
    image: 'https://cdn.tradeit.gg/csgo%2FSawed-Off%20-%20Analog%20Input%20(Battle-Scarred)_240x152.webp',
    rarity: 'restricted',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 2.28, MW: 0.84, FT: 0.54, WW: 0.58, BS: 0.53 },
      stattrak: { FN: 3.30, MW: 1.72, FT: 1.21, WW: 1.31, BS: 1.24 }
    }
  },
  'skin_zeus_x27_olympus': {
    id: 'skin_zeus_x27_olympus',
    name: 'Zeus X27 | Olympus',
    image: 'https://cdn.tradeit.gg/csgo%2FStatTrak-%20Zeus%20x27%20-%20Olympus%20(Battle-Scarred)_240x152.webp',
    rarity: 'classified',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 12.20, MW: 6.22, FT: 4.36, WW: 4.39, BS: 3.98 },
      stattrak: { FN: 27.08, MW: 12.94, FT: 7.41, WW: 7.28, BS: 6.48 }
    }
  },
  'skin_kukri_knife_vanilla': {
    id: 'skin_kukri_knife_vanilla',
    name: 'Kukri Knife | Vanilla',
    image: 'https://cdn.tradeit.gg/csgo%2F%E2%98%85%20Kukri%20Knife_240x152.webp',
    rarity: 'gold',
    minFloat: 0.00,
    maxFloat: 0.07,
    prices: {
      normal: { FN: 144, MW: 0, FT: 0, WW: 0, BS: 0 },
      stattrak: { FN: 159, MW: 0, FT: 0, WW: 0, BS: 0 }
    }
  },



  //Gallery
  'skin_ak47_the_outsiders': {
    id: 'skin_ak47_the_outsiders',
    name: 'AK-47 | The Outsiders',
    image: 'https://cdn.tradeit.gg/csgo%2FStatTrak-%20AK-47%20-%20The%20Outsiders%20(Battle-Scarred)_240x152.webp',
    rarity: 'classified',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 130.35, MW: 25.72, FT: 9.40, WW: 9.21, BS: 9.05 },
      stattrak: { FN: 116.65, MW: 38.66, FT: 22.43, WW: 23.13, BS: 22.94 }
    }
  },
  'skin_aug_luxe_trim': {
    id: 'skin_aug_luxe_trim',
    name: 'Aug | Luxe Trim',
    image: 'https://cdn.tradeit.gg/csgo%2FStatTrak-%20AUG%20-%20Luxe%20Trim%20(Battle-Scarred)_240x152.webp',
    rarity: 'mil-spec',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 2.15, MW: 0.45, FT: 0.23, WW: 0.17, BS: 0.18 },
      stattrak: { FN: 4.05, MW: 0.89, FT: 0.34, WW: 0.33, BS: 0.36 }
    }
  },
  'skin_desert_eagle_calligraffiti': {
    id: 'skin_desert_eagle_calligraffiti',
    name: 'Desert Eagle | Calligraffiti',
    image: 'https://cdn.tradeit.gg/csgo%2FStatTrak-%20Desert%20Eagle%20-%20Calligraffiti%20(Battle-Scarred)_240x152.webp',
    rarity: 'mil-spec',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 1.98, MW: 0.70, FT: 0.30, WW: 0.23, BS: 0.20 },
      stattrak: { FN: 7.51, MW: 1.51, FT: 0.81, WW: 0.77, BS: 0.80 }
    }
  },
  'skin_dual_barettas_hydro_strike': {
    id: 'skin_dual_barettas_hydro_strike',
    name: 'Dual Barettas | Hydro Strike',
    image: 'https://cdn.tradeit.gg/csgo%2FStatTrak-%20Dual%20Berettas%20-%20Hydro%20Strike%20(Battle-Scarred)_240x152.webp',
    rarity: 'restricted',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 6.71, MW: 2.56, FT: 0.92, WW: 1.28, BS: 0.83 },
      stattrak: { FN: 12.20, MW: 4.41, FT: 1.99, WW: 2.54, BS: 2.13 }
    }
  },
  'skin_glock-18_gold_toof': {
    id: 'skin_glock-18_gold_toof',
    name: 'Glock-18 | Gold Toof',
    image: 'https://cdn.tradeit.gg/csgo%2FGlock-18%20-%20Gold%20Toof%20(Battle-Scarred)_240x152.webp',
    rarity: 'covert',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 199.01, MW: 48.67, FT: 31.47, WW: 35.69, BS: 34.05 },
      stattrak: { FN: 203.83, MW: 88.63, FT: 45.76, WW: 56.41, BS: 49.73 }
    }
  },
  'skin_m249_hypnosis': {
    id: 'skin_m249_hypnosis',
    name: 'M249 | Hypnosis',
    image: 'https://cdn.tradeit.gg/csgo%2FM249%20-%20Hypnosis%20(Battle-Scarred)_240x152.webp',
    rarity: 'mil-spec',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 2.28, MW: 0.43, FT: 0.22, WW: 0.14, BS: 0.13 },
      stattrak: { FN: 2.07, MW: 0.64, FT: 0.32, WW: 0.26, BS: 0.25 }
    }
  },
  'skin_m4a1-s_vaporwave': {
    id: 'skin_m4a1-s_vaporwave',
    name: 'M4A1-S | Vaporwave',
    image: 'https://cdn.tradeit.gg/csgo%2FM4A1-S%20-%20Vaporwave%20(Battle-Scarred)_240x152.webp',
    rarity: 'covert',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 355.95, MW: 136.88, FT: 68.45, WW: 62.55, BS: 51.75 },
      stattrak: { FN: 480.30, MW: 230.50, FT: 117.52, WW: 118.21, BS: 104.94 }
    }
  },
  'skin_m4a4_turbine': {
    id: 'skin_m4a4_turbine',
    name: 'M4A4 | Turbine',
    image: 'https://cdn.tradeit.gg/csgo%2FM4A4%20-%20Turbine%20(Battle-Scarred)_240x152.webp',
    rarity: 'restricted',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 35.25, MW: 4.14, FT: 1.34, WW: 1.39, BS: 1.11 },
      stattrak: { FN: 24.86, MW: 8.19, FT: 3.49, WW: 4.56, BS: 3.54 }
    }
  },
  'skin_mac-10_saibā_oni': {
    id: 'skin_mac-10_saibā_oni',
    name: 'MAC-10 | Saibā Oni',
    image: 'https://cdn.tradeit.gg/csgo%2FStatTrak-%20MAC-10%20-%20Saibā%20Oni%20(Battle-Scarred)_240x152.webp',
    rarity: 'restricted',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 6.76, MW: 2.69, FT: 1.36, WW: 1.55, BS: 1.33 },
      stattrak: { FN: 12.60, MW: 5.66, FT: 2.96, WW: 4.59, BS: 2.99 }
    }
  },
  'skin_mp5-sd_statics': {
    id: 'skin_mp5-sd_statics',
    name: 'MP5-SD | Statics',
    image: 'https://cdn.tradeit.gg/csgo%2FStatTrak-%20MP5-SD%20-%20Statics%20(Battle-Scarred)_240x152.webp',
    rarity: 'mil-spec',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 2.56, MW: 0.48, FT: 0.24, WW: 0.14, BS: 0.14 },
      stattrak: { FN: 2.65, MW: 0.77, FT: 0.34, WW: 0.28, BS: 0.32 }
    }
  },
  'skin_p250_epicenter': {
    id: 'skin_p250_epicenter',
    name: 'P250 | Epicenter',
    image: 'https://cdn.tradeit.gg/csgo%2FStatTrak-%20P250%20-%20Epicenter%20(Battle-Scarred)_240x152.webp',
    rarity: 'classified',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 35.47, MW: 14.20, FT: 6.55, WW: 6.55, BS: 4.96 },
      stattrak: { FN: 46.00, MW: 24.32, FT: 10.04, WW: 11.15, BS: 9.51 }
    }
  },
  'skin_p90_randy_rush': {
    id: 'skin_p90_randy_rush',
    name: 'P90 | Randy Rush',
    image: 'https://cdn.tradeit.gg/csgo%2FStatTrak-%20P90%20-%20Randy%20Rush%20(Battle-Scarred)_240x152.webp',
    rarity: 'restricted',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 5.74, MW: 1.99, FT: 0.75, WW: 0.98, BS: 0.73 },
      stattrak: { FN: 7.45, MW: 3.30, FT: 1.53, WW: 1.96, BS: 1.49 }
    }
  },
  'skin_r8_revolver_tango': {
    id: 'skin_r8_revolver_tango',
    name: 'R8 Revolver | Tango',
    image: 'https://cdn.tradeit.gg/csgo%2FStatTrak-%20R8%20Revolver%20-%20Tango%20(Battle-Scarred)_240x152.webp',
    rarity: 'mil-spec',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 1.99, MW: 0.44, FT: 0.24, WW: 0.19, BS: 0.19 },
      stattrak: { FN: 4.43, MW: 1.01, FT: 0.32, WW: 0.50, BS: 0.36 }
    }
  },
  'skin_scar-20_trail_blazer': {
    id: 'skin_scar-20_trail_blazer',
    name: 'SCAR-20 | Trail Blazer',
    image: 'https://cdn.tradeit.gg/csgo%2FStatTrak-%20SCAR-20%20-%20Trail%20Blazer%20(Battle-Scarred)_240x152.webp',
    rarity: 'mil-spec',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 1.17, MW: 0.35, FT: 0.21, WW: 0.21, BS: 0.14 },
      stattrak: { FN: 1.46, MW: 0.55, FT: 0.27, WW: 0.54, BS: 0.25 }
    }
  },
  'skin_ssg_08_rapid_transit': {
    id: 'skin_ssg_08_rapid_transit',
    name: 'SSG 08 | Rapid Transit',
    image: 'https://cdn.tradeit.gg/csgo%2FStatTrak-%20SSG%2008%20-%20Rapid%20Transit%20(Battle-Scarred)_240x152.webp',
    rarity: 'restricted',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 8.87, MW: 3.40, FT: 1.09, WW: 1.75, BS: 1.24 },
      stattrak: { FN: 20.73, MW: 8.74, FT: 2.83, WW: 4.35, BS: 2.79 }
    }
  },
  'skin_ump-45_neo-noir': {
    id: 'skin_ump-45_neo-noir',
    name: 'UMP-45 | Neo-Noir',
    image: 'https://cdn.tradeit.gg/csgo%2FStatTrak-%20UMP-45%20-%20Neo-Noir%20(Battle-Scarred)_240x152.webp',
    rarity: 'classified',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 40.85, MW: 17.72, FT: 6.84, WW: 5.43, BS: 4.89 },
      stattrak: { FN: 55.60, MW: 25.23, FT: 12.46, WW: 8.99, BS: 8.57 }
    }
  },
  'skin_usp-s_27': {
    id: 'skin_usp-s_27',
    name: 'USP-S | 27',
    image: 'https://cdn.tradeit.gg/csgo%2FStatTrak-%20USP-S%20-%2027%20(Battle-Scarred)_240x152.webp',
    rarity: 'mil-spec',
    minFloat: 0.00,
    maxFloat: 1,
    prices: {
      normal: { FN: 6.94, MW: 0.49, FT: 0.23, WW: 0.23, BS: 0.22 },
      stattrak: { FN: 5.21, MW: 1.18, FT: 0.70, WW: 0.61, BS: 0.72 }
    }
  },
};