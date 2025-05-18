import Customer from "..";

type AllowedOrder = {
  glaze: boolean;
  topping: boolean;
  icing: boolean;
};

export default function canUseFavoriteOrders(
  favorites: Customer["favorite"],
  allowedOrders: AllowedOrder[],
  maxVariant: number,
): boolean {
  const allValid = favorites.every((fav) => {
    return allowedOrders.some((pattern) => {
      if (fav.glaze && !pattern.glaze) return false;
      if (fav.topping && !pattern.topping) return false;
      if (fav.icing && !pattern.icing) return false;
      return true;
    });
  });

  // Ensure total unique favorite variants <= maxVariant
  const unique = new Set(
    favorites.map((fav) => `${fav.glaze}|${fav.topping}|${fav.icing}`),
  );

  return allValid && unique.size <= maxVariant;
}
