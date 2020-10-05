import React, { useContext } from "react";
import Store from "./Store";
import { ShoppingListContext } from "../contexts/ShoppingListContext";
import { StoreContext } from "../contexts/StoreContext";

export default function List() {
  const { generatedShoppingList } = useContext(ShoppingListContext);
  const { stores } = useContext(StoreContext);
  const colors = ["#E83F39", "#66C46C", "#743EBB"];

  let singleProductSearchResults = [];
  stores.forEach((store, i) => {
    store.color = colors[i]
  });

  //stores[] will be replaced with an array, [{Store: Ica, generatedShoppingList[], singleProductSearchResult[] }] ?

  return (
    <div className="col-12 storelist">
      {stores.map((store, i) => {
        return (
          <Store
            className="store-list"
            key={i}
            store={store}
            singleProductSearchResults={singleProductSearchResults}
            generatedShoppingList={generatedShoppingList}
          />
        );
      })}
    </div>
  );
}
