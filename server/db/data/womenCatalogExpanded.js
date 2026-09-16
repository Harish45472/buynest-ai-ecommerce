// BUYNEST Expanded Women's Catalog (530 Diverse Items)
// Covering Dresses (65), Tops (60), Jeans (55), Kurtis (60), Sarees (60), Ethnic Wear Sets (60), Heels (30), Sandals (30), Handbags (55), Watches (18), Sunglasses (17), Jewellery (20)

const dresses = [
  // Maxi Dresses (1-7)
  { b: 'Zara', n: 'Women\'s Tiered Printed Crinkled Chiffon Maxi Dress', p: 3590, m: 5590 },
  { b: 'Mango', n: 'Women\'s Flared Satin Finish Slit Hem Evening Maxi Dress', p: 4990, m: 7990 },
  { b: 'Vero Moda', n: 'Women\'s Floral Print Smocked Bodice Sleeveless Maxi', p: 2499, m: 4299 },
  { b: 'AND', n: 'Women\'s Solid Georgette Cape Sleeve Flared Maxi Gown', p: 2999, m: 4999 },
  { b: 'Forever New', n: 'Women\'s Porcelain Floral Wrap Belted Tiered Maxi Dress', p: 5800, m: 8500 },
  { b: 'H&M', n: 'Women\'s Voluminous Puff Sleeve Pure Cotton Poplin Maxi', p: 2699, m: 3999 },
  { b: 'Global Desi', n: 'Women\'s Bohemian Embroidered Yoke Slit Hem Maxi Dress', p: 2299, m: 3999 },

  // Midi Dresses (8-14)
  { b: 'Forever 21', n: 'Women\'s Sweetheart Neck Ditsy Floral Smocked Midi Dress', p: 1599, m: 2699 },
  { b: 'Vero Moda', n: 'Women\'s Polka Dot Fit & Flare Ruffle Trim Midi Dress', p: 2199, m: 3699 },
  { b: 'ONLY', n: 'Women\'s Ribbed Knit Side Slit Long Sleeve Midi Dress', p: 1899, m: 3199 },
  { b: 'Marks & Spencer', n: 'Women\'s Pure Linen Square Neck Tiered Midi Dress', p: 3499, m: 4999 },
  { b: 'Harpa', n: 'Women\'s Floral Print Empire Cut Flared Crepe Midi Dress', p: 1099, m: 2499 },
  { b: 'Madame', n: 'Women\'s Pleated Georgette Belted Fit & Flare Midi Dress', p: 1799, m: 3299 },
  { b: 'Zara', n: 'Women\'s Draped Halter Neck Satin Slip Midi Cocktail Dress', p: 3990, m: 5990 },

  // Mini Dresses (15-21)
  { b: 'Forever 21', n: 'Women\'s Ruched Mesh Halter Neck Party Mini Dress', p: 1299, m: 2299 },
  { b: 'Zara', n: 'Women\'s Textured Bouclé Tweed Contrast Button Mini Dress', p: 3790, m: 5990 },
  { b: 'H&M', n: 'Women\'s Sweetheart Neck Puff Sleeve Linen Blend Mini Dress', p: 1999, m: 2999 },
  { b: 'ONLY', n: 'Women\'s Smocked Waist Ruffled Tiered Floral Mini Dress', p: 1499, m: 2799 },
  { b: 'Urbanic', n: 'Women\'s Retro Plaid Square Neck A-Line Mini Dress', p: 1199, m: 2199 },
  { b: 'Bershka', n: 'Women\'s Ribbed Corset Seamed Stretch Cotton Mini Dress', p: 1690, m: 2890 },
  { b: 'Mango', n: 'Women\'s Polka Dot Asymmetric Hem Georgette Mini Dress', p: 2990, m: 4990 },

  // Bodycon Dresses (22-28)
  { b: 'H&M', n: 'Women\'s Heavy Rib-Knit High Neck Sleeveless Bodycon Dress', p: 1499, m: 2299 },
  { b: 'Zara', n: 'Women\'s Seamless Sculpt Asymmetric One-Shoulder Bodycon', p: 2490, m: 3990 },
  { b: 'Forever 21', n: 'Women\'s Glitter Lurex Cut-Out Back Cocktail Bodycon Dress', p: 1699, m: 2999 },
  { b: 'Vero Moda', n: 'Women\'s Solid Square Neck Long Sleeve Ribbed Knit Bodycon', p: 1899, m: 3299 },
  { b: 'ONLY', n: 'Women\'s Striped Cotton Blend Casual Everyday Bodycon Dress', p: 1199, m: 2299 },
  { b: 'Tokyo Talkies', n: 'Women\'s Front Ruching Spaghetti Strap Velvet Party Bodycon', p: 899, m: 1899 },
  { b: 'Forever New', n: 'Women\'s Embellished Pearl Neckline Bandage Bodycon Dress', p: 4800, m: 7200 },

  // A-Line Dresses (29-34)
  { b: 'Vero Moda', n: 'Women\'s Classic Button-Down Collared A-Line Summer Dress', p: 2299, m: 3799 },
  { b: 'Marks & Spencer', n: 'Women\'s Geometric Print Belted Viscose A-Line Dress', p: 2999, m: 4499 },
  { b: 'AND', n: 'Women\'s Minimalist Round Neck Contrast Trim A-Line Dress', p: 1999, m: 3499 },
  { b: 'Harpa', n: 'Women\'s Vintage Floral Bell Sleeve Crepe A-Line Dress', p: 999, m: 2199 },
  { b: 'Fabindia', n: 'Women\'s Handblock Dabu Print Pure Cotton A-Line Dress', p: 2190, m: 3290 },
  { b: 'Madame', n: 'Women\'s Colorblock Pleated Hem Casual A-Line Dress', p: 1599, m: 2899 },

  // Wrap Dresses (35-40)
  { b: 'Zara', n: 'Women\'s Floral Jacquard Tie-Up Waist Satin Wrap Dress', p: 3290, m: 4990 },
  { b: 'Mango', n: 'Women\'s V-Neck Surplice Ruffle Hem Crepe Wrap Dress', p: 3990, m: 5990 },
  { b: 'Vero Moda', n: 'Women\'s Polka Dot Flutter Sleeve True Wrap Dress', p: 1999, m: 3499 },
  { b: 'H&M', n: 'Women\'s Breathable Lyocell Blend Collared Wrap Dress', p: 2299, m: 3299 },
  { b: 'AND', n: 'Women\'s Abstract Print Kimono Sleeve Faux Wrap Dress', p: 2499, m: 3999 },
  { b: 'Forever 21', n: 'Women\'s Satin Bishop Sleeve Surplice Evening Wrap Dress', p: 1899, m: 3199 },

  // Shirt Dresses (41-46)
  { b: 'Marks & Spencer', n: 'Women\'s Pure Cotton Utility Safari Belted Shirt Dress', p: 3299, m: 4999 },
  { b: 'H&M', n: 'Women\'s Oversized Poplin Oxford Collar Casual Shirt Dress', p: 1999, m: 2999 },
  { b: 'Vero Moda', n: 'Women\'s Yarn-Dyed Striped Belted Linen Blend Shirt Dress', p: 2499, m: 4199 },
  { b: 'Tommy Hilfiger', n: 'Women\'s Monogram Embroidered Polo Collar Shirt Dress', p: 5499, m: 8999 },
  { b: 'Zara', n: 'Women\'s Pleated Hem Crisp Poplin Structured Shirt Dress', p: 3790, m: 5590 },
  { b: 'ONLY', n: 'Women\'s Washed Tencel Denim Button-Through Shirt Dress', p: 2199, m: 3699 },

  // Floral Dresses (47-53)
  { b: 'Forever 21', n: 'Women\'s French Meadow Ditsy Floral Smocked Skater Dress', p: 1399, m: 2499 },
  { b: 'Berrylush', n: 'Women\'s Botanical Print Slit Hem Ruffled Chiffon Dress', p: 1199, m: 2399 },
  { b: 'Forever New', n: 'Women\'s Wildflower Meadow Silk Blend Romantic Tea Dress', p: 5200, m: 7800 },
  { b: 'Vero Moda', n: 'Women\'s Watercolor Floral Sweetheart Tiered Sun Dress', p: 2299, m: 3899 },
  { b: 'Harpa', n: 'Women\'s Pastel Peony Print Flared Georgette Day Dress', p: 1049, m: 2299 },
  { b: 'Mango', n: 'Women\'s Mediterranean Floral Print Halter Neck Flared Dress', p: 4490, m: 6990 },
  { b: 'ONLY', n: 'Women\'s Daisy Print Puff Sleeve Square Neck Summer Dress', p: 1699, m: 2999 },

  // Party & Evening Dresses (54-59)
  { b: 'Zara', n: 'Women\'s Shimmer Sequined V-Back Cocktail Party Dress', p: 4590, m: 6990 },
  { b: 'Forever New', n: 'Women\'s Lurex Shimmer Bardot Evening Ball Gown', p: 6999, m: 10500 },
  { b: 'Mango', n: 'Women\'s Metallic Thread Asymmetrical Hem Party Dress', p: 5490, m: 8490 },
  { b: 'Madame', n: 'Women\'s Velvet Jacquard Embroidered Evening Midi Dress', p: 2799, m: 4999 },
  { b: 'RSVP by Nykaa', n: 'Women\'s Glitz Liquid Foil Plunge Neck Maxi Party Dress', p: 3499, m: 5999 },
  { b: 'Lipsy London', n: 'Women\'s Embroidered Lace Mesh Overlay Gala Dress', p: 7499, m: 11999 },

  // Office & Co-ord Work Dresses (60-65)
  { b: 'Marks & Spencer', n: 'Women\'s Tailored Houndstooth Check Sheath Work Dress', p: 3799, m: 5499 },
  { b: 'Allen Solly Woman', n: 'Women\'s Smart Crease-Resistant Belted Formal Dress', p: 2199, m: 3499 },
  { b: 'Van Heusen Woman', n: 'Women\'s Colorblock Notch Collar Business Shift Dress', p: 2499, m: 3999 },
  { b: 'AND', n: 'Women\'s High-Neck Keyhole Structured Formal Work Dress', p: 2299, m: 3799 },
  { b: 'Zara', n: 'Women\'s Double-Breasted Sleeveless Blazer Tuxedo Dress', p: 4290, m: 6590 },
  { b: 'Mango', n: 'Women\'s Prince of Wales Check Tailored Pencil Sheath Dress', p: 4990, m: 7590 },
  { b: 'Trendyol', n: 'Women\'s Floral Wrap Front Puff Sleeve Midi Dress', p: 1899, m: 3499 },
  { b: 'Trendyol', n: 'Women\'s Ribbed Knit Bodycon Slit Hem Evening Dress', p: 1499, m: 2799 },
  { b: 'DressBerry', n: 'Women\'s Polka Dot Fit & Flare Ruffled Summer Dress', p: 999, m: 2199 },
  { b: 'DressBerry', n: 'Women\'s Empire Cut Ditsy Floral Tiered Midi Dress', p: 1199, m: 2499 }
];

