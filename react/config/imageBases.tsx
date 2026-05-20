export const IMAGE_BASES = {
  sweetSilverVr: 'https://stermax.com.br/images_idealine/vr-sweet-silver',
  roseGoldVr: 'https://stermax.com.br/images_idealine/rose-gold-360',
  rosaVr: 'https://stermax.com.br/images_idealine/rosa-360',
  perolaVr: 'https://stermax.com.br/images_idealine/perola-360',
  sweetBlackVr: 'https://stermax.com.br/images_idealine/sweet-black-360',
  drMarceloVr: 'https://stermax.com.br/images_idealine/drmarcelo-360',
  sweetPinkVr: 'https://stermax.com.br/images_idealine/sweet-pink-360',
  lilacVr: 'https://stermax.com.br/images_idealine/vr-lilac',
} as const

export type ImageBaseKey = keyof typeof IMAGE_BASES
