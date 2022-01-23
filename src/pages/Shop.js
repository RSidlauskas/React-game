import React, {useState} from 'react';
import HeaderShop from "../components/HeaderShop";
import Inventory from "../components/Inventory";
import ShopWindow from "../components/ShopWindow";

const Shop = () => {

    return (
        <div className="shop">
            <HeaderShop/>
            <div className="row">
                <div className="col p-4">
                    <ShopWindow/>
                </div>
                <div className="col p-4">
                    <Inventory/>
                </div>
            </div>
        </div>
    );
};

export default Shop;