const tops = [
  // Crop Tops (1-7)
  { b: 'ONLY', n: 'Women\'s Schiffli Embroidered Pure Cotton Smocked Crop Top', p: 899, m: 1799 },
  { b: 'Forever 21', n: 'Women\'s Ribbed Seamless Square Neck Fitted Crop Top', p: 499, m: 999 },
  { b: 'H&M', n: 'Women\'s Sweetheart Neck Linen Blend Tie-Front Crop Top', p: 999, m: 1599 },
  { b: 'Zara', n: 'Women\'s Ruched Satin Corset Style Bustier Crop Top', p: 1890, m: 2990 },
  { b: 'Urbanic', n: 'Women\'s Knitted Halter Neck Striped Retro Crop Top', p: 699, m: 1299 },
  { b: 'Roadster', n: 'Women\'s Washed Cotton Raw Cut Hem Casual Boxy Crop Top', p: 449, m: 899 },
  { b: 'SASSAFRAS', n: 'Women\'s Puff Sleeve Shirred Bodice Ditsy Crop Top', p: 599, m: 1399 },

  // Peplum Tops (8-13)
  { b: 'Vero Moda', n: 'Women\'s Floral Print Wrap Neckline Chiffon Peplum Top', p: 1299, m: 2299 },
  { b: 'Madame', n: 'Women\'s Smocked Waist Tiered Flutter Sleeve Peplum Top', p: 999, m: 1899 },
  { b: 'AND', n: 'Women\'s Solid Georgette Mandarin Collar Formal Peplum Top', p: 1499, m: 2499 },
  { b: 'Marks & Spencer', n: 'Women\'s Pure Linen Flared Hem Buttoned Peplum Top', p: 1999, m: 3199 },
  { b: 'ONLY', n: 'Women\'s Broderie Anglaise Cotton Flared Peplum Top', p: 1199, m: 2199 },
  { b: 'Harpa', n: 'Women\'s Polka Dot Belted Bishop Sleeve Crepe Peplum Top', p: 799, m: 1699 },

  // Tank Tops & Camis (14-19)
  { b: 'H&M', n: 'Women\'s Ribbed Organic Cotton Fitted Racerback Tank Top', p: 499, m: 799 },
  { b: 'Uniqlo', n: 'Women\'s AIRism Seamless Moisture-Wicking Camisole Top', p: 990, m: 1490 },
  { b: 'Zara', n: 'Women\'s Cowl Neck Spun Silk Blend Slip Cami Top', p: 1490, m: 2290 },
  { b: 'Forever 21', n: 'Women\'s Rib-Knit High Neck Sleeveless Basic Tank', p: 399, m: 799 },
  { b: 'Marks & Spencer', n: 'Women\'s Pure Cotton Modal Blend Soft Touch Scoop Tank', p: 799, m: 1299 },
  { b: 'SASSAFRAS', n: 'Women\'s Cut-Out Back Stretch Ribbed Cropped Tank', p: 449, m: 899 },

  // Tunics (20-25)
  { b: 'Fabindia', n: 'Women\'s Handblock Kalamkari Printed Cotton High-Low Tunic', p: 1490, m: 2290 },
  { b: 'Global Desi', n: 'Women\'s Geometric Embroidered Bohemian Flared Tunic', p: 1299, m: 2499 },
  { b: 'W for Woman', n: 'Women\'s Mandarin Collar Yoke Embroidered Poly-Silk Tunic', p: 1699, m: 2799 },
  { b: 'Aurelia', n: 'Women\'s Solid Rayon Pintuck Detail Straight Tunic Top', p: 899, m: 1599 },
  { b: 'Biba', n: 'Women\'s Chanderi Gold Foil Print Festive Fusion Tunic', p: 1799, m: 3199 },
  { b: 'AND', n: 'Women\'s Asymmetric Hemline Striped Georgette Office Tunic', p: 1599, m: 2699 },

  // Casual Shirts & Shackets (26-31)
  { b: 'Levi\'s', n: 'Women\'s Relaxed Classic Cotton Denim Button-Down Shirt', p: 2199, m: 3499 },
  { b: 'H&M', n: 'Women\'s Oversized Brushed Cotton Flannel Checked Shacket', p: 2299, m: 3499 },
  { b: 'Marks & Spencer', n: 'Women\'s Pure Irish Linen Relaxed Everyday Casual Shirt', p: 2999, m: 4299 },
  { b: 'Vero Moda', n: 'Women\'s Vertical Stripe Cotton Poplin Boyfriend Shirt', p: 1799, m: 2999 },
  { b: 'Roadster', n: 'Women\'s Buffalo Plaid Distressed Hem Denim Shacket', p: 1299, m: 2399 },
  { b: 'ONLY', n: 'Women\'s Tencel Soft Fluid Drop Shoulder Casual Shirt', p: 1699, m: 2899 },

  // Formal Work Shirts (32-37)
  { b: 'Marks & Spencer', n: 'Women\'s Non-Iron Tailored Cotton Stretch Work Shirt', p: 2499, m: 3699 },
  { b: 'Allen Solly Woman', n: 'Women\'s Crisp Formal Spread Collar Poplin Work Shirt', p: 1499, m: 2399 },
  { b: 'Van Heusen Woman', n: 'Women\'s Anti-Stain Wrinkle-Resistant Business Shirt', p: 1699, m: 2699 },
  { b: 'Zara', n: 'Women\'s Satin Touch Hidden Placket Smart Executive Shirt', p: 2590, m: 3990 },
  { b: 'Arrow Woman', n: 'Women\'s Premium Supima Cotton Pinpoint Formal Shirt', p: 1899, m: 2999 },
  { b: 'Park Avenue Woman', n: 'Women\'s Point Collar Contrast Trim Smart Formal Shirt', p: 1399, m: 2299 },

  // Blouses (38-43)
  { b: 'Vero Moda', n: 'Women\'s Tiered Bell Sleeve Sheer Chiffon Printed Blouse', p: 1599, m: 2799 },
  { b: 'Mango', n: 'Women\'s Ruffled V-Neck Bow Tie Neck Satin Elegant Blouse', p: 3290, m: 4990 },
  { b: 'AND', n: 'Women\'s Keyhole Tie-Up Pleated Georgette Party Blouse', p: 1699, m: 2799 },
  { b: 'Zara', n: 'Women\'s Lace Inset High Collar Victorian Romantic Blouse', p: 2990, m: 4590 },
  { b: 'Forever New', n: 'Women\'s Organza Puff Sleeve Sweetheart Neck Work Blouse', p: 3800, m: 5500 },
  { b: 'Marks & Spencer', n: 'Women\'s Pure Silk Touch Crepe Floral Evening Blouse', p: 2799, m: 4199 },

  // Off-Shoulder & Bardot Tops (44-49)
  { b: 'Forever 21', n: 'Women\'s Elasticated Smocked Bardot Neckline Floral Top', p: 999, m: 1799 },
  { b: 'Urbanic', n: 'Women\'s Asymmetrical Single Off-Shoulder Knit Crop Top', p: 799, m: 1499 },
  { b: 'Vero Moda', n: 'Women\'s Ruffled Tiered Off-Shoulder Summer Chiffon Top', p: 1399, m: 2399 },
  { b: 'ONLY', n: 'Women\'s Ribbed Foldover Bardot Long Sleeve Evening Top', p: 1199, m: 2199 },
  { b: 'Tokyo Talkies', n: 'Women\'s Solid Elasticated Flounce Off-Shoulder Top', p: 599, m: 1299 },
  { b: 'Madame', n: 'Women\'s Embroidered Sleeve Eyelet Cotton Bardot Top', p: 1299, m: 2299 },

  // Oversized Streetwear Graphic Tees (50-55)
  { b: 'H&M', n: 'Women\'s Vintage Rock Band Washed Oversized Cotton Tee', p: 1299, m: 1999 },
  { b: 'Bewakoof', n: 'Women\'s Anime Graphic Heavyweight Cotton Oversized Tee', p: 599, m: 1199 },
  { b: 'The Souled Store', n: 'Women\'s Pop Art Aesthetic Drop Shoulder Baggy Tee', p: 799, m: 1499 },
  { b: 'Bonkers Corner', n: 'Women\'s Acid Wash Streetwear Heavy Combed Cotton Tee', p: 899, m: 1699 },
  { b: 'Urbanic', n: 'Women\'s Typography Back Print Boxy Oversized Street Tee', p: 699, m: 1399 },
  { b: 'Roadster', n: 'Women\'s Distressed Heritage California Washed Boyfriend Tee', p: 549, m: 999 },

  // Printed & Floral Day Tops (56-60)
  { b: 'Berrylush', n: 'Women\'s Ditsy Floral Smocked Square Neck Peasant Top', p: 799, m: 1599 },
  { b: 'Harpa', n: 'Women\'s Pastel Floral Keyhole Neck Crepe Casual Day Top', p: 649, m: 1399 },
  { b: 'ONLY', n: 'Women\'s Polka Dot Ruffle Sleeveless Chiffon Daily Top', p: 999, m: 1899 },
  { b: 'Vero Moda', n: 'Women\'s Botanical Leaf Print Split Neck Fluid Top', p: 1199, m: 2199 },
  { b: 'Forever 21', n: 'Women\'s Daisy Print Tie-Front Flutter Sleeve Summer Top', p: 899, m: 1599 },
  { b: 'Trendyol', n: 'Women\'s Square Neck Smocked Waist Peplum Top', p: 1099, m: 1999 },
  { b: 'Trendyol', n: 'Women\'s Satin Bishop Sleeve Tie-Neck Elegant Blouse', p: 1399, m: 2499 },
  { b: 'Style Quotient', n: 'Women\'s Formal Mandarin Collar Pin-Tuck Work Top', p: 899, m: 1699 },
  { b: 'Style Quotient', n: 'Women\'s Tiered Ruffle Georgette Office Blouse', p: 999, m: 1899 }
];

