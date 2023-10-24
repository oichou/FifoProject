// Fonction pour calculer les crédits de manière aléatoire entre 80% et 100%
export const calculateRandomCredits = (maxValue: number): number => {
  const randomPercentage = Math.random() * 20 + 80; // Génère un nombre aléatoire entre 80 et 100
  const calculatedValue = (randomPercentage / 100) * maxValue; // Calcule les crédits
  return Math.floor(calculatedValue); // Arrondit à un entier inférieur
};

// Fonction pour recalculer les crédits après 24 heures
export const recalculateCreditsAfter24Hours = (lastCalculationTime: Date, maxValue: number): any => {
  const currentTime = new Date();
  const timeDifference = (currentTime.getTime() - lastCalculationTime.getTime()) / (1000 * 3600); // Différence de temps en heures

  if (timeDifference >= 24) {
    return calculateRandomCredits(maxValue);
  } else {
    return null;
  }
};
