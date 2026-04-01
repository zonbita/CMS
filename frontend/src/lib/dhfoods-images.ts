/**
 * Imagery served from the official Dh Foods site (https://www.dhfoods.com.vn/).
 * Used for demo parity with their public homepage; replace with your own assets for production.
 */
const BASE = "https://www.dhfoods.com.vn";

export const dhfoodsImages = {
  logo: `${BASE}/upload/trang-chu/Dh-Foods-Logo.png`,
  /** Homepage hero slide (kitchen / brand). */
  heroBanner: `${BASE}/upload/trang-chu/${encodeURIComponent("Banner Trang Chủ")}/Banner-Trang-Chu-Bat-Bep.webp`,
  /** Site background images used across homepage sections. */
  bgHomeSec2: `${BASE}/assets/img/bg_home_sec_2.jpg`,
  bgHome3: `${BASE}/assets/img/bg_home_3.jpg`,
  bgCookingBox: `${BASE}/assets/img/bg_cooking_box.jpg`,
  /** Homepage small food images. */
  recipeCanhChua: `${BASE}/upload/page/homepage/Hinh-Nho-Trang-Chu/Hinh-Trang-Chu-Canh-Chua.webp`,
  recipeKhoThitCa: `${BASE}/upload/page/homepage/Hinh-Nho-Trang-Chu/Hinh-Trang-Chu-Kho-Thit-Ca.webp`,
  /** Fallback illustration used on homepage. */
  homeSec5Img: `${BASE}/upload/page/homepage/home_sec_5_img.png`,
} as const;

/** Thumbnails aligned with the site mega-menu (paths under /products/...). */
export const productCategoryImages: Record<string, string> = {
  "/products/muoi-cham": `${BASE}/upload/Adapt_Language/ENG/Menu/Tay-ninh-Dipping-Salt-Thumb.png`,
  "/products/xot-cham": `${BASE}/upload/Adapt_Language/ENG/Menu/Dipping-Sauce-Thumb.png`,
  "/products/gia-vi-tu-nhien": `${BASE}/upload/Adapt_Language/ENG/Menu/Natural-Spice-Thumb.png`,
  "/products/gia-vi-hoan-chinh": `${BASE}/upload/menu/Gia-Vi-Hoan-Chinh.png`,
  "/products/gia-vi-nau-uop": `${BASE}/upload/Adapt_Language/ENG/Menu/Cooking-Marinating-Spice-Thumb.png`,
  "/products/sa-te": `${BASE}/upload/Adapt_Language/ENG/Menu/Sate-Thumb.png`,
  "/products/hop-qua": `${BASE}/upload/Hop-Qua-Gia-Vi/Hop-Go-Ngoai.webp`,
  "/products/trong-luong-lon": `${BASE}/upload/menu/San-Pham-Trong-Luong-Lon.png`,
  "/products/tu-gao": `${BASE}/upload/menu/San-pham-tu-gao.webp`,
};

export const pageHeroImages: Record<string, string> = {
  "/about": dhfoodsImages.bgHome3,
  "/cooperate": dhfoodsImages.bgHomeSec2,
  "/stores": dhfoodsImages.bgHomeSec2,
  "/recipes": dhfoodsImages.bgCookingBox,
  "/login": dhfoodsImages.bgHome3,
};
