// BUYNEST Comprehensive 950+ Realistic Product Catalog
const path = require('path');
const menData = require('./data/men');
const womenData = require('./data/women');
const kidsData = require('./data/kids');
const electronicsData = require('./data/electronics');
const homeData = require('./data/home');
const beautyData = require('./data/beauty');
const sportsData = require('./data/sports');
const groceryData = require('./data/grocery');
const booksData = require('./data/books');
const automotiveData = require('./data/automotive');
const { deduplicateAndConsolidate } = require('./deduplicateCatalog');

function generateProductFeatures(cat, sub, brand, name) {
  const feats = [];
  feats.push(`100% Authentic ${brand} item certified for exceptional durability and quality.`);
  
  if (cat === 'Electronics') {
    feats.push('Equipped with state-of-the-art power-efficient processor and high-grade circuitry.');
    feats.push('1-Year comprehensive manufacturer warranty valid across all authorized service centers in India.');
    feats.push('In-box contents: Genuine device, high-speed charging cable, warranty card, and user manual.');
  } else if (cat === 'Men' || cat === 'Women') {
    feats.push('Crafted from premium, breathable, ultra-comfortable fabric suitable for all-day wear.');
    feats.push('Colorfast treatment and reinforced stitching prevent fading and shape loss after repeated washes.');
    feats.push('Versatile contemporary fit designed to easily pair with daily, casual, or festive outfits.');
  } else if (cat === 'Grocery') {
    feats.push('FSSAI certified food-grade packaging that locks in natural aroma, crispness, and fresh taste.');
    feats.push('No artificial additives or adulterants; strictly graded and hygienically packed.');
    feats.push('Airtight moisture-proof seal ensures extended freshness and peak shelf life.');
  } else if (cat === 'Books') {
    feats.push('Original publisher authorized edition with crisp high-clarity typography on non-glare acid-free paper.');
    feats.push('Carefully packaged with reinforced bubble wrap for pristine, bend-free corner delivery.');
    feats.push('Complete, unabridged content with authentic ISBN and publisher index.');
  } else if (cat === 'Automotive') {
    feats.push('Meets rigorous ISI / DOT / automotive safety benchmarks for everyday Indian road conditions.');
    feats.push('High-strength, weatherproof, corrosion-resistant build engineered for long operating life.');
    feats.push('Simple, hassle-free installation with standard mounting hardware and step-by-step guide.');
  } else if (cat === 'Beauty & Personal Care') {
    feats.push('Dermatologically tested and certified safe for all Indian skin & hair types.');
    feats.push('Free from harsh sulfates, parabens, mineral oils, and synthetic irritants.');
    feats.push('Formulated with active nourishing botanicals delivering visible improvements with regular use.');
  } else if (cat === 'Home & Kitchen') {
    feats.push('Ergonomic, modern aesthetic that complements any contemporary Indian living or dining space.');
    feats.push('Sturdy heavy-duty construction tested for daily household use and heavy loads.');
    feats.push('Stain-resistant and smooth surfaces make it quick and simple to wipe clean.');
  } else if (cat === 'Sports & Fitness') {
    feats.push('High-performance athletic-grade construction engineered to withstand intensive workouts.');
    feats.push('Ergonomic, slip-resistant grip and sweat-wicking materials for maximum stability.');
    feats.push('Impact-absorbing materials reduce fatigue and protect joints during training.');
  } else if (cat === 'Toys & Baby') {
    feats.push('100% Non-toxic, BPA-free, child-safe materials certified under BIS safety standards.');
    feats.push('Smooth rounded edges and shatter-resistant construction for safe play.');
    feats.push('Stimulates cognitive development, problem-solving skills, and active imagination.');
  } else {
    feats.push('Verified genuine product backed by BUYNEST quality inspection and fast fulfillment.');
  }

  return feats;
}