const jeans = [
  // Skinny Fit Jeans (1-7)
  { b: 'Levi\'s', n: 'Women\'s 711 High-Stretch Mid-Rise Skinny Jeans', p: 2499, m: 3999 },
  { b: 'Levi\'s', n: 'Women\'s 721 High-Rise Vintage Distressed Skinny Jeans', p: 2999, m: 4599 },
  { b: 'Vero Moda', n: 'Women\'s Tanya Powerstretch Super Skinny Clean Jeans', p: 1899, m: 3299 },
  { b: 'ONLY', n: 'Women\'s Blush Pink Washed High-Waist Skinny Jeans', p: 1699, m: 2999 },
  { b: 'Kraus Jeans', n: 'Women\'s Ankle-Length Dark Indigo 4-Way Stretch Jeans', p: 1499, m: 2495 },
  { b: 'Pepe Jeans', n: 'Women\'s Soho Mid-Rise Dark Wash Contoured Skinny Jeans', p: 2299, m: 3999 },
  { b: 'Spykar', n: 'Women\'s Sculpting Lift Clean Black High Waist Jeans', p: 1799, m: 3199 },

  // Straight Leg Jeans (8-13)
  { b: 'Levi\'s', n: 'Women\'s Classic Straight Leg Authentic Rigid Cotton Denim', p: 2799, m: 4299 },
  { b: 'H&M', n: 'Women\'s Vintage Straight High Waist Organic Denim Jeans', p: 1999, m: 2999 },
  { b: 'Zara', n: 'Women\'s Clean Cut Mid-Blue High Waist Straight Jeans', p: 2990, m: 4590 },
  { b: 'Marks & Spencer', n: 'Women\'s Magic Shaping Straight Leg Bi-Stretch Jeans', p: 3299, m: 4999 },
  { b: 'Kraus Jeans', n: 'Women\'s Slit Hem Ankle Grazing Straight Blue Jeans', p: 1599, m: 2695 },
  { b: 'ONLY', n: 'Women\'s Off-White Ecru Raw Cotton High-Rise Straight Jeans', p: 1999, m: 3499 },

  // Mom Fit Jeans (14-19)
  { b: 'Vero Moda', n: 'Women\'s High-Rise Vintage Acid Wash Mom Jeans', p: 2199, m: 3699 },
  { b: 'Zara', n: 'Women\'s The 90s Mom High Waist Heavyweight Rigid Jeans', p: 2890, m: 4290 },
  { b: 'H&M', n: 'Women\'s Ankle-Length Washed Grey Tapered Mom Fit Jeans', p: 1899, m: 2799 },
  { b: 'Mango', n: 'Women\'s Organic Cotton Slouchy Relaxed Mom Jeans', p: 3490, m: 5290 },
  { b: 'ONLY', n: 'Women\'s Classic Light Blue Retro Stone-Washed Mom Jeans', p: 1799, m: 3199 },
  { b: 'Flying Machine', n: 'Women\'s Distressed Ripped Knee Relaxed Mom Jeans', p: 1499, m: 2699 },

  // Boyfriend Jeans (20-25)
  { b: 'Flying Machine', n: 'Women\'s Slouchy Distressed Raw Hem Boyfriend Jeans', p: 1599, m: 2799 },
  { b: 'Levi\'s', n: 'Women\'s Slouchy Boyfriend Low-Slung Light Stonewash Jeans', p: 3199, m: 4999 },
  { b: 'Roadster', n: 'Women\'s Relaxed Drop Crotch Patchwork Boyfriend Jeans', p: 1199, m: 2299 },
  { b: 'Urbanic', n: 'Women\'s Contrast Stitch Mid-Rise Loose Boyfriend Denim', p: 1399, m: 2399 },
  { b: 'ONLY', n: 'Women\'s Soft Drape Tencel Blend Relaxed Boyfriend Jeans', p: 1999, m: 3299 },
  { b: 'Vero Moda', n: 'Women\'s Cuffed Hem Bleached Vintage Boyfriend Jeans', p: 2099, m: 3499 },

  // Wide Leg Jeans (26-31)
  { b: 'ONLY', n: 'Women\'s High Waist Parallel Wide Leg Indigo Denim', p: 2199, m: 3699 },
  { b: 'Zara', n: 'Women\'s Full Length Extra Wide Leg Marine Denim Trousers', p: 3590, m: 5490 },
  { b: 'Vero Moda', n: 'Women\'s Super High-Waist Fluid Drape Wide Leg Jeans', p: 2299, m: 3799 },
  { b: 'Freakins', n: 'Women\'s Carpenter Loop Utility High Rise Wide Leg Jeans', p: 1499, m: 2799 },
  { b: 'H&M', n: 'Women\'s Floor-Sweeping Wide Leg Light Indigo Cotton Jeans', p: 2299, m: 3299 },
  { b: 'Mango', n: 'Women\'s Sailor Button Front Raw Edge Wide Leg Jeans', p: 3990, m: 5990 },

  // Bootcut Jeans (32-37)
  { b: 'Levi\'s', n: 'Women\'s 725 High-Rise Bootcut Contoured Denim Jeans', p: 2999, m: 4799 },
  { b: 'Pepe Jeans', n: 'Women\'s New Brooke Mid-Rise Flare Bootcut Stretch Jeans', p: 2499, m: 4199 },
  { b: 'Kraus Jeans', n: 'Women\'s Slender Fit Dark Rinse Ankle Bootcut Jeans', p: 1699, m: 2795 },
  { b: 'Wrangler', n: 'Women\'s Retro High-Rise Stretch Cotton Bootcut Jeans', p: 2199, m: 3799 },
  { b: 'Flying Machine', n: 'Women\'s Clean Look Medium Blue Classic Bootcut Jeans', p: 1599, m: 2799 },
  { b: 'Spykar', n: 'Women\'s Curve Hugging Flare Bottom Tinted Bootcut Jeans', p: 1899, m: 3299 },

  // Flared Jeans (38-43)
  { b: 'ONLY', n: 'Women\'s 70s Retro High-Rise Dramatic Bell Bottom Flare Jeans', p: 2299, m: 3799 },
  { b: 'Freakins', n: 'Women\'s Split Ankle Vintage Washed Flared Denim Pants', p: 1599, m: 2899 },
  { b: 'Vero Moda', n: 'Women\'s Clean Black High Waist Power Flared Trousers', p: 2199, m: 3599 },
  { b: 'Urbanic', n: 'Women\'s Criss Cross Waistband Distressed Flare Jeans', p: 1499, m: 2499 },
  { b: 'Kraus Jeans', n: 'Women\'s Sculpt Stretch Fitted Knee Bell Flare Jeans', p: 1799, m: 2995 },
  { b: 'Pepe Jeans', n: 'Women\'s Dionysus High Rise Vintage Flared Leg Jeans', p: 2699, m: 4499 },

  // Baggy & Skater Jeans (44-49)
  { b: 'H&M', n: 'Women\'s Baggy Ultra Loose High Waist Streetwear Jeans', p: 2299, m: 3499 },
  { b: 'Freakins', n: 'Women\'s Multi-Pocket Oversized Skater Baggy Denim', p: 1699, m: 2999 },
  { b: 'Off Duty', n: 'Women\'s Korean Style Loose Fit Dropped Crotch Baggy Jeans', p: 1890, m: 3190 },
  { b: 'Bewakoof', n: 'Women\'s Neutral Stone Washed Everyday Loose Baggy Jeans', p: 1299, m: 2499 },
  { b: 'Bershka', n: 'Women\'s Carpenter Baggy Denim with Contrast Hammer Loop', p: 2490, m: 3890 },
  { b: 'Urbanic', n: 'Women\'s Two-Tone Dual Colorblock Baggy Skater Jeans', p: 1599, m: 2799 },

  // High-Waist Sculpt Jeans (50-55)
  { b: 'Levi\'s', n: 'Women\'s Mile High Super Skinny Ultra High-Rise Jeans', p: 3299, m: 4999 },
  { b: 'Marks & Spencer', n: 'Women\'s Magic 360 Tummy Tuck Sculpt Slim Jeans', p: 3599, m: 5499 },
  { b: 'Vero Moda', n: 'Women\'s High-Rise Shaping Denim with Elastic Contoured Waist', p: 2399, m: 3999 },
  { b: 'Kraus Jeans', n: 'Women\'s Triple Button High Waist Body Contouring Jeans', p: 1699, m: 2895 },
  { b: 'Spykar', n: 'Women\'s Flex-Fit Sculpting Clean Jet Black Denim Jeans', p: 1999, m: 3499 },
  { b: 'Pepe Jeans', n: 'Women\'s Soho High Waist Power Stretch Sculpt Jeans', p: 2799, m: 4499 }
];

