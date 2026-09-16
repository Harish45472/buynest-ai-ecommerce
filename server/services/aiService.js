const db = require('../db/database');

/**
 * Intelligent Smart Recommendation Engine
 * Analyzes query intent, budget, specs, category, and returns contextual recommendations.
 */
function localSmartRecommendation(userMessage, allProducts) {
  const query = userMessage.toLowerCase();

  // 1. Detect budget / price constraints (supports ₹, Rs, INR, k, e.g. "under 2k", "below ₹1500", "under 1000 rupees", "under 60000")
  let maxPrice = null;
  const underMatch = query.match(/(?:under|below|less than|max|budget of|within)\s*(?:₹|rs\.?|inr)?\s*(\d+(?:\.\d+)?)\s*(k|thousand|rupees|rs)?/i);
  if (underMatch) {
    let val = parseFloat(underMatch[1]);
    if (underMatch[2] && underMatch[2].toLowerCase().startsWith('k')) {
      val *= 1000;
    }
    maxPrice = val;
  }

  // --- SPECIALIZED INTENT HANDLER 1: Wedding Outfit Finder ---
  if (query.includes('wedding') || query.includes('shaadi') || query.includes('sangeet') || query.includes('reception') || (query.includes('outfit') && (query.includes('party') || query.includes('traditional')))) {
    const weddingMatches = allProducts.filter(p => {
      const name = p.name.toLowerCase();
      const sub = (p.sub_category || '').toLowerCase();
      return (
        sub === 'ethnic wear' ||
        sub === 'lehengas' ||
        sub === 'sarees' ||
        sub === 'salwar suits' ||
        name.includes('sherwani') ||
        name.includes('lehenga') ||
        name.includes('kurta') ||
        name.includes('saree') ||
        name.includes('bundi') ||
        name.includes('nehru')
      ) && (maxPrice === null || p.price <= maxPrice);
    });

    if (weddingMatches.length > 0) {
      const picks = weddingMatches.sort((a, b) => b.rating - a.rating).slice(0, 4);
      return {
        reply: `🎉 For your grand wedding & festive celebrations, here is a hand-picked regal ensemble from BUYNEST featuring luxurious silks, intricate zari embroidery, and festive elegance:`,
        recommendations: picks
      };
    }
  }

  // --- SPECIALIZED INTENT HANDLER 2: Laptop for Programming / Coding Under Budget ---
  if ((query.includes('laptop') || query.includes('pc') || query.includes('computer')) && (query.includes('programm') || query.includes('cod') || query.includes('developer') || query.includes('software') || query.includes('work') || query.includes('engineering') || maxPrice !== null)) {
    const laptopMatches = allProducts.filter(p => {
      const sub = (p.sub_category || '').toLowerCase();
      const name = p.name.toLowerCase();
      return (sub === 'laptops' || name.includes('thinkpad') || name.includes('vivobook') || name.includes('pavilion') || name.includes('macbook')) && (maxPrice === null || p.price <= maxPrice);
    });

    if (laptopMatches.length > 0) {
      // Sort by price closest to budget or best specs
      const picks = laptopMatches.sort((a, b) => (maxPrice ? (b.price - a.price) : (b.rating - a.rating))).slice(0, 4);
      const budgetNote = maxPrice ? ` under ₹${maxPrice.toLocaleString('en-IN')}` : '';
      return {
        reply: `💻 Here are the best performance laptops for programming and multitasking${budgetNote}. Powered by fast multi-core CPUs, NVMe SSDs, and comfortable keyboards suited for extended coding sessions:`,
        recommendations: picks
      };
    }
  }

  // --- SPECIALIZED INTENT HANDLER 3: Running / Sports Shoes Under Budget ---
  if ((query.includes('shoe') || query.includes('sneaker') || query.includes('running')) && (query.includes('run') || query.includes('sport') || query.includes('jog') || query.includes('gym') || maxPrice !== null)) {
    const shoeMatches = allProducts.filter(p => {
      const sub = (p.sub_category || '').toLowerCase();
      const cat = p.category.toLowerCase();
      return (sub === 'sports shoes' || sub === 'shoes' || sub === 'sneakers' || cat === 'sports & fitness') && (maxPrice === null || p.price <= maxPrice);
    });

    if (shoeMatches.length > 0) {
      const picks = shoeMatches.sort((a, b) => b.rating - a.rating).slice(0, 4);
      const budgetNote = maxPrice ? ` under ₹${maxPrice.toLocaleString('en-IN')}` : '';
      return {
        reply: `👟 Top-rated running and athletic footwear${budgetNote} engineered with shock-absorbent cushioning, high grip traction, and breathable mesh uppers:`,
        recommendations: picks
      };
    }
  }

  // --- SPECIALIZED INTENT HANDLER 4: Product Comparison (vs / compare) ---
  if (query.includes('compare') || query.includes(' vs ') || query.includes(' versus ') || query.includes('difference between')) {
    // Find candidate products mentioned in the query
    const matchedProducts = allProducts.filter(p => {
      const name = p.name.toLowerCase();
      const brand = (p.brand || '').toLowerCase();
      const words = name.split(' ').filter(w => w.length > 3);
      return words.some(w => query.includes(w)) || (brand.length > 3 && query.includes(brand));
    });

    if (matchedProducts.length >= 2) {
      const itemA = matchedProducts[0];
      const itemB = matchedProducts[1];
      const priceDiff = Math.abs(itemA.price - itemB.price);

      const comparisonSummary = `⚖️ **Side-by-Side Comparison:**\n` +
        `• **${itemA.name}**: ₹${itemA.price.toLocaleString('en-IN')} (MRP ₹${itemA.mrp.toLocaleString('en-IN')}, ${itemA.discount_percent}% off, Rating ${itemA.rating}★)\n` +
        `• **${itemB.name}**: ₹${itemB.price.toLocaleString('en-IN')} (MRP ₹${itemB.mrp.toLocaleString('en-IN')}, ${itemB.discount_percent}% off, Rating ${itemB.rating}★)\n` +
        `• **Difference**: ₹${priceDiff.toLocaleString('en-IN')}. Both are genuine items verified by BUYNEST with manufacturer warranty and return assurance.`;

      return {
        reply: comparisonSummary,
        recommendations: [itemA, itemB]
      };
    }
  }

  // 2. Extract keyword tokens
  const cleanTokens = query
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2 && !['the', 'and', 'for', 'with', 'that', 'this', 'have', 'you', 'can', 'what', 'some', 'looking', 'item', 'items', 'show'].includes(t));

  // 3. Category & intent mapping tuned for Indian e-commerce marketplace BUYNEST
  const categoryKeywords = {
    'Men': ['men', 'mens', 'shirt', 'tshirt', 't-shirt', 'jeans', 'trouser', 'jacket', 'shoes', 'watch', 'wallet', 'bag', 'sunglasses', 'male', 'boy', 'roadster', 'wrogn', 'peter england', 'allen solly', 'flying machine', 'blackberrys', 'uspa'],
    'Women': ['women', 'womens', 'ladies', 'dress', 'top', 'kurti', 'kurta', 'saree', 'sari', 'jeans', 'trouser', 'handbag', 'shoes', 'heels', 'watch', 'jewellery', 'necklace', 'earrings', 'jhumka', 'sunglasses', 'biba', 'libas', 'vero moda', 'only', 'giva', 'zaveri'],
    'Electronics': ['electronics', 'smartphone', 'phone', 'mobile', 'laptop', 'headphones', 'earbuds', 'tws', 'smartwatch', 'tablet', 'speaker', 'power bank', 'charger', 'camera', 'oneplus', 'samsung', 'sony', 'boat', 'noise', 'jbl', 'asus', 'lenovo', 'realme', 'apple', 'macbook', 'iphone'],
    'Home & Kitchen': ['home', 'kitchen', 'furniture', 'bedsheet', 'curtains', 'cookware', 'tawa', 'cooker', 'mixer', 'grinder', 'induction', 'storage', 'bottle', 'decor', 'lighting', 'lamp', 'philips', 'prestige', 'hawkins', 'bombay dyeing', 'milton', 'cello', 'wipro'],
    'Beauty & Personal Care': ['beauty', 'skincare', 'makeup', 'lipstick', 'serum', 'sunscreen', 'perfume', 'fragrance', 'hair', 'haircare', 'shampoo', 'trimmer', 'grooming', 'shaving', 'minimalist', 'maybelline', 'lakme', 'bella vita', 'derma', 'forest essentials'],
    'Sports & Fitness': ['sports', 'fitness', 'shoes', 'running', 'tshirt', 'track pant', 'joggers', 'gym', 'dumbbell', 'weights', 'resistance bands', 'yoga', 'cricket', 'bat', 'football', 'puma', 'decathlon', 'nivia', 'boldfit', 'sg', 'asics', 'cultsport'],
    'Kids': ['kids', 'child', 'children', 'boys', 'girls', 'frock', 'shoes', 'toys', 'lego', 'hot wheels', 'barbie', 'school', 'backpack', 'pens', 'skybags', 'hopscotch', 'max']
  };

  // 4. Score each product
  const scored = allProducts.map(p => {
    let score = 0;
    const nameLower = p.name.toLowerCase();
    const brandLower = (p.brand || '').toLowerCase();
    const descLower = p.description.toLowerCase();
    const catLower = p.category.toLowerCase();
    const subCatLower = (p.sub_category || '').toLowerCase();

    // Price constraint check
    if (maxPrice !== null) {
      if (p.price <= maxPrice) {
        score += 40; // Strong bonus for fitting within requested budget
      } else {
        score -= 70; // Penalty for exceeding budget
      }
    }

    // Direct token matches
    cleanTokens.forEach(token => {
      if (nameLower.includes(token)) score += 30;
      if (brandLower.includes(token)) score += 35;
      if (subCatLower.includes(token)) score += 25;
      if (descLower.includes(token)) score += 12;
      if (catLower.includes(token)) score += 15;
    });

    // Category keyword matching
    for (const [cat, kws] of Object.entries(categoryKeywords)) {
      if (kws.some(k => query.includes(k))) {
        if (p.category.toLowerCase() === cat.toLowerCase()) {
          score += 25;
        }
      }
    }

    // High rating & featured boost
    if (p.rating >= 4.7) score += 5;
    if (p.featured) score += 5;
    if (p.stock > 0) score += 10; // Prioritize in-stock items

    return { product: p, score };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Take top 1 to 4 items with positive score
  const topMatches = scored.filter(s => s.score > 15).slice(0, 4).map(s => s.product);

  // Fallback if query was generic
  const recommendations = topMatches.length > 0 
    ? topMatches 
    : allProducts.filter(p => p.featured && p.stock > 0).slice(0, 4);

  // 5. Generate dynamic helpful conversational reply in INR (₹)
  let reply = '';
  if (recommendations.length > 0) {
    if (maxPrice !== null) {
      reply = `Here are our best matching options within your ₹${maxPrice.toLocaleString('en-IN')} budget! Each of these offers high quality, verified customer reviews, and fast dispatch:`;
    } else if (cleanTokens.some(t => ['kurta', 'chikankari', 'saree', 'ethnic', 'festive', 'nehru'].includes(t))) {
      reply = `For your festive and ethnic celebrations, here are our most popular and elegant traditional designs:`;
    } else if (cleanTokens.some(t => ['headphones', 'earbuds', 'tws', 'sound', 'audio', 'anc'].includes(t))) {
      reply = `If you're looking for premium sound quality and long battery life, here are our top-rated audio gadgets:`;
    } else if (cleanTokens.some(t => ['trimmer', 'serum', 'skincare', 'perfume', 'fragrance'].includes(t))) {
      reply = `Here are our trending personal care and grooming picks with natural formulations and high ratings:`;
    } else if (cleanTokens.some(t => ['laptop', 'pc', 'programming', 'developer'].includes(t))) {
      reply = `For high performance computing, multitasking, and software development, here are our top laptop choices:`;
    } else {
      reply = `Based on your request, I've curated these top-rated items from our BUYNEST catalogue:`;
    }
  } else {
    reply = `I couldn't find an exact match, but here are some of our most trending and top-rated products in India right now:`;
  }

  return { reply, recommendations };
}

/**
 * External LLM handler (OpenAI / Gemini)
 */
async function callExternalLLM(apiKey, provider, userMessage, conversationHistory, allProducts) {
  const catalogSummary = allProducts.map(p => 
    `ID: ${p.product_id} | Name: ${p.name} | Category: ${p.category} | Sub-Category: ${p.sub_category || 'General'} | Price: ₹${p.price} | Stock: ${p.stock} | Rating: ${p.rating} | Description: ${p.description}`
  ).join('\n');

  const systemPrompt = `You are "Aura", an expert, friendly AI Shopping Assistant for a leading Indian modern e-commerce platform.
Your mission is to guide shoppers, understand their preferences, budget (in Indian Rupees ₹), and recommend the best products from our inventory.

OUR CURRENT INVENTORY CATALOG (All prices in INR ₹):
${catalogSummary}

CRITICAL RULES:
1. Recommend ONLY products that exist in the inventory catalog above using their exact product_id.
2. If the user mentions a budget, respect it strictly.
3. Be friendly, concise, and helpful.
4. You MUST respond with a valid JSON object in this exact format:
{
  "reply": "Your helpful, conversational response explaining why these recommendations fit their needs.",
  "recommendedProductIds": [1, 3]
}
Do NOT wrap in markdown backticks if possible, return raw JSON string.`;

  if (provider === 'gemini') {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${userMessage}` }] }
        ],
        generationConfig: { responseMimeType: 'application/json' }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsed = JSON.parse(text);
    const matchedProducts = allProducts.filter(p => (parsed.recommendedProductIds || []).includes(p.product_id));
    return {
      reply: parsed.reply,
      recommendations: matchedProducts
    };
  } else {
    // Default to OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...conversationHistory.slice(-4).map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
          })),
          { role: 'user', content: userMessage }
        ],
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API returned status ${response.status}`);
    }

    const data = await response.json();
    const parsed = JSON.parse(data.choices[0].message.content);
    const matchedProducts = allProducts.filter(p => (parsed.recommendedProductIds || []).includes(p.product_id));
    return {
      reply: parsed.reply,
      recommendations: matchedProducts
    };
  }
}

