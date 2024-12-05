import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
      const storedProducts = JSON.parse(localStorage.getItem('products'));
      return storedProducts || [];
    });
  
    useEffect(() => {
      localStorage.setItem('products', JSON.stringify(products));
    }, [products]);
  
    const addProduct = (product) => {
      setProducts((prevProducts) => [...prevProducts, product]);
    };
  
    const updateProduct = (id, updatedProduct) => {
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === id ? updatedProduct : product))
      );
    };
  
    const deleteProduct = (id) => {
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    };
  
    return (
      <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
        {children}
      </ProductsContext.Provider>
    );
  };
  