const kurtis = [
  // Straight Kurtis (1-7)
  { b: 'Biba', n: 'Women\'s Floral Printed Mandarin Collar Straight Cotton Kurti', p: 1299, m: 2499 },
  { b: 'Libas', n: 'Women\'s Geometric Yoke Threadwork Pure Rayon Straight Kurti', p: 799, m: 1899 },
  { b: 'Aurelia', n: 'Women\'s Foil Printed Keyhole Neck Side Slit Daily Kurti', p: 899, m: 1699 },
  { b: 'W for Woman', n: 'Women\'s Silk Blend Chanderi Straight Kurti with Tassels', p: 1899, m: 2999 },
  { b: 'Anubhutee', n: 'Women\'s Indigo Dabu Handblock Printed Pure Cotton Kurti', p: 699, m: 1599 },
  { b: 'Janasya', n: 'Women\'s Gold Printed Poly Crepe Daily Wear Straight Kurti', p: 599, m: 1399 },
  { b: 'Fabindia', n: 'Women\'s Handwoven Khadi Cotton Casual Work Straight Kurti', p: 1690, m: 2490 },

  // Anarkali Kurtis (8-14)
  { b: 'Biba', n: 'Women\'s Tiered Flared Pure Cotton Anarkali Festive Kurti', p: 2499, m: 4299 },
  { b: 'Soch', n: 'Women\'s Zari Threadwork Georgette Floor Length Anarkali Kurti', p: 2898, m: 4698 },
  { b: 'Libas', n: 'Women\'s Floral Print Gotta Patti Embellished Anarkali Kurti', p: 1499, m: 2999 },
  { b: 'Sangria', n: 'Women\'s Angrakha Neck Bandhej Printed Flared Anarkali Kurti', p: 1399, m: 2799 },
  { b: 'Janasya', n: 'Women\'s Foil Printed Poly Silk Festive Party Flared Kurti', p: 1199, m: 2499 },
  { b: 'Aurelia', n: 'Women\'s Layered Chiffon Yoke Flared Festive Anarkali Kurti', p: 1799, m: 3199 },
  { b: 'W for Woman', n: 'Women\'s Brocade Yoke Floor Sweeping Festive Anarkali', p: 3299, m: 5499 },

  // A-Line Kurtis (15-21)
  { b: 'Aurelia', n: 'Women\'s Botanical Leaf Printed Rayon Flared A-Line Kurti', p: 999, m: 1899 },
  { b: 'Global Desi', n: 'Women\'s Boho Geometric Print High-Low Flared A-Line Kurti', p: 1499, m: 2699 },
  { b: 'Fabindia', n: 'Women\'s Kalamkari Block Print Pure Cambric Cotton A-Line Kurti', p: 1890, m: 2790 },
  { b: 'Biba', n: 'Women\'s Embroidered Mandarin Collar Rayon A-Line Daily Kurti', p: 1399, m: 2499 },
  { b: 'Libas', n: 'Women\'s Ajrakh Print Front Slit Flared Casual A-Line Kurti', p: 899, m: 1999 },
  { b: 'W for Woman', n: 'Women\'s Pleated Front Button Detail Semi-Formal A-Line Kurti', p: 1599, m: 2699 },
  { b: 'Vishudh', n: 'Women\'s Solid Slub Rayon Pintuck Contrast Placket A-Line Kurti', p: 649, m: 1499 },

  // Printed Daily Wear Kurtis (22-28)
  { b: 'Janasya', n: 'Women\'s Polka Dot Crepe Round Neck Everyday Casual Kurti', p: 549, m: 1299 },
  { b: 'Anubhutee', n: 'Women\'s Jaipuri Floral Print Breathable Summer Cotton Kurti', p: 699, m: 1499 },
  { b: 'Avaasa Mix N Match', n: 'Women\'s Chevron Striped Cotton Daily Office Kurti', p: 499, m: 999 },
  { b: 'Libas', n: 'Women\'s Mughal Motif Printed 100% Pure Cambric Cotton Kurti', p: 799, m: 1799 },
  { b: 'Fabindia', n: 'Women\'s Bagru Indigo Handblock Pure Muslin Soft Kurti', p: 1590, m: 2390 },
  { b: 'Sangria', n: 'Women\'s Ikat Geometric Print Cotton Notch Collar Kurti', p: 749, m: 1599 },
  { b: 'Aurelia', n: 'Women\'s Floral Spray Printed Soft Cotton Daily Slit Kurti', p: 849, m: 1699 },

  // Embroidered & Festive Kurtis (29-35)
  { b: 'Soch', n: 'Women\'s Lucknowi Chikankari Hand Embroidered Georgette Kurti', p: 2498, m: 3998 },
  { b: 'Biba', n: 'Women\'s Heavy Zari Mirror Work Festive Chanderi Kurti', p: 2799, m: 4999 },
  { b: 'House of Pataudi', n: 'Women\'s Jashn Zardozi Embroidered Silk Blend Kurti', p: 2699, m: 4499 },
  { b: 'Libas', n: 'Women\'s Resham Threadwork Velvet Winter Festive Party Kurti', p: 1899, m: 3699 },
  { b: 'Kalki Fashion', n: 'Women\'s Sequined Yoke Cutwork Hem Georgette Party Kurti', p: 3499, m: 5999 },
  { b: 'W for Woman', n: 'Women\'s Golden Mukaish Work Chanderi High-Neck Kurti', p: 2199, m: 3699 },
  { b: 'Global Desi', n: 'Women\'s Mirror Embellished Fusion Festive Tunic Kurti', p: 1699, m: 2999 },

  // Rayon & Slub Daily Kurtis (36-41)
  { b: 'Vishudh', n: 'Women\'s Solid Breathable Rayon Roll-Up Sleeve Daily Kurti', p: 499, m: 1199 },
  { b: 'Anubhutee', n: 'Women\'s Flared Rayon Printed Casual Everyday Slit Kurti', p: 599, m: 1399 },
  { b: 'Janasya', n: 'Women\'s Dual Tone Slub Rayon Button Down Office Kurti', p: 649, m: 1499 },
  { b: 'Rain & Rainbow', n: 'Women\'s Tie-Dye Shibori Soft Rayon Comfort Kurti', p: 899, m: 1999 },
  { b: 'Aurelia', n: 'Women\'s Solid Rayon Flared Hem Keyhole Front Kurti', p: 799, m: 1599 },
  { b: 'Libas', n: 'Women\'s Striped Rayon Pintuck Detail Straight Fit Kurti', p: 729, m: 1699 },

  // Pure Cotton Daily Wear Kurtis (42-47)
  { b: 'Fabindia', n: 'Women\'s Kalamkari Block Printed South Cotton Classic Kurti', p: 1490, m: 2190 },
  { b: 'Libas', n: 'Women\'s 60s Count Combed Pure Cotton Straight Daily Kurti', p: 899, m: 1899 },
  { b: 'Biba', n: 'Women\'s Breathable Mulmul Cotton Block Floral Summer Kurti', p: 1499, m: 2499 },
  { b: 'W for Woman', n: 'Women\'s Dobby Weave Pure Cotton Smart Casual Kurti', p: 1399, m: 2299 },
  { b: 'Anouk', n: 'Women\'s Handcrafted Kantha Stitch Yoke Pure Cotton Kurti', p: 799, m: 1699 },
  { b: 'Sangria', n: 'Women\'s Sanganeri Block Print Mandarin Collar Cotton Kurti', p: 849, m: 1799 },

  // Office Wear Smart Kurtas (48-53)
  { b: 'W for Woman', n: 'Women\'s Minimalist Front Placket Office Formal Kurta', p: 1499, m: 2499 },
  { b: 'Biba', n: 'Women\'s Pinstripe Woven Formal Cotton Workwear Kurta', p: 1699, m: 2799 },
  { b: 'Aurelia', n: 'Women\'s Contrast Piping Pocket Detail Formal Rayon Kurta', p: 999, m: 1899 },
  { b: 'Fabindia', n: 'Women\'s Subtle Textured Tussar Silk Workwear Kurta', p: 2190, m: 3190 },
  { b: 'Global Desi', n: 'Women\'s Collar Neck Geometric Fusion Office Kurti', p: 1299, m: 2299 },
  { b: 'Libas', n: 'Women\'s Monochromatic Self-Patterned Cotton Straight Kurta', p: 1099, m: 2199 },

  // Kurta Sets with Dupatta (54-60)
  { b: 'Libas', n: 'Women\'s Printed Pure Cotton Kurta with Palazzos & Dupatta Set', p: 1899, m: 3999 },
  { b: 'Biba', n: 'Women\'s Floral Anarkali Kurta with Churidar & Chiffon Dupatta', p: 3499, m: 5999 },
  { b: 'Soch', n: 'Women\'s Chanderi Silk Embroidered Kurta with Trousers & Dupatta', p: 3998, m: 6498 },
  { b: 'Aurelia', n: 'Women\'s Solid Yoke Kurta with Cigarette Pants & Printed Dupatta', p: 2199, m: 3999 },
  { b: 'W for Woman', n: 'Women\'s Straight Cut Kurta with Brocade Trousers & Silk Stole', p: 2999, m: 4999 },
  { b: 'Anubhutee', n: 'Women\'s Bandhani Printed Cotton Kurta Set with Kota Dupatta', p: 1499, m: 3299 },
  { b: 'Janasya', n: 'Women\'s Poly Silk Embroidered Kurta with Sharara & Net Dupatta', p: 2299, m: 4799 },
  { b: 'Rangita', n: 'Women\'s Rayon Printed Gold Foil Straight Daily Kurti', p: 599, m: 1499 },
  { b: 'Rangita', n: 'Women\'s Embroidered Yoke Cotton Blend Festive Kurti', p: 799, m: 1799 },
  { b: 'Jaipur Kurti', n: 'Women\'s Handblock Printed Pure Cotton Flared Anarkali Kurta', p: 1499, m: 2999 },
  { b: 'Jaipur Kurti', n: 'Women\'s Sanganeri Print Straight Kurta with Trousers Set', p: 1899, m: 3699 }
];

const sarees = [
  // Kanjivaram Silk Sarees (1-7)
  { b: 'Saree mall', n: 'Women\'s Traditional Kanjivaram Pattu Silk Saree with Blouse Piece', p: 2799, m: 6999 },
  { b: 'Pothys', n: 'Women\'s Pure Kanchipuram Gold Zari Woven Bridal Silk Saree', p: 9999, m: 16999 },
  { b: 'Nalli', n: 'Women\'s Heritage Kanjivaram Temple Border Silk Saree with Rich Pallu', p: 14999, m: 22500 },
  { b: 'Kalamandir', n: 'Women\'s Contrast Korvai Border Kanjivaram Silk Festive Saree', p: 4999, m: 9999 },
  { b: 'Siril', n: 'Women\'s Jacquard Weave Floral Kanjivaram Art Silk Saree', p: 1299, m: 3499 },
  { b: 'Fabindia', n: 'Women\'s Handwoven Kanchipuram Pure Silk Ceremonial Saree', p: 11990, m: 17990 },
  { b: 'Mitera', n: 'Women\'s Peacock Zari Motif Kanjivaram Brocade Silk Saree', p: 2199, m: 5499 },

  // Banarasi Silk Sarees (8-14)
  { b: 'Mitera', n: 'Women\'s Banarasi Katan Silk Brocade Saree with Heavy Zari Pallu', p: 2499, m: 5999 },
  { b: 'Soch', n: 'Women\'s Varanasi Handloom Woven Banarasi Festive Silk Saree', p: 5998, m: 9998 },
  { b: 'Saree mall', n: 'Women\'s Meenakari Woven Floral Banarasi Art Silk Saree', p: 1899, m: 4599 },
  { b: 'Pothys', n: 'Women\'s Royal Banarasi Tanchoi Zari Border Wedding Saree', p: 8499, m: 13999 },
  { b: 'Banarasi Weaves', n: 'Women\'s Pure Organza Banarasi Cutwork Floral Saree', p: 4499, m: 7999 },
  { b: 'Fabindia', n: 'Women\'s Handwoven Banarasi Tussar Silk Handcrafted Saree', p: 7990, m: 11990 },
  { b: 'Vark', n: 'Women\'s Dual Tone Gold Tissue Banarasi Party Silk Saree', p: 3299, m: 6499 },

  // Organza Sarees (15-21)
  { b: 'Tikhi Imli', n: 'Women\'s Pastel Floral Hand Painted Pure Organza Silk Saree', p: 1999, m: 4499 },
  { b: 'Soch', n: 'Women\'s Embroidered Scallop Border Sheer Organza Party Saree', p: 3498, m: 5998 },
  { b: 'Mitera', n: 'Women\'s Foil Printed Floral Organza Saree with Unstitched Blouse', p: 1499, m: 3499 },
  { b: 'Kalamandir', n: 'Women\'s Zari Buta Woven Delicate Sheer Organza Festive Saree', p: 2799, m: 5299 },
  { b: 'Sangria', n: 'Women\'s Digital Floral Print Lightweight Sheer Organza Saree', p: 1399, m: 3199 },
  { b: 'Saree mall', n: 'Women\'s Mirror Embroidery Border Pastel Pink Organza Saree', p: 2199, m: 4799 },
  { b: 'Libas', n: 'Women\'s Gota Patti Embellished Tissue Organza Evening Saree', p: 2499, m: 4999 },

  // Pure Cotton Sarees (22-28)
  { b: 'Fabindia', n: 'Women\'s Handblock Kalamkari Printed South Cotton Saree', p: 2290, m: 3290 },
  { b: 'Suta', n: 'Women\'s Mulmul Cotton Solid Saree with Silver Zari Paring Border', p: 1950, m: 2850 },
  { b: 'Anand Sarees', n: 'Women\'s Daily Wear Geometric Printed Breathable Cotton Saree', p: 699, m: 1499 },
  { b: 'Nalli', n: 'Women\'s Authentic Chettinad Woven Temple Border Cotton Saree', p: 2799, m: 3999 },
  { b: 'Kalanjali', n: 'Women\'s Mangalagiri Pure Cotton Handloom Saree with Zari Border', p: 2499, m: 3799 },
  { b: 'Saree mall', n: 'Women\'s Indigo Dabu Mud Block Printed Pure Cotton Saree', p: 1299, m: 2899 },
  { b: 'Anouk', n: 'Women\'s Tant Bengal Handloom Jamdani Woven Cotton Saree', p: 1699, m: 3299 },

  // Pure Linen Sarees (29-34)
  { b: 'Suta', n: 'Women\'s Pure 100-Count Linen Saree with Metallic Zari Stripes', p: 3450, m: 4950 },
  { b: 'Fabindia', n: 'Women\'s Organic Linen Handwoven Saree with Contrast Pallu', p: 4290, m: 5990 },
  { b: 'Nalli', n: 'Women\'s Natural Dyed Pure Linen Jamdani Weave Saree', p: 3999, m: 5799 },
  { b: 'Kalamandir', n: 'Women\'s Linen Zari Border Pastel Green Elegant Saree', p: 2899, m: 4999 },
  { b: 'Anouk', n: 'Women\'s Hand Block Printed Pure Linen Summer Drape Saree', p: 2399, m: 4199 },
  { b: 'Mitera', n: 'Women\'s Silver Foil Striped Linen Blend Formal Office Saree', p: 1799, m: 3699 },

  // Chiffon Sarees (35-41)
  { b: 'Anand Sarees', n: 'Women\'s Lightweight Floral Chiffon Daily Wear Saree', p: 649, m: 1399 },
  { b: 'Siril', n: 'Women\'s Ombre Gradient Dual Tone Breathable Chiffon Saree', p: 799, m: 1799 },
  { b: 'Tikhi Imli', n: 'Women\'s Ruffled Border Retro Printed Chiffon Evening Saree', p: 1499, m: 3299 },
  { b: 'Soch', n: 'Women\'s Embellished Stone Border Pure French Chiffon Saree', p: 2998, m: 4998 },
  { b: 'Mitera', n: 'Women\'s Leheriya Printed Pure Chiffon Festive Drape Saree', p: 1299, m: 2799 },
  { b: 'Sangria', n: 'Women\'s Botanical Leaf Print Featherweight Chiffon Saree', p: 899, m: 1999 },
  { b: 'Saree mall', n: 'Women\'s Sequined Border Solid Royal Blue Chiffon Saree', p: 1699, m: 3599 },

  // Georgette Sarees (42-48)
  { b: 'Tikhi Imli', n: 'Women\'s Ready to Wear Tiered Ruffle Georgette Cocktail Saree', p: 1899, m: 3999 },
  { b: 'Soch', n: 'Women\'s Heavy Sequins Embroidered Bollywood Georgette Saree', p: 3998, m: 6498 },
  { b: 'Mitera', n: 'Women\'s Bandhani Foil Printed Festive Pure Georgette Saree', p: 1499, m: 3299 },
  { b: 'Anand Sarees', n: 'Women\'s Solid Georgette Saree with Embroidered Lace Border', p: 999, m: 2199 },
  { b: 'Siril', n: 'Women\'s Digital Floral Print Lightweight Flowy Georgette Saree', p: 849, m: 1899 },
  { b: 'Janasya', n: 'Women\'s Foil Mirror Embellished Georgette Party Saree', p: 1399, m: 2899 },
  { b: 'Saree mall', n: 'Women\'s Multicolored Stripe Printed Lightweight Georgette Saree', p: 1199, m: 2499 },

  // Party & Cocktail Sarees (49-54)
  { b: 'Soch', n: 'Women\'s Metallic Shimmer Lycra Draped Evening Cocktail Saree', p: 4498, m: 7498 },
  { b: 'Kalki Fashion', n: 'Women\'s Pre-Stitched Belted Sequins Starlight Saree', p: 6999, m: 10999 },
  { b: 'Tikhi Imli', n: 'Women\'s Pleated Shimmer Satin Ready-to-Wear Cocktail Saree', p: 2499, m: 4999 },
  { b: 'Saree mall', n: 'Women\'s Cutdana & Mirror Work Border Party Silk Saree', p: 3199, m: 6299 },
  { b: 'Mitera', n: 'Women\'s Velvet Border Embroidered Reception Festive Saree', p: 2799, m: 5899 },
  { b: 'Chhabra 555', n: 'Women\'s Swarovski Crystal Border Net Cocktail Saree', p: 5490, m: 8990 },

  // Pre-Draped Ready to Wear Sarees (55-60)
  { b: 'Tikhi Imli', n: 'Women\'s 1-Minute Ready to Wear Solid Pleated Georgette Saree', p: 1699, m: 3499 },
  { b: 'Indya', n: 'Women\'s Pre-Stitched Ruffle Tiered Drape Saree with Blouse', p: 2799, m: 4500 },
  { b: 'Saree mall', n: 'Women\'s Easy Drape Zipper Pocket Lycra Shimmer Saree', p: 1999, m: 3999 },
  { b: 'Mitera', n: 'Women\'s Instant 1-Minute Belted Banarasi Print Saree', p: 1899, m: 3799 },
  { b: 'Soch', n: 'Women\'s Pre-Draped Crepe Saree with Embroidered Velvet Bustier', p: 3998, m: 6998 },
  { b: 'Janasya', n: 'Women\'s Flared Pant Style Pre-Draped Fusion Saree', p: 2199, m: 4299 },
  { b: 'Chidiyaa', n: 'Women\'s Handcrafted Block Print Pure Mulmul Cotton Saree', p: 2890, m: 3990 },
  { b: 'Chidiyaa', n: 'Women\'s Natural Dyed Indigo Artisanal Handloom Saree', p: 3450, m: 4850 },
  { b: 'Rangoli', n: 'Women\'s Bollywood Georgette Sequin Border Party Saree', p: 1699, m: 3799 },
  { b: 'Rangoli', n: 'Women\'s Zari Buta Banarasi Art Silk Traditional Saree', p: 1999, m: 4499 }
];