/**
 * Main AI Chat handler
 */
exports.chat = async (req, res) => {
  try {
    const { message, history = [], customApiKey, provider = 'openai' } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    const allProducts = db.prepare('SELECT * FROM products').all();
    const apiKey = customApiKey || (provider === 'gemini' ? process.env.GEMINI_API_KEY : process.env.OPENAI_API_KEY);

    // If API key is available, try external LLM; fallback to built-in smart engine if missing or fails
    if (apiKey && apiKey.trim()) {
      try {
        const result = await callExternalLLM(apiKey.trim(), provider, message.trim(), history, allProducts);
        return res.json({
          ...result,
          mode: 'external_llm'
        });
      } catch (externalErr) {
        console.warn('External LLM call failed, smoothly falling back to smart local engine:', externalErr.message);
      }
    }

    // Built-in Smart Recommendation Engine
    const result = localSmartRecommendation(message.trim(), allProducts);
    return res.json({
      ...result,
      mode: 'smart_local'
    });
  } catch (err) {
    console.error('AI chat error:', err);
    res.status(500).json({ error: 'Failed to process AI chat request.' });
  }
};

/**
 * Complementary/Similar product recommendations
 */
exports.getSimilarRecommendations = (req, res) => {
  try {
    const { productId } = req.params;
    const current = db.prepare('SELECT * FROM products WHERE product_id = ?').get(productId);

    if (!current) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    // Find complementary products in same sub-category and category
    let similar = [];
    if (current.sub_category && current.sub_category !== 'General') {
      similar = db.prepare(`
        SELECT * FROM products 
        WHERE sub_category = ? AND product_id != ? AND stock > 0
        ORDER BY rating DESC, reviews_count DESC 
        LIMIT 4
      `).all(current.sub_category, current.product_id);
    }

    if (similar.length < 4) {
      const remainingLimit = 4 - similar.length;
      const existingIds = [current.product_id, ...similar.map(s => s.product_id)];
      const placeholders = existingIds.map(() => '?').join(',');
      const moreSimilar = db.prepare(`
        SELECT * FROM products 
        WHERE category = ? AND product_id NOT IN (${placeholders}) AND stock > 0
        ORDER BY rating DESC 
        LIMIT ${remainingLimit}
      `).all(current.category, ...existingIds);
      similar = [...similar, ...moreSimilar];
    }

    res.json({
      title: `AI Recommended with this item`,
      products: similar
    });
  } catch (err) {
    console.error('getSimilarRecommendations error:', err);
    res.status(500).json({ error: 'Failed to fetch recommendations.' });
  }
};