function buildFullCatalog() {
  const allSubcategories = [
    ...menData,
    ...womenData,
    ...kidsData,
    ...electronicsData,
    ...homeData,
    ...beautyData,
    ...sportsData,
    ...groceryData,
    ...booksData,
    ...automotiveData
  ];

  const sellers = ['BUYNEST Retail', 'RetailNet India', 'Cocoblu Commerce', 'OmniTech Hub', 'IndiWeaves Direct'];
  const fullCatalog = [];
  let counter = 1;

  for (const group of allSubcategories) {
    const { cat, sub, gender, gst = 18, sizes, colors, items } = group;

    items.forEach((item, index) => {
      const discount = Math.round(((item.m - item.p) / item.m) * 100);
      const images = [];
      const rating = Number((4.1 + ((counter % 9) / 10)).toFixed(1));
      const reviewsCount = 85 + ((counter * 179) % 3500);

      // Distribute stock so some items show low stock urgency ("Only 4 left!")
      const stock = (counter % 7 === 0) ? 4 : (18 + ((counter * 7) % 35));

      const isFeatured = (counter % 4 === 0) ? 1 : 0;
      const isPopular = (counter % 3 === 0 || rating >= 4.6) ? 1 : 0;
      const isNewArrival = (counter % 5 === 0) ? 1 : 0;

      const deliveryInfo = item.p > 499 
        ? 'Free Express Delivery in 2-3 days'
        : 'Standard Delivery in 3-5 days. Free on orders above ₹499';

      let returnInfo = '14-Day Hassle-Free Return & Exchange';
      if (cat === 'Electronics') {
        returnInfo = '7-Day Replacement Warranty';
      } else if (cat === 'Beauty & Personal Care') {
        returnInfo = '10-Day Return if Unopened';
      } else if (cat === 'Grocery') {
        returnInfo = 'Non-returnable / 48-Hour Instant Refund for Damaged Transit';
      } else if (cat === 'Books') {
        returnInfo = '7-Day Replacement for Misprinted or Damaged Books';
      }

      let specs = {
        'Brand': item.b,
        'Category': cat,
        'Sub-Category': sub,
        'Country of Origin': 'India'
      };

      if (cat === 'Books') {
        specs['Publisher'] = item.b;
        specs['Language'] = 'English';
        specs['Binding'] = sizes ? sizes[0] : 'Paperback';
        specs['GST Rate'] = '0% (Exempt)';
      } else if (cat === 'Grocery') {
        specs['Manufacturer'] = item.b;
        specs['FSSAI License'] = '10014011001895';
        specs['Packaging'] = 'Airtight Moisture Proof Pouch / Jar';
        specs['Dietary Preference'] = 'Vegetarian';
      } else if (cat === 'Automotive') {
        specs['Compatibility'] = 'Universal Vehicle Fit';
        specs['Certification'] = 'ISI / CE Certified';
        specs['Warranty'] = '1 Year Manufacturer Warranty';
      } else if (cat === 'Electronics') {
        specs['Warranty'] = '1 Year Manufacturer Warranty';
        specs['Power Input'] = 'Standard Indian AC 220-240V / USB-C';
        specs['Care Instructions'] = 'Keep Away from Moisture / Follow User Manual';
      } else {
        specs['Gender'] = gender || 'Unisex';
        specs['Warranty'] = '6 Months Quality Assurance';
        specs['Care Instructions'] = 'Machine Wash Cold / Dry in Shade';
      }

      const features = generateProductFeatures(cat, sub, item.b, item.n);

      const tags = [
        item.b.toLowerCase(),
        sub.toLowerCase(),
        cat.toLowerCase(),
        (gender || 'unisex').toLowerCase(),
        'buynest',
        'verified',
        discount >= 40 ? 'sale' : 'fresh',
        isPopular ? 'bestseller' : 'featured'
      ];

      fullCatalog.push({
        id: counter,
        name: `${item.b} ${item.n}`,
        brand: item.b,
        category: cat,
        sub_category: sub,
        gender: gender || 'Unisex',
        price: item.p,
        mrp: item.m,
        discount_percent: discount,
        stock: stock,
        rating: rating,
        reviews_count: reviewsCount,
        sizes: sizes || ['Standard'],
        colors: colors || ['Black', 'Blue', 'White'],
        seller_name: sellers[counter % sellers.length],
        is_popular: isPopular,
        is_featured: isFeatured,
        is_new_arrival: isNewArrival,
        gst_percent: gst,
        delivery_info: deliveryInfo,
        return_info: returnInfo,
        image_url: images[0],
        images: images,
        description: `Authentic ${item.b} ${item.n}. 100% genuine guaranteed with BUYNEST verified seller warranty and quick checkout.`,
        specifications: specs,
        features: features,
        tags: tags
      });

      counter++;
    });
  }

  return deduplicateAndConsolidate(fullCatalog);
}

module.exports = {
  buildFullCatalog
};
