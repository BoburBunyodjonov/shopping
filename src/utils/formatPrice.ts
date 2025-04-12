export const formatPrice = (price: string): string => {
    const numberPrice = parseFloat(price);
    if (isNaN(numberPrice)) return price; // Agar narxni raqamga o‘zgartirib bo‘lmasa, o‘zini qaytaradi
    
    return new Intl.NumberFormat('uz-UZ', {
      minimumFractionDigits: 0, // Ikki o‘nlik raqamni ko‘rsatish
      maximumFractionDigits: 0, // Maksimal ikki o‘nlik raqam
    }).format(numberPrice);
  };
  