const ethnicSets = [
  // Salwar Suits (1-8)
  { b: 'Biba', n: 'Women\'s Hand Block Printed Pure Cotton Straight Salwar Suit', p: 2799, m: 4999 },
  { b: 'Libas', n: 'Women\'s Floral Embroidery Chanderi Kurta Patiala Salwar Set', p: 1899, m: 3799 },
  { b: 'Aurelia', n: 'Women\'s Solid Yoke Embroidered Kurta with Salwar & Dupatta', p: 1999, m: 3699 },
  { b: 'W for Woman', n: 'Women\'s Brocade Yoke Kurta with Afghani Salwar Set', p: 2699, m: 4599 },
  { b: 'Soch', n: 'Women\'s Embroidered Tussar Silk Festive Punjabi Salwar Suit', p: 3798, m: 5998 },
  { b: 'Sangria', n: 'Women\'s Gotta Patti Cotton Cambric Daily Salwar Kameez', p: 1499, m: 2999 },
  { b: 'Varanga', n: 'Women\'s Bandhej Printed Anarkali Salwar Suit with Organza Dupatta', p: 2199, m: 4399 },
  { b: 'Rain & Rainbow', n: 'Women\'s Indigo Dabu Pure Cotton Classic Salwar Suit Ensemble', p: 1799, m: 3399 },

  // Anarkali Sets (9-16)
  { b: 'Biba', n: 'Women\'s Flared Floor-Length Pure Cotton Anarkali Suit Set', p: 3999, m: 6999 },
  { b: 'Soch', n: 'Women\'s Heavy Zari Threadwork Georgette Anarkali Ensemble', p: 5498, m: 8998 },
  { b: 'Libas', n: 'Women\'s Floral Print Chanderi Anarkali Kurta with Dupatta Set', p: 2299, m: 4699 },
  { b: 'House of Pataudi', n: 'Women\'s Jashn Resham Threadwork Silk Blend Anarkali Set', p: 4499, m: 7499 },
  { b: 'Sangria', n: 'Women\'s Angrakha Neckline Block Printed Flared Anarkali Set', p: 1899, m: 3699 },
  { b: 'Janasya', n: 'Women\'s Poly Silk Gold Foil Printed Festive Anarkali Set', p: 1999, m: 3999 },
  { b: 'W for Woman', n: 'Women\'s Jacquard Weave Contrast Dupatta Anarkali Set', p: 3499, m: 5799 },
  { b: 'Aurelia', n: 'Women\'s Tiered Flared Festive Rayon Anarkali Kurta Set', p: 2499, m: 4299 },

  // Luxury Bridal & Reception Lehengas (17-24)
  { b: 'Manyavar Mohey', n: 'Women\'s Crimson Royal Velvet Zari Embroidered Bridal Lehenga', p: 24999, m: 39999 },
  { b: 'Manyavar Mohey', n: 'Women\'s Emerald Raw Silk Dori & Sequins Wedding Lehenga Choli', p: 19999, m: 32999 },
  { b: 'Kalki Fashion', n: 'Women\'s Pastel Rose Gold Cutdana Net Reception Designer Lehenga', p: 28999, m: 45000 },
  { b: 'Chhabra 555', n: 'Women\'s Heritage Mirror Work & Gotta Patti Bridal Lehenga Set', p: 16990, m: 27990 },
  { b: 'Koskii', n: 'Women\'s Velvet Heavy Resham Threadwork Flared Wedding Lehenga', p: 14999, m: 24999 },
  { b: 'Soch', n: 'Women\'s Organza Floral Embroidered Pastel Bridal Lehenga Set', p: 12998, m: 21998 },
  { b: 'Biba', n: 'Women\'s Red & Gold Heritage Brocade Silk Wedding Lehenga Ensemble', p: 11999, m: 18999 },
  { b: 'Zeel Clothing', n: 'Women\'s Semi-Stitched Heavy Zari Net Festive Bridal Lehenga', p: 8999, m: 17999 },

  // Sangeet & Festive Lehenga Cholis (25-32)
  { b: 'Zeel Clothing', n: 'Women\'s Floral Sequins Embroidered Flared Sangeet Lehenga', p: 4499, m: 9999 },
  { b: 'Janasya', n: 'Women\'s Poly Silk Bandhani Print Sangeet Lehenga Choli Set', p: 2999, m: 5999 },
  { b: 'Indya', n: 'Women\'s Pre-Stitched Foil Drape Skirt Lehenga with Crop Bustier', p: 3499, m: 5900 },
  { b: 'Libas', n: 'Women\'s Georgette Gotta Patti Flared Festive Lehenga Set', p: 3999, m: 7999 },
  { b: 'Biba', n: 'Women\'s Tiered Chanderi Silk Festive Dandiya Lehenga Set', p: 5499, m: 8999 },
  { b: 'Fabindia', n: 'Women\'s Brocade Pure Silk Handcrafted Traditional Lehenga Choli', p: 7990, m: 11990 },
  { b: 'Soch', n: 'Women\'s Mirror Work Thread Embroidered Mehendi Lehenga Choli', p: 6998, m: 11998 },
  { b: 'Sangria', n: 'Women\'s Foil Printed Rayon Festive Flared Ghagra Choli Set', p: 2499, m: 4999 },

  // Sharara Sets (33-40)
  { b: 'Libas', n: 'Women\'s Gotta Patti Pure Chanderi Kurta with Flared Sharara Set', p: 2499, m: 4999 },
  { b: 'Biba', n: 'Women\'s Peplum Style Flared Kurta with Tiered Sharara & Dupatta', p: 3999, m: 6999 },
  { b: 'Varanga', n: 'Women\'s Bandhej Georgette Kurta with Embroidered Sharara Pants', p: 2799, m: 5499 },
  { b: 'Indya', n: 'Women\'s Sequin Embroidered Short Kurta with Crinkled Sharara', p: 2999, m: 4800 },
  { b: 'Sangria', n: 'Women\'s Block Print Pure Cotton Short Kurti with Flared Sharara', p: 1899, m: 3799 },
  { b: 'Soch', n: 'Women\'s Resham Threadwork Georgette Festive Party Sharara Suit', p: 4498, m: 7498 },
  { b: 'Aurelia', n: 'Women\'s Floral Foil Yoke Kurti with Parallel Tiered Sharara', p: 2299, m: 3999 },
  { b: 'Janasya', n: 'Women\'s Poly Silk Embroidered Mirror Short Kurta Sharara Set', p: 2199, m: 4499 },

  // Palazzo & Pant Kurta Sets (41-48)
  { b: 'Aurelia', n: 'Women\'s Solid Rayon Kurta with Flared Palazzo & Chiffon Dupatta', p: 1899, m: 3499 },
  { b: 'Libas', n: 'Women\'s Floral Chintz Pure Cotton Straight Kurta & Palazzo Set', p: 1599, m: 3199 },
  { b: 'Biba', n: 'Women\'s Handblock Printed Yoke Kurta with Cropped Trousers', p: 2999, m: 4999 },
  { b: 'W for Woman', n: 'Women\'s Straight Cut Work Kurta with Cigarette Pants & Stole', p: 3199, m: 5299 },
  { b: 'Anubhutee', n: 'Women\'s Indigo Dabu Cotton Kurta with Striped Palazzo Pants', p: 1399, m: 2899 },
  { b: 'Janasya', n: 'Women\'s Foil Printed Poly Crepe Kurta with Trousers & Dupatta', p: 1499, m: 3199 },
  { b: 'Sangria', n: 'Women\'s Front Slit A-Line Kurta with Elasticated Wide Palazzos', p: 1699, m: 3399 },
  { b: 'Rain & Rainbow', n: 'Women\'s Angrakha Cotton Kurti with Flared Tiered Palazzo Set', p: 1999, m: 3899 },

  // Indo-Western Fusion Sets (49-54)
  { b: 'Indya', n: 'Women\'s Pre-Stitched Cowl Drape Skirt with Crop Bustier & Cape', p: 3200, m: 5400 },
  { b: 'Global Desi', n: 'Women\'s Boho Embroidered Jumpsuit with Ethnic Mirror Shrug', p: 2499, m: 4299 },
  { b: 'AND', n: 'Women\'s Solid Georgette Cape Sleeve Indo-Western Trouser Set', p: 2999, m: 4999 },
  { b: 'Biba', n: 'Women\'s Brocade Crop Top with High-Waist Dhoti Pants & Jacket', p: 3499, m: 5999 },
  { b: 'W for Woman', n: 'Women\'s Layered Fusion Asymmetric Tunic with Slim Pants', p: 2799, m: 4699 },
  { b: 'Soch', n: 'Women\'s Embroidered Peplum Top with Dhoti Pants Festive Set', p: 3298, m: 5498 },

  // Floor Length Gowns & Capes (55-60)
  { b: 'Soch', n: 'Women\'s Floor-Length Georgette Anarkali Gown with Heavy Dupatta', p: 4498, m: 7498 },
  { b: 'Biba', n: 'Women\'s Festive Flared Chanderi Silk Maxi Gown with Gota Border', p: 4999, m: 8499 },
  { b: 'House of Pataudi', n: 'Women\'s Rozana Collection Embroidered Festive Maxi Gown', p: 3999, m: 6999 },
  { b: 'Indya', n: 'Women\'s Organza Cape Sleeve Floor Sweeping Festive Gown', p: 3400, m: 5800 },
  { b: 'Libas', n: 'Women\'s Zari Threadwork Velvet Winter Evening Ethnic Gown', p: 3299, m: 6299 },
  { b: 'Chhabra 555', n: 'Women\'s Embroidered Net Evening Gown with Satin Inner Lining', p: 5990, m: 9990 }
];

