export const CARD_ANIM = {
  float: "card-float",
  floatSlow: "card-float-slow",
  sway: "card-sway",
} as const;

export function pickCardAnim(index: number) {
  const variants = [CARD_ANIM.float, CARD_ANIM.sway, CARD_ANIM.floatSlow];
  return variants[index % variants.length];
}

export function cardAnimDelay(index: number, step = 0.45) {
  return { animationDelay: `${(index * step).toFixed(2)}s` } as const;
}
