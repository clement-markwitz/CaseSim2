// Colors.ts
const tintColorLight = '#F5A623';
const tintColorDark = '#fff';

export const demoTheme = {
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
}
export const realTheme = {
  text: '#FFFFFF',
  text_secondary: '#A1A1AA', // Gris un peu plus clair et neutre
  text_muted: '#52525B',

  // Backgrounds "Obsidian" (Noir beaucoup plus profond que le mode Démo)
  background: '#09090B', // Presque noir pur
  background_secondary: '#18181B',
  background_elevated: '#27272A',
  background_card: '#1F1F22',

  // Accents "Casino / Real Money"
  tint: '#10B981', // Vert Émeraude vif
  tint_glow: 'rgba(16, 185, 129, 0.3)',

  // UI Elements
  tabIconDefault: '#27272A',
  tabIconSelected: '#10B981',

  // États (légèrement ajustés pour s'accorder au fond noir pur)
  success: '#059669',
  error: '#E11D48', // Un rouge un peu plus agressif (Rose/Rouge vif)
  warning: '#D97706',

  // Bordures
  border: '#3F3F46',
  border_light: 'rgba(255, 255, 255, 0.1)',

  // Gradients stops
  gradient_dark: '#09090B',
  gradient_mid: '#18181B',
}
// Raretés avec glow effects
export const colorRarity: Record<string, string> = {
  gold: 'rgba(218, 164, 2, 0.4)',
  Covert: 'rgba(235, 75, 75, 0.4)',
  Classified: 'rgba(211, 44, 230, 0.4)',
  Restricted: 'rgba(136, 71, 255, 0.4)',
  'Mil-Spec Grade': 'rgba(75, 105, 255, 0.4)',
  Industrial: 'rgba(94, 152, 217, 0.4)',
  Consumer: 'rgba(176, 195, 217, 0.4)',
};

export const colorRarityBar: Record<string, string> = {
  gold: '#FFD700',
  Covert: '#EB4B4B',
  Classified: '#D32CE6',
  Restricted: '#8847FF',
  'Mil-Spec Grade': '#4B69FF',
  'Industrial Grade': '#5E98D9',
  'Consumer Grade': '#B0C3D9',
};

export const colorRaritySolid: Record<string, string> = {
  gold: '#FFD700',
  Covert: '#EB4B4B',
  Classified: '#D32CE6',
  Restricted: '#8847FF',
  'Mil-Spec Grade': '#4B69FF',
  'Industrial Grade': '#5E98D9',
  'Consumer Grade': '#B0C3D9',
};
