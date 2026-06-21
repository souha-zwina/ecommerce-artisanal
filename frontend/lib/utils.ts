export const capitalizeFirstLetter = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatPrice = (price: number) =>
  `${price.toFixed(2)} MAD`;

export const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case "DELIVERED": return "#10B981";
    case "SHIPPED":   return "#3B82F6";
    case "CONFIRMED": return "#1DB954";
    case "PENDING":   return "#F59E0B";
    case "CANCELLED": return "#EF4444";
    default:          return "#666";
  }
};
