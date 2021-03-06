import React, { useEffect, useState, useContext } from "react";
import ProductsList from "../components/ProductsList";
import { Collapse, Card } from "reactstrap";
import { ShoppingListContext } from "../contexts/ShoppingListContext";
import PriceFormater from '../helpers/PriceFormater';

export default function Store(props) {
  const {
    generatedShoppingList,
    singleProductSearchResult,
  } = useContext(ShoppingListContext);

  const [isOpen, setIsOpen] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let sum = 0;
    if (generatedShoppingList[props.store._id]) {
      generatedShoppingList[props.store._id].map((product) => {
        sum += product.price * (product.amount || 1);
      });
    }
    setTotalPrice(sum);
  }, [generatedShoppingList[props.store._id]]);

  return (
    <div className=" col-lg-4 col-12 mb-5">
      <h4
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="store-name"
        align="center"
        style={{
          backgroundColor: `${props.store.color}`,
        }}
      >
        {props.store.name}
      </h4>
      <Collapse isOpen={isOpen}>
        <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.74" }}>
          <div className="mb-5">
            <ProductsList
              products={singleProductSearchResult[props.store._id] || []}
              type={"searched"}
            />
          </div>
          <div>
            <ProductsList
              products={generatedShoppingList[props.store._id] || []}
              type={"chosen"}
            />
          </div>
        </Card>
      </Collapse>
      <div className="text-center total-price matjaktDarkGreen-text">
        {PriceFormater.standardizedPriceFormat(totalPrice) || 0} <span className="sek">SEK</span>
      </div>
    </div>
  );
}
