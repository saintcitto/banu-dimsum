export function estimateCookingTime(cartItems) {
  const baseTime = 10;
  const perItem = 3;
  const total = baseTime + (cartItems.length * perItem);
  return total > 30 ? 30 : total;
}