const heels = [
  // Block Heels (1-6)
  { b: 'Catwalk', n: 'Women\'s Criss-Cross Strap Suede Chunky Block Heel Sandals', p: 1799, m: 3495 },
  { b: 'Metro', n: 'Women\'s Patent Gloss Square Toe Everyday Business Block Heels', p: 2190, m: 3290 },
  { b: 'Inc.5', n: 'Women\'s Embellished Metallic Ankle Wrap Festive Block Heels', p: 1890, m: 2990 },
  { b: 'Carlton London', n: 'Women\'s Square Open Toe Two-Strap Minimal Block Heels', p: 1999, m: 3995 },
  { b: 'Bata', n: 'Women\'s Marie Claire Dual Strap Padded Comfort Block Heels', p: 1499, m: 2299 },
  { b: 'Mochi', n: 'Women\'s Traditional Zari Embroidered Festive Block Heel Mules', p: 1990, m: 3190 },

  // Stilettos & Pumps (7-12)
  { b: 'Aldo', n: 'Women\'s Stessy Classic High-Shine Pointed Toe 4-Inch Stilettos', p: 7999, m: 11999 },
  { b: 'Steve Madden', n: 'Women\'s Daisie Pointed Toe Glossy Nude Patent Stiletto Pumps', p: 8499, m: 12999 },
  { b: 'Metro', n: 'Women\'s Pointed Toe Formal Executive Work Stiletto Pumps', p: 2490, m: 3790 },
  { b: 'Catwalk', n: 'Women\'s Metallic Champagne Gold Ankle Strap Evening Stilettos', p: 2199, m: 3995 },
  { b: 'Carlton London', n: 'Women\'s Rhinestone Embellished Pointed Party Stilettos', p: 2799, m: 4995 },
  { b: 'Truffle Collection', n: 'Women\'s Clear Perspex Lucite Heel Pointed Party Pumps', p: 2299, m: 3999 },

  // Kitten Heels (13-18)
  { b: 'Inc.5', n: 'Women\'s Pointed Toe Slingback 2-Inch Comfortable Kitten Heels', p: 1690, m: 2790 },
  { b: 'Metro', n: 'Women\'s Bow Detail Glossy Patent Formal Kitten Heel Court Shoes', p: 1990, m: 2990 },
  { b: 'Mochi', n: 'Women\'s Shimmer Slip-On Evening Festive Kitten Heel Mules', p: 1790, m: 2690 },
  { b: 'Bata', n: 'Women\'s Padded Footbed Workwear Closed Toe Kitten Heels', p: 1299, m: 1999 },
  { b: 'Catwalk', n: 'Women\'s Metallic Strap Peep Toe Elegant Kitten Heels', p: 1599, m: 2995 },
  { b: 'Clarks', n: 'Women\'s Linvale Jerica Leather Cushion Plus Kitten Heel Pumps', p: 3999, m: 5999 },

  // Platform & Party Heels (19-24)
  { b: 'Steve Madden', n: 'Women\'s Sky-High Chunky Platform Ankle Strap Party Heels', p: 8999, m: 13999 },
  { b: 'Aldo', n: 'Women\'s Mirrored Metallic Platform Peep Toe Dance Heels', p: 7499, m: 10999 },
  { b: 'Catwalk', n: 'Women\'s Rose Gold Shimmer Chunky High Platform Heeled Sandals', p: 2399, m: 4295 },
  { b: 'Carlton London', n: 'Women\'s Strappy Multi-Strap Buckled Platform Nightclub Heels', p: 2699, m: 4795 },
  { b: 'Metro', n: 'Women\'s Velvet Finish Criss Cross Front Evening Platform Heels', p: 2790, m: 3990 },
  { b: 'Inc.5', n: 'Women\'s Braided Metallic Front Strap Festive Platform Heels', p: 2190, m: 3290 },

  // Wedges (25-30)
  { b: 'Mochi', n: 'Women\'s Ethnic Zari Floral Embroidered Traditional Wedges', p: 1890, m: 2990 },
  { b: 'Crocs', n: 'Women\'s Brooklyn Low Wedge Lightweight Dual-Strap Slides', p: 3995, m: 4995 },
  { b: 'Bata', n: 'Women\'s Comfit Memory Foam Cork Footbed Everyday Wedges', p: 1399, m: 2199 },
  { b: 'Catwalk', n: 'Women\'s T-Strap Rhinestone Studded Glamour Wedge Sandals', p: 1899, m: 3295 },
  { b: 'Inc.5', n: 'Women\'s Slip-On Cross Band Comfort Walking Wedge Sandals', p: 1690, m: 2690 },
  { b: 'Clarks', n: 'Women\'s Willow Shine Leather Cushion Soft Espadrille Wedges', p: 3499, m: 5499 },
  { b: 'Charles & Keith', n: 'Women\'s Metallic Accent Stiletto Pointed Toe Pumps', p: 6999, m: 9999 },
  { b: 'Charles & Keith', n: 'Women\'s Ankle Strap Cylindrical Block Heel Sandals', p: 5999, m: 8499 },
  { b: 'Charles & Keith', n: 'Women\'s Strappy Square Toe Comfort Platform Wedges', p: 5499, m: 7999 }
];

const sandals = [
  // Ethnic Kolhapuris & Juttis (1-6)
  { b: 'Metro', n: 'Women\'s Toe-Ring Handcrafted Ethnic Kolhapuri Flat Sandals', p: 1390, m: 2190 },
  { b: 'Mochi', n: 'Women\'s Embroidered Velvet Traditional Punjabi Bridal Juttis', p: 1690, m: 2790 },
  { b: 'Fulkari', n: 'Women\'s Handcrafted Phulkari Threadwork Pointed Flat Juttis', p: 1199, m: 2299 },
  { b: 'Catwalk', n: 'Women\'s Jeweled Stone Embellished Ethnic T-Strap Flats', p: 1499, m: 2895 },
  { b: 'Inc.5', n: 'Women\'s Braided Gold Strap Mojari Flat Festive Sandals', p: 1290, m: 2190 },
  { b: 'Bata', n: 'Women\'s Traditional Ethnic Kolhapuri Slip-On Flat Chappals', p: 899, m: 1499 },

  // Comfort Everyday Flats (7-12)
  { b: 'Bata', n: 'Women\'s Comfit Ergonomic Memory Foam Ankle Strap Daily Flats', p: 999, m: 1699 },
  { b: 'Birkenstock', n: 'Women\'s Madrid Single Buckle EVA Lightweight Water Slides', p: 3490, m: 4490 },
  { b: 'Clarks', n: 'Women\'s Pure Tone Handcrafted Soft Glove Leather Ballerina Flats', p: 3999, m: 5999 },
  { b: 'Mochi', n: 'Women\'s Slip-On Perforated Leather Casual Walking Ballerinas', p: 1590, m: 2490 },
  { b: 'Inc.5', n: 'Women\'s Bow Accent Pointed Toe Office Comfort Ballet Flats', p: 1290, m: 2190 },
  { b: 'Metro', n: 'Women\'s Soft Cushioned Insole Two-Band Everyday Slide Sandals', p: 1190, m: 1890 },

  // Strappy & Beach Sandals (13-18)
  { b: 'Inc.5', n: 'Women\'s Gladiator Lace-Up Strappy Open Toe Beach Sandals', p: 1490, m: 2390 },
  { b: 'Catwalk', n: 'Women\'s Metallic Rose Gold Slingback Summer Thong Sandals', p: 1299, m: 2495 },
  { b: 'Crocs', n: 'Women\'s Serena Clean Cross-Strap Waterproof Summer Sandals', p: 2495, m: 3295 },
  { b: 'Birkenstock', n: 'Women\'s Gizeh Cork Footbed Birko-Flor Thong Sandals', p: 5990, m: 7990 },
  { b: 'Metro', n: 'Women\'s Multi-Strap Buckled Tan Faux Leather Flat Sandals', p: 1390, m: 2190 },
  { b: 'Bata', n: 'Women\'s Anti-Slip Waterproof Beach Flip-Flops with Arch Support', p: 599, m: 999 },

  // Lifestyle Fashion Sneakers (19-24)
  { b: 'Puma', n: 'Women\'s Carina 2.0 Retro Platform Leather Casual Sneakers', p: 2899, m: 4999 },
  { b: 'Skechers', n: 'Women\'s D\'Lites Memory Foam Air-Cooled Walking Sneakers', p: 3999, m: 6499 },
  { b: 'Adidas', n: 'Women\'s Grand Court 2.0 Cloudfoam Pastel Striped Sneakers', p: 3699, m: 5599 },
  { b: 'Nike', n: 'Women\'s Court Legacy Low Canvas Minimalist Everyday Sneakers', p: 3995, m: 4995 },
  { b: 'Red Tape', n: 'Women\'s Colorblock Chunky Sole Lightweight Street Sneakers', p: 1699, m: 5499 },
  { b: 'Converse', n: 'Women\'s Chuck Taylor All Star Dainty Low Top Slim Sneakers', p: 3299, m: 4499 },

  // Boots & Loafers (25-30)
  { b: 'Carlton London', n: 'Women\'s Chelsea Elastic Side Gore Ankle-Length Boots', p: 2499, m: 4995 },
  { b: 'Zara', n: 'Women\'s Track Sole Faux Leather Lug Sole Zip Ankle Boots', p: 3990, m: 5990 },
  { b: 'H&M', n: 'Women\'s Chunky Sole Horsebit Hardware Faux Leather Loafers', p: 2299, m: 3499 },
  { b: 'Steve Madden', n: 'Women\'s Metallic Bit Detail Almond Toe Leather Driving Loafers', p: 5999, m: 8999 },
  { b: 'Woodland', n: 'Women\'s Rugged Nubuck Leather High-Ankle Outdoor Boots', p: 3495, m: 4995 },
  { b: 'Bata', n: 'Women\'s Penny Loafer Soft Padded Slip-On Work Shoes', p: 1499, m: 2499 }
];

