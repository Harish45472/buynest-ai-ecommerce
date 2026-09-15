const db = require('../db/database');

/**
 * Intelligent Smart Recommendation Engine
 * Analyzes query intent, budget, specs, category, and returns contextual recommendations.
 */
function localSmartRecommendation(userMessage, allProducts) {
  const query = userMessage.toLowerCase();

  // 1. Detect budget / price constraints (supports ₹, Rs, INR, k, e.g. "under 2k", "below ₹1500", "under 1000 rupees")
  let maxPrice = null;
  const underMatch = query.match(/(?:under|below|less than|max|budget of|within)\s*(?:₹|rs\.?|inr)?\s*(\d+(?:\.\d+)?)\s*(k|thousand|rupees|rs)?/i);
  if (underMatch) {
    let val = parseFloat(underMatch[1]);
    if (underMatch[2] && underMatch[2].toLowerCase().startsWith('k')) {
      val *= 1000;
    }
    maxPrice = val;
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
    'Electronics': ['electronics', 'smartphone', 'phone', 'mobile', 'laptop', 'headphones', 'earbuds', 'tws', 'smartwatch', 'tablet', 'speaker', 'power bank', 'charger', 'camera', 'oneplus', 'samsung', 'sony', 'boat', 'noise', 'jbl', 'asus', 'lenovo', 'realme'],
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
    } else if (cleanTokens.some(t => ['laptop', 'pc', 'quantum'].includes(t))) {
      reply = `For high performance computing, multitasking, and productivity, here are our top laptop choices:`;
    } else {
      reply = `Based on your request, I've curated these top-rated items from our store catalogue:`;
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

    // Find complementary products in same category or matching price range
    const similar = db.prepare(`
      SELECT * FROM products 
      WHERE category = ? AND product_id != ? AND stock > 0
      ORDER BY rating DESC 
      LIMIT 3
    `).all(current.category, current.product_id);

    res.json({
      title: `AI Recommended with this item`,
      products: similar
    });
  } catch (err) {
    console.error('getSimilarRecommendations error:', err);
    res.status(500).json({ error: 'Failed to fetch recommendations.' });
  }
};
