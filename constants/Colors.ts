const tintColorLight = '#EEB400';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#F2F2F2',
    text_secondary: '#9EA1A6',
    background: '#181B1F',
    tint: tintColorLight,
    tabIconDefault: '#23262B',
    tabIconSelected: tintColorLight,
    hover: '#FFD700',
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
}
export const colorRarity: Record<string, string> = {
  gold: '#daa402ff',
  covert: '#b61d1dff',
  classified: '#ae10c0ff',
  restricted: '#4f15bbff',
  'mil-spec': '#072ef0ff',
};
export const colorRarityBar: Record<string, string> = {
  gold: '#ffcf40ff',
  covert: '#c93030ff',
  classified: '#cd5adaff',
  restricted: '#6737c0ff',
  'mil-spec': '#415bd8ff',
};