export const getEarning = (level: number) => {
  if (level === 1) return 10      // Seed
  if (level === 2) return 25      // Full
  if (level === 3) return 60      // Flagship
  return 0
}