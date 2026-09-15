const db = require('../db/database');

/**
 * Intelligent Smart Recommendation Engine
 * Analyzes query intent, budget, specs, category, and returns contextual recommendations.
 */
function localSmartRecommendation(userMessage, allProducts) {
  const query = userMessage.toLowerCase();

  // 1. Detect budget / price constraints
  let maxPrice = null;
  const underMatch = query.match(/(?:under|below|less than|max|budget of)\s*\$?(\d+(?:\.\d+)?)/i);
  if (underMatch) {
    maxPrice = parseFloat(underMatch[1]);
  }

  // 2. Extract keyword tokens
  const cleanTokens = query
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2 && !['the', 'and', 'for', 'with', 'that', 'this', 'have', 'you', 'can', 'what', 'some', 'looking'].includes(t));

  // 3. Category & intent mapping
  const categoryKeywords = {
    'Electronics': ['laptop', 'computer', 'mac', 'pc', 'code', 'programming', 'headphone', 'audio', 'earphone', 'sound', 'camera', 'photo', 'watch', 'tech', 'gadget', 'screen', 'oled', 'bluetooth'],
    'Fashion': ['coat', 'jacket', 'wool', 'sweater', 'cotton', 'clothes', 'wear', 'shoes', 'running', 'sneaker', 'apparel', 'style', 'dress', 'shirt'],
    'Home & Living': ['coffee', 'carafe', 'pour', 'diffuser', 'aroma', 'table', 'dining', 'ceramic', 'decor', 'kitchen', 'home'],
    'Sports & Fitness': ['gym', 'workout', 'fitness', 'dumbbell', 'weight', 'yoga', 'mat', 'exercise', 'bottle', 'flask', 'athletic', 'train'],
    'Accessories': ['backpack', 'bag', 'leather', 'sunglasses', 'glasses', 'shades', 'watch', 'chronograph', 'strap', 'wallet']
  };

  // 4. Score each product
  const scored = allProducts.map(p => {
    let score = 0;
    const nameLower = p.name.toLowerCase();
    const descLower = p.description.toLowerCase();
    const catLower = p.category.toLowerCase();

    // Price constraint check
    if (maxPrice !== null) {
      if (p.price <= maxPrice) {
        score += 30; // Strong bonus for fitting within requested budget
      } else {
        score -= 50; // Penalty for exceeding budget
      }
    }

    // Direct name match
    cleanTokens.forEach(token => {
      if (nameLower.includes(token)) score += 25;
      if (descLower.includes(token)) score += 10;
      if (catLower.includes(token)) score += 15;
    });

    // Category keyword matching
    for (const [cat, kws] of Object.entries(categoryKeywords)) {
      if (kws.some(k => query.includes(k))) {
        if (p.category.toLowerCase() === cat.toLowerCase()) {
          score += 20;
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

  // Fallback if query was generic (e.g. "what's popular?", "recommend something")
  const recommendations = topMatches.length > 0 
    ? topMatches 
    : allProducts.filter(p => p.featured && p.stock > 0).slice(0, 3);

  // 5. Generate dynamic helpful conversational reply
  let reply = '';
  if (recommendations.length > 0) {
    if (maxPrice !== null) {
      reply = `Here are the best matching items within your \$${maxPrice} budget! Each of these offers exceptional value and great customer reviews.`;
    } else if (cleanTokens.some(t => ['laptop', 'pc', 'code', 'programming'].includes(t))) {
      reply = `For your computing and productivity needs, here are our top recommendations equipped with fast processors and vibrant displays:`;
    } else if (cleanTokens.some(t => ['sound', 'audio', 'music', 'headphones', 'earphone'].includes(t))) {
      reply = `If you're seeking premium audio quality and long battery life, here are our top-rated sound gear picks:`;
    } else if (cleanTokens.some(t => ['gym', 'workout', 'fitness', 'exercise'].includes(t))) {
      reply = `Great choice staying active! Here are our best-rated fitness gear and equipment designed to help reach your goals:`;
    } else {
      reply = `Based on your request, I've curated these top recommendations from our catalogue that best match what you're looking for:`;
    }
  } else {
    reply = `I couldn't find exact matches for your query, but here are some of our most popular and highly-rated products in the store right now:`;
  }

  return { reply, recommendations };
}

/**
 * External LLM handler (OpenAI / Gemini)
 */
async function callExternalLLM(apiKey, provider, userMessage, conversationHistory, allProducts) {
  const catalogSummary = allProducts.map(p => 
    `ID: ${p.product_id} | Name: ${p.name} | Category: ${p.category} | Price: \$${p.price} | Stock: ${p.stock} | Rating: ${p.rating} | Description: ${p.description}`
  ).join('\n');

  const systemPrompt = `You are "Aura", an expert, friendly AI Shopping Assistant for our modern e-commerce store.
Your mission is to guide shoppers, understand their preferences, budget, and recommend the best products from our inventory.

OUR CURRENT INVENTORY CATALOG:
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