const handbags = [
  // Structured Handbags & Satchels (1-8)
  { b: 'Lavie', n: 'Women\'s Betula Textured Structured Faux Leather Medium Handbag', p: 1599, m: 4299 },
  { b: 'Caprese', n: 'Women\'s Foli High-Shine Structured Satchel with Shoulder Strap', p: 1999, m: 4499 },
  { b: 'Baggit', n: 'Women\'s Cruelty-Free Vegan Leather Top-Handle Work Satchel', p: 1499, m: 3190 },
  { b: 'Lino Perros', n: 'Women\'s Bow Accent Front Flap Structured Party Handbag', p: 1399, m: 3495 },
  { b: 'Allen Solly', n: 'Women\'s Gold Hardware Detail Saffiano Leather Handbag', p: 1899, m: 3699 },
  { b: 'Van Heusen', n: 'Women\'s Executive Triple Compartment Formal Satchel Bag', p: 2199, m: 3999 },
  { b: 'Hidesign', n: 'Women\'s Cerys Handcrafted Real Vegetable Tanned Leather Satchel', p: 4895, m: 7295 },
  { b: 'Da Milano', n: 'Women\'s Genuine Italian Textured Leather Luxury Handbag', p: 9999, m: 14999 },

  // Everyday Large Totes (9-15)
  { b: 'Lavie', n: 'Women\'s Mono Colorblock Dual Shoulder Strap Spacious Tote Bag', p: 1499, m: 3999 },
  { b: 'Baggit', n: 'Women\'s Everyday Large Capacity Zippered Vegan Canvas Tote', p: 1299, m: 2890 },
  { b: 'Caprese', n: 'Women\'s Metallic Monogram Quilted High Capacity Travel Tote', p: 2299, m: 4999 },
  { b: 'Marks & Spencer', n: 'Women\'s Faux Leather Slouchy Hobo Shoulder Tote Bag', p: 2799, m: 3999 },
  { b: 'H&M', n: 'Women\'s Woven Straw Beach Tote Bag with Faux Leather Straps', p: 1999, m: 2999 },
  { b: 'Accessorize London', n: 'Women\'s Botanical Embroidered Canvas Shopper Tote Bag', p: 2499, m: 4200 },
  { b: 'ZOUK', n: 'Women\'s Handcrafted Indian Mandala Vegan Leather Office Tote', p: 1799, m: 3499 },

  // Crossbody & Sling Bags (16-23)
  { b: 'Lino Perros', n: 'Women\'s Quilted Chain Strap Evening Crossbody Sling Bag', p: 1199, m: 2995 },
  { b: 'Caprese', n: 'Women\'s Envelope Flap Casual Everyday Crossbody Sling', p: 1399, m: 3299 },
  { b: 'Lavie', n: 'Women\'s Saddle Shaped Flap Crossbody Bag with Guitar Strap', p: 1299, m: 2999 },
  { b: 'Baggit', n: 'Women\'s Compact Multi-Pocket Mobile Crossbody Sling Pouch', p: 899, m: 1890 },
  { b: 'Fastrack', n: 'Women\'s Casual Canvas Flap Dual-Tone Street Sling Bag', p: 999, m: 1799 },
  { b: 'Tommy Hilfiger', n: 'Women\'s Signature Stripe Camera Crossbody Bag', p: 4499, m: 6999 },
  { b: 'Aldo', n: 'Women\'s Quilted Lock Hardware Chain Strap Evening Crossbody', p: 3999, m: 6999 },
  { b: 'Chumbak', n: 'Women\'s Paisley Printed Bohemian Floral Crossbody Sling Bag', p: 1299, m: 2495 },

  // Luxury Designer Handbags (24-30)
  { b: 'Michael Kors', n: 'Women\'s Jet Set Travel Monogram Saffiano Leather Tote', p: 17999, m: 26999 },
  { b: 'Coach', n: 'Women\'s Signature Canvas Corner Zip Leather Luxury Satchel', p: 21999, m: 32500 },
  { b: 'Da Milano', n: 'Women\'s Exotic Snake Texture Genuine Italian Leather Handbag', p: 12999, m: 18999 },
  { b: 'Hidesign', n: 'Women\'s Soweto Classic Brass Buckle Vintage Leather Bag', p: 5995, m: 8995 },
  { b: 'Guess', n: 'Women\'s Stephi Croc-Embossed Structured Designer Satchel', p: 8999, m: 13500 },
  { b: 'Steve Madden', n: 'Women\'s B-Maxima Chain Link Quilted Luxury Convertible Bag', p: 7499, m: 10999 },
  { b: 'Ted Baker', n: 'Women\'s Icon Bow Detail High Gloss Vinyl Luxury Tote', p: 5499, m: 7999 },

  // Fashion Backpacks (31-37)
  { b: 'Lavie', n: 'Women\'s Small Quilted Faux Leather Mini City Backpack', p: 1299, m: 3199 },
  { b: 'Baggit', n: 'Women\'s Water-Resistant Multi-Pocket Everyday Casual Backpack', p: 1399, m: 2790 },
  { b: 'Caprese', n: 'Women\'s Contrast Trim Zippered College Travel Backpack', p: 1799, m: 3999 },
  { b: 'Skybags', n: 'Women\'s Ditsy Floral Pastel 22L School & College Backpack', p: 999, m: 1999 },
  { b: 'Puma', n: 'Women\'s Core Base Metallic Logo Sporty Daypack Backpack', p: 1499, m: 2499 },
  { b: 'Tommy Hilfiger', n: 'Women\'s Heritage Nylon Small Zippered Travel Backpack', p: 3499, m: 5999 },
  { b: 'Chumbak', n: 'Women\'s Aztec Geometric Print Canvas Mini Day Backpack', p: 1499, m: 2995 },

  // Evening Clutches & Potlis (38-44)
  { b: 'Accessorize London', n: 'Women\'s Pearl & Zircon Hardcase Wedding Minaudiere Clutch', p: 2699, m: 4500 },
  { b: 'Metro', n: 'Women\'s Shimmer Box Clutch with Detachable Golden Chain', p: 1490, m: 2490 },
  { b: 'Catwalk', n: 'Women\'s Glitter Envelope Flap Evening Party Clutch Bag', p: 1299, m: 2495 },
  { b: 'Mochi', n: 'Women\'s Raw Silk Embroidered Ethnic Bridal Potli Bag', p: 1190, m: 1990 },
  { b: 'Zaveri Pearls', n: 'Women\'s Kundan & Pearl Tassel Traditional Drawstring Potli', p: 899, m: 2499 },
  { b: 'Sukkhi', n: 'Women\'s Velvet Golden Zardozi Embroidered Bridal Potli Pouch', p: 799, m: 2199 },
  { b: 'Tarini', n: 'Women\'s Handcrafted Mirror Work Rajasthani Batwa Clutch', p: 999, m: 2299 },

  // Wallets & Wristlets (45-50)
  { b: 'Baggit', n: 'Women\'s Tri-Fold Multi-Card RFID Protected Vegan Wallet', p: 799, m: 1690 },
  { b: 'Lavie', n: 'Women\'s Croc Textured Zip-Around Long Currency Wallet', p: 899, m: 1999 },
  { b: 'Caprese', n: 'Women\'s Slim Bi-Fold Coin Pocket Designer Wallet', p: 999, m: 2199 },
  { b: 'Lino Perros', n: 'Women\'s Golden Emblem Front Flap Elegant Pocket Wallet', p: 699, m: 1795 },
  { b: 'Hidesign', n: 'Women\'s Real Leather Vintage Flap Pocket Long Wallet', p: 2195, m: 3495 },
  { b: 'Da Milano', n: 'Women\'s Full Grain Italian Leather Snap Closure Luxury Wallet', p: 3499, m: 5499 },

  // Professional Laptop Bags (51-55)
  { b: 'ZOUK', n: 'Women\'s 15.6 Inch Padded Laptop Handbag with Luggage Strap', p: 2299, m: 4499 },
  { b: 'Hidesign', n: 'Women\'s Charles Real Leather 14 Inch Executive Laptop Bag', p: 6495, m: 9995 },
  { b: 'Da Milano', n: 'Women\'s Saffiano Leather Structured Business Laptop Briefcase', p: 11999, m: 16999 },
  { b: 'Baggit', n: 'Women\'s Professional Dual-Handle Padded 15.6 Laptop Shoulder Bag', p: 1999, m: 3890 },
  { b: 'Mokobara', n: 'Women\'s The Briefcase Water-Resistant Vegan Laptop Bag', p: 4499, m: 6999 },
  { b: 'Charles & Keith', n: 'Women\'s Gabine Saddle Curved Flap Crossbody Bag', p: 6499, m: 8999 },
  { b: 'Charles & Keith', n: 'Women\'s Quilted Push-Lock Chain Shoulder Bag', p: 7299, m: 9999 },
  { b: 'Charles & Keith', n: 'Women\'s Structured Top-Handle Mini Trapeze Bag', p: 5999, m: 8299 },
  { b: 'DailyObjects', n: 'Women\'s Platform Recycled Canvas Large Everyday Tote', p: 1699, m: 2999 },
  { b: 'DailyObjects', n: 'Women\'s City Compact Crossbody Phone Sling Pouch', p: 999, m: 1999 },
  { b: 'DailyObjects', n: 'Women\'s Padded Vegan Leather 14" Work Laptop Sleeve Bag', p: 1499, m: 2499 }
];

const watches = [
  // Premium & Fashion Analogue Watches (1-10)
  { b: 'Titan', n: 'Women\'s Raga Viva Rose Gold Dial Jewelry Bracelet Watch', p: 4795, m: 6495 },
  { b: 'Titan', n: 'Women\'s Raga Moonlight Mother of Pearl Dial Bangle Watch', p: 5995, m: 7995 },
  { b: 'Fossil', n: 'Women\'s Jacqueline Sunray Dial Rose Gold Stainless Steel Watch', p: 8495, m: 12495 },
  { b: 'Fossil', n: 'Women\'s Carlie Mini Crystal Accent Mesh Bracelet Watch', p: 7995, m: 11995 },
  { b: 'Michael Kors', n: 'Women\'s Pyper Glitz Pave Crystal Rose Gold Tone Watch', p: 11495, m: 16995 },
  { b: 'Daniel Wellington', n: 'Women\'s Petite Melrose 32mm Rose Gold Mesh Watch', p: 9499, m: 13999 },
  { b: 'Casio', n: 'Women\'s Sheen Swarovski Crystal Embedded Multi-Hand Watch', p: 7495, m: 10495 },
  { b: 'Guess', n: 'Women\'s Heavy Crystal Studded Stainless Steel Dress Watch', p: 9295, m: 13900 },
  { b: 'Timex', n: 'Women\'s Fria Analog Shimmer Dial Sleek Metal Bangle Watch', p: 3795, m: 5495 },
  { b: 'Fastrack', n: 'Women\'s Monochrome Pastel Blush Dial Everyday Leather Watch', p: 1495, m: 2195 },

  // Smartwatches & Hybrids (11-18)
  { b: 'Titan', n: 'Women\'s Smart 2.0 AMOLED Display Calling Smartwatch with Rose Gold Mesh', p: 5995, m: 8995 },
  { b: 'Fossil', n: 'Women\'s Gen 6 Rose Gold Smartwatch with WearOS & Heart Rate', p: 16495, m: 23995 },
  { b: 'Noise', n: 'Women\'s Diva Glossy Metallic Bluetooth Calling Smartwatch with Diamond Cut Dial', p: 2999, m: 6999 },
  { b: 'boAt', n: 'Women\'s Wave Call Elegance Thin Bezel HD Display Smartwatch', p: 1999, m: 5999 },
  { b: 'Fire-Boltt', n: 'Women\'s Pristine Luxury Edition Bluetooth Calling Ceramic Watch', p: 2799, m: 7999 },
  { b: 'Garmin', n: 'Women\'s Lily Small Stylish Patterned Lens Fitness Smartwatch', p: 18990, m: 24990 },
  { b: 'Fastrack', n: 'Women\'s Reflex Play Plus AMOLED Calling Smartwatch with Pastel Strap', p: 2495, m: 5995 },
  { b: 'Fitbit', n: 'Women\'s Luxe Slim Fitness & Wellness Tracker with Gold Metal Link', p: 9999, m: 14999 }
];

