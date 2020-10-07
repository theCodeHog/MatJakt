import React, { createContext, useState, useEffect } from "react";

export const ShoppingListContext = createContext();

export default function ShoppingListContextProvider(props) {
  const [productsToBeSearched, setProductsToBeSearched] = useState([]);
  const [singleProductSearchResult, setSingleProductSearchResult] = useState(
    {}
  );
  const [generatedShoppingList, setGeneratedShoppingList] = useState({});

  const handleChangeNewProduct = (product, attribute, value) => {
    console.log(product, attribute, value)
    // for (let i = 0; i < generatedShoppingList.length; i++) {
    //   if (generatedShoppingList[i] == product) {
    //     generatedShoppingList[i] = { ...product, [attribute]: value}
    //   }
    // }
  };

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "matjaktLocalSave",
      JSON.stringify(productsToBeSearched)
    );
  }, [productsToBeSearched]);

  const loadFromLocalStorage = async () => {
    let data = localStorage.getItem("matjaktLocalSave");
    if (data) {
      data = await JSON.parse(data);
      setProductsToBeSearched(data);
    }
  };

  const addSelectedProductToGeneratedShoppingList = (storeId, product) => {
    if (!generatedShoppingList[storeId]) {
      setGeneratedShoppingList({
        ...generatedShoppingList,
        [storeId]: [product],
      });
    } else {
      setGeneratedShoppingList({
        ...generatedShoppingList,
        [storeId]: [...generatedShoppingList[storeId], product],
      });
    }
  };

  const addProductToShoppingList = async (product) => {
    setProductsToBeSearched((productsToBeSearched) => [
      ...productsToBeSearched,
      product,
    ]);
  };

  const editProductInShoppingList = async (index, productToEdit) => {
    let editedProduct = productsToBeSearched;
    editedProduct.splice(index, 1, productToEdit);
    setProductsToBeSearched([...editedProduct]);
  };

  const removeProductFromShoppingList = async (productToRemove) => {
    setProductsToBeSearched(
      productsToBeSearched.filter((product) => product !== productToRemove)
    );
  };

  const singleProductSearch = async (product) => {
    setSingleProductSearchResult({});
    let data = await fetch(
      `http://127.0.0.1:3000/products/singleProductSearch`,
      {
        method: "POST",
        body: JSON.stringify(product),
        mode: "cors",
        headers: { "Content-type": "application/json;charset=utf-8" },
      }
    );
    data = await data.json();
    setSingleProductSearchResult(data);
  };

  const fetchGeneratedShoppingLists = async () => {
    const raw = await fetch(`http://127.0.0.1:3000/products/generate-list`, {
      method: "POST",
      body: JSON.stringify(productsToBeSearched),
      mode: "cors",
      headers: { "Content-type": "application/json;charset=utf-8" },
    });
    const data = await raw.json();
    setGeneratedShoppingList(data);
  };

  const values = {
    productsToBeSearched,
    singleProductSearch,
    addProductToShoppingList,
    editProductInShoppingList,
    removeProductFromShoppingList,
    fetchGeneratedShoppingLists,
    handleChangeNewProduct,
    generatedShoppingList,
    singleProductSearchResult,
    addSelectedProductToGeneratedShoppingList,
  };

  return (
    <ShoppingListContext.Provider value={values}>
      {props.children}
    </ShoppingListContext.Provider>
  );
}
