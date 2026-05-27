// tamagui.config.ts
import { createAnimations } from '@tamagui/animations-react-native';
import { defaultConfig } from '@tamagui/config/v5';
import { createTamagui } from 'tamagui';

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  animations: createAnimations({
    bouncy: {
      type: 'spring',
      damping: 10,
      mass: 0.9,
      stiffness: 100,
    },
    quick: {
      type: 'spring',
      damping: 20,
      mass: 1.2,
      stiffness: 250,
    },
    lazy: {
      type: 'spring',
      damping: 20,
      stiffness: 60,
    },
  })
});

// 💡 Petit bonus pour TypeScript : Ça permet à ton éditeur 
// de deviner toutes tes animations et couleurs quand tu codes !


export default tamaguiConfig;