import React, { createContext, useContext, useState, useEffect } from 'react';

const ComparisonContext = createContext();

export function ComparisonProvider({ children }) {
  const [comparedProducts, setComparedProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('buynest_compared_products');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('buynest_compared_products', JSON.stringify(comparedProducts));
    } catch (e) {
      console.warn('Failed to save compared products:', e);
    }
  }, [comparedProducts]);

  const addToCompare = (product) => {
    if (comparedProducts.some(p => p.product_id === product.product_id)) {
      return { success: false, message: 'Item already in comparison' };
    }
    if (comparedProducts.length >= 4) {
      return { success: false, message: 'You can compare up to 4 products at a time' };
    }
    setComparedProducts(prev => [...prev, product]);
    return { success: true, message: `Added ${product.name.slice(0, 25)}... to compare` };
  };

  const removeFromCompare = (productId) => {
    setComparedProducts(prev => prev.filter(p => p.product_id !== productId));
  };

  const clearCompare = () => {
    setComparedProducts([]);
  };

  const isInCompare = (productId) => {
    return comparedProducts.some(p => p.product_id === productId);
  };

  return (
    <ComparisonContext.Provider
      value={{
        comparedProducts,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        isCompareModalOpen,
        setIsCompareModalOpen
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}