const sunglasses = [
  { b: 'Vincent Chase', n: 'Women\'s Polarized Cat Eye UV400 Oversized Glossy Black Sunglasses', p: 999, m: 1999 },
  { b: 'Ray-Ban', n: 'Women\'s Erika Round Velvet Frame Polarized Sunglasses RB4171', p: 7490, m: 9990 },
  { b: 'Fastrack', n: 'Women\'s Gradient Purple Square UV Protection Sunglasses', p: 1199, m: 1999 },
  { b: 'Vogue Eyewear', n: 'Women\'s Hailey Bieber Collection Oval Metal Frame Sunglasses', p: 4790, m: 6790 },
  { b: 'Polaroid', n: 'Women\'s Round Mirrored Polarized Rose Gold Sunglasses', p: 3290, m: 4600 },
  { b: 'Voyage', n: 'Women\'s Oversized Butterfly Gradient Rimless Sunglasses', p: 899, m: 1899 },
  { b: 'Idee', n: 'Women\'s Geometric Hexagonal Rose Gold Metal Frame Shades', p: 1799, m: 2890 },
  { b: 'Vincent Chase', n: 'Women\'s Retro Tortoiseshell Wayfarer Polarized Sunglasses', p: 1299, m: 2299 },
  { b: 'Ray-Ban', n: 'Women\'s Aviator Gradient Classic Gold Frame Sunglasses RB3025', p: 8290, m: 10890 },
  { b: 'Fastrack', n: 'Women\'s Angular Cat Eye Sporty Tinted Sunglasses', p: 999, m: 1699 },
  { b: 'Vogue Eyewear', n: 'Women\'s Cat-Eye Acetate Havana Brown Designer Sunglasses', p: 5290, m: 7490 },
  { b: 'Rozdeal', n: 'Women\'s Flat Lens Metallic Rimless Retro Vintage Sunglasses', p: 699, m: 1499 },
  { b: 'Polaroid', n: 'Women\'s Square Oversized Contrast Temple Polarized Sunglasses', p: 3490, m: 4900 },
  { b: 'Voyage', n: 'Women\'s Pilot Metal Frame Polarized Gradient Silver Sunglasses', p: 1099, m: 2199 },
  { b: 'Vincent Chase', n: 'Women\'s Sleek Rectangle Slim 90s Minimalist Sunglasses', p: 899, m: 1799 },
  { b: 'Idee', n: 'Women\'s Two-Tone Transparent Pink Oval Streetwear Sunglasses', p: 1699, m: 2690 },
  { b: 'Ray-Ban', n: 'Women\'s Round Metal RB3447 Classic G-15 Polarized Sunglasses', p: 8890, m: 11690 }
];

const jewellery = [
  // Sterling Silver & Solitaires (1-7)
  { b: 'GIVA', n: 'Women\'s 925 Sterling Silver Zircon Solitaire Pendant with Chain', p: 1599, m: 3199 },
  { b: 'Mia by Tanishq', n: 'Women\'s 14K Yellow Gold Diamond Geometric Stud Earrings', p: 9499, m: 12999 },
  { b: 'GIVA', n: 'Women\'s 925 Silver Rose Gold Plated Adjustable Princess Ring', p: 1399, m: 2599 },
  { b: 'Shaya by CaratLane', n: 'Women\'s 925 Silver Minimalist Dual Layer Bar Necklace', p: 2100, m: 3500 },
  { b: 'GIVA', n: 'Women\'s 925 Sterling Silver Heart Link Adjustable Bracelet', p: 1799, m: 3499 },
  { b: 'Clara', n: 'Women\'s 925 Silver Swiss Zirconia Halo Stud Earrings', p: 1199, m: 2499 },
  { b: 'Joyalukkas', n: 'Women\'s Certified 14K Rose Gold Floral Diamond Drop Pendant', p: 12999, m: 16999 },

  // Traditional Bridal & Festive Sets (8-14)
  { b: 'Zaveri Pearls', n: 'Women\'s Traditional Kundan & Green Enamel Pearls Choker Set', p: 1199, m: 3499 },
  { b: 'Sukkhi', n: 'Women\'s 24K Gold Plated Austrian Diamond Bridal Necklace Set', p: 899, m: 2499 },
  { b: 'Karatcart', n: 'Women\'s Antique Gold Temple Jewellery Goddess Lakshmi Choker Set', p: 1499, m: 3999 },
  { b: 'Voylla', n: 'Women\'s Peacock Motif Handcrafted Meenakari Enamel Choker Set', p: 999, m: 2299 },
  { b: 'Rubans', n: 'Women\'s Handcrafted 22K Gold Plated Floral Kundan Jewellery Set', p: 1699, m: 4299 },
  { b: 'Priyaasi', n: 'Women\'s American Diamond Emerald Green Crystal Choker Set', p: 1299, m: 3199 },
  { b: 'Shining Diva', n: 'Women\'s Austrian Crystal Studded Royal Wedding Choker Set', p: 799, m: 2199 },

  // Jhumkas, Bangles & Bracelets (15-20)
  { b: 'Voylla', n: 'Women\'s Traditional Dome Shaped Kashmiri Jhumka Earrings', p: 699, m: 1499 },
  { b: 'Rubans', n: 'Women\'s Oxidised Silver Tribal Filigree Big Statement Jhumkas', p: 899, m: 1999 },
  { b: 'Priyaasi', n: 'Women\'s 18K Gold Plated Handcrafted Floral Bangle Set (Pack of 4)', p: 1199, m: 2999 },
  { b: 'GIVA', n: 'Women\'s 925 Sterling Silver Evil Eye Protection Bracelet', p: 1499, m: 2899 },
  { b: 'Zaveri Pearls', n: 'Women\'s Traditional Velvet Base Openable Kada Bangles (Pair)', p: 849, m: 2199 },
  { b: 'Mia by Tanishq', n: 'Women\'s 14K Gold Minimalist Interlocking Circles Delicate Bracelet', p: 7999, m: 10999 },
  { b: 'Swarovski', n: 'Women\'s Sparkling Dance Round Zirconia Pendant Necklace', p: 8990, m: 11900 },
  { b: 'Swarovski', n: 'Women\'s Attract Soul Crystal Solitaire Stud Earrings', p: 5990, m: 7900 },
  { b: 'Swarovski', n: 'Women\'s Emily Rhodium Plated Delicate Tennis Bracelet', p: 9490, m: 12500 },
  { b: 'Swarovski', n: 'Women\'s Constella Starburst Ring with Crystal Pavé', p: 6490, m: 8500 },
  { b: 'Fastrack', n: 'Women\'s Silk Satin Floral Hair Scrunchie & Band Set', p: 399, m: 799 },
  { b: 'Fabindia', n: 'Women\'s Handblock Printed Pure Silk Lightweight Scarf', p: 1190, m: 1890 },
  { b: 'Marks & Spencer', n: 'Women\'s Classic Cashmilon Soft Fringe Winter Scarf', p: 1499, m: 2299 }
];

module.exports = [
  {
    cat: 'Women', sub: 'Dresses', gender: 'Women', gst: 12,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Emerald Green', 'Wine Red', 'Floral Print', 'Classic Black', 'Blush Pink', 'Navy Blue', 'Mustard'],
    items: dresses
  },
  {
    cat: 'Women', sub: 'Tops', gender: 'Women', gst: 5,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Ivory White', 'Sage Green', 'Dusty Rose', 'Sky Blue', 'Black', 'Lavender', 'Mustard'],
    items: tops
  },
  {
    cat: 'Women', sub: 'Jeans', gender: 'Women', gst: 12,
    sizes: ['26', '28', '30', '32', '34', '36'],
    colors: ['Light Wash Blue', 'Dark Indigo', 'Charcoal Black', 'Off White', 'Raw Vintage', 'Acid Wash'],
    items: jeans
  },
  {
    cat: 'Women', sub: 'Kurtis', gender: 'Women', gst: 5,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['Indigo Blue', 'Turquoise', 'Rani Pink', 'Mustard', 'Mint Green', 'Maroon', 'White'],
    items: kurtis
  },
  {
    cat: 'Women', sub: 'Sarees', gender: 'Women', gst: 5,
    sizes: ['5.5m with Blouse Piece'],
    colors: ['Royal Crimson', 'Peacock Blue', 'Mustard Gold', 'Bottle Green', 'Pastel Peach', 'Wine Purple', 'Silver Grey'],
    items: sarees
  },
  {
    cat: 'Women', sub: 'Ethnic wear', gender: 'Women', gst: 12,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Bridal Red', 'Dusty Rose Gold', 'Emerald Green', 'Royal Blue', 'Champagne Gold', 'Maroon Gold'],
    items: ethnicSets
  },
  {
    cat: 'Women', sub: 'Heels', gender: 'Women', gst: 18,
    sizes: ['UK 3', 'UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
    colors: ['Nude Beige', 'Glossy Black', 'Rose Gold Metallic', 'Burgundy', 'Silver Shimmer', 'Champagne'],
    items: heels
  },
  {
    cat: 'Women', sub: 'Sandals', gender: 'Women', gst: 12,
    sizes: ['UK 3', 'UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
    colors: ['Tan Gold', 'Black', 'Champagne', 'Blush', 'White Pastel', 'Brown Leather'],
    items: sandals
  },
  {
    cat: 'Women', sub: 'Handbags', gender: 'Women', gst: 18,
    sizes: ['Compact Sling', 'Medium Satchel', 'Large Tote', '15.6 Laptop Bag'],
    colors: ['Tan Brown', 'Jet Black', 'Dusty Rose', 'Navy Blue', 'Burgundy', 'Olive Green', 'Beige Cream'],
    items: handbags
  },
  {
    cat: 'Women', sub: 'Watches', gender: 'Women', gst: 18,
    sizes: ['Dial 32mm', 'Dial 36mm', 'Slim Bracelet', 'Adjustable Mesh'],
    colors: ['Rose Gold', 'Silver Mesh', 'Mother of Pearl / Gold', 'Champagne', 'Matte Black'],
    items: watches
  },
  {
    cat: 'Women', sub: 'Sunglasses', gender: 'Women', gst: 18,
    sizes: ['Standard Medium', 'Oversized Free Size'],
    colors: ['Rose Gold Gradient', 'Cat Eye Black', 'Tortoise Brown', 'Mirrored Pink', 'Gold Aviator'],
    items: sunglasses
  },
  {
    cat: 'Women', sub: 'Jewellery', gender: 'Women', gst: 5,
    sizes: ['Adjustable', 'Standard 18 Inch', 'Size 14', 'Pair'],
    colors: ['925 Sterling Silver', '18K Gold Plated', 'Rose Gold', 'Kundan Gold', 'Oxidised Silver'],
    items: jewellery
  }
];
