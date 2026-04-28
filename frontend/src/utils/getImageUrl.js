export const getImageUrl = (image) => {
  if (!image) return "https://via.placeholder.com/300";

  if (image.startsWith('http')) return image;

  return `https://chefkart-api-90wb.onrender.com/uploads/dishes/${image}`;
};