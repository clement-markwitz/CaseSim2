// Colors.ts
const tintColorLight = '#F5A623';
const tintColorDark = '#fff';

export default {
  light: {
    // Couleurs principales
    text: '#FFFFFF',
    text_secondary: '#8A8D93',
    text_muted: '#5A5D63',

    // Backgrounds avec profondeur
    background: '#0D1117',
    background_secondary: '#161B22',
    background_elevated: '#21262D',
    background_card: '#1C2128',

    // Accents
    tint: tintColorLight,
    tint_glow: 'rgba(245, 166, 35, 0.3)',

    // UI Elements
    tabIconDefault: '#21262D',
    tabIconSelected: tintColorLight,

    // États
    success: '#2EA043',
    error: '#F85149',
    warning: '#D29922',

    // Bordures
    border: '#30363D',
    border_light: 'rgba(255, 255, 255, 0.1)',

    // Gradients stops
    gradient_dark: '#0D1117',
    gradient_mid: '#161B22',
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

// Raretés avec glow effects
export const colorRarity: Record<string, string> = {
  gold: 'rgba(218, 164, 2, 0.4)',
  covert: 'rgba(235, 75, 75, 0.4)',
  classified: 'rgba(211, 44, 230, 0.4)',
  restricted: 'rgba(136, 71, 255, 0.4)',
  'mil-spec': 'rgba(75, 105, 255, 0.4)',
  industrial: 'rgba(94, 152, 217, 0.4)',
  consumer: 'rgba(176, 195, 217, 0.4)',
};

export const colorRarityBar: Record<string, string> = {
  gold: '#FFD700',
  covert: '#EB4B4B',
  classified: '#D32CE6',
  restricted: '#8847FF',
  'mil-spec': '#4B69FF',
  industrial: '#5E98D9',
  consumer: '#B0C3D9',
};

export const colorRaritySolid: Record<string, string> = {
  gold: '#FFD700',
  covert: '#EB4B4B',
  classified: '#D32CE6',
  restricted: '#8847FF',
  'mil-spec': '#4B69FF',
  industrial: '#5E98D9',
  consumer: '#B0C3D9',
};
