import React, {useState} from 'react';

import ReactHover, {Trigger, Hover} from "react-hover";
import gold from "../images/gold.png"

import {useSelector, useDispatch} from "react-redux";
import {addItemUpdate, removeGold} from "../features/player";


const ShopWindow = () => {
    const person = useSelector((state) => state.player.value.race)
    const traderWeapons = useSelector((state) => state.trader.value.weapons)
    const traderEffects = useSelector((state) => state.trader.value.effects)
    const traderPotions = useSelector((state) => state.trader.value.potions)
    const itemsHave = useSelector((state) => state.player.value.items)
    const dispatch = useDispatch()

    let [weapons, setWeapons] = useState(true)

    const options = {
        fallowCursor: false
    }

    function buyItem(item) {
        const emptySlots = itemsHave.filter((x) => x.value === "empty")
        if (emptySlots.length > 0) {
            if (person.gold >= item.price) {
                dispatch(addItemUpdate(item))
                dispatch(removeGold(item.price))
            }
        }
    }

    return (
        <div className="shopGoods">
            <div className="title">Shop</div>
            <div className="inventory ">
                <div className="d-flex justify-content-around p-2 shopMenu">
                    <button className="button m-2 flex-grow-1" onClick={() => setWeapons(true)}>Weapons
                    </button>
                    <button className="button m-2 flex-grow-1" onClick={() => setWeapons(false)}>Potions
                    </button>
                </div>
                {weapons ?
                    <div className="weapons pt-1 d-flex flex-wrap align-items-start">
                        {traderWeapons.map((x, index) =>
                            // <img src={x.image} className="icon" alt="lol"/>
                            <ReactHover key={index} options={options}>
                                <Trigger type='trigger'>
                                    <img onDoubleClick={() => buyItem(x)} src={x.image} className="icon" alt="lol"/>
                                </Trigger>
                                <Hover type='hover'>
                                    <div className="iconTooltip">
                                        <img alt="Albert Einstein" src={x.image} className="mb-4"/>
                                        <p className="mb-0 pb-0">Max damage: {x.maxDamage}</p>
                                        <p>({x.energyPerHit} Energy per hit)</p>
                                        {x.effects.map((x, n) =>
                                            <p key={n} style={{
                                                color: "#1DFE00",
                                                margin: "0px"
                                            }}>{traderEffects[x].title}</p>
                                        )}
                                        <p className="text-center mt-1 ">Price: {x.price} <img src={gold} alt="gold"/></p>
                                    </div>
                                </Hover>
                            </ReactHover>
                        )}
                    </div>
                    :
                    <div className="potions d-flex flex-wrap align-items-start">
                        {traderPotions.map((x, index) =>
                            <ReactHover key={index} options={options}>
                                <Trigger type='trigger'>
                                    <img onDoubleClick={() => buyItem(x)} className="icon" src={x.image} alt="potion"/>
                                </Trigger>
                                <Hover type='hover'>
                                    <div className="iconTooltip">
                                        <img alt="potion" src={x.image} className="mb-4"/>
                                        <p style={{color: "#1DFE00"}}>{x.title}</p>
                                        <p className="text-center">Price: {x.price} <img src={gold} alt="gold"/></p>
                                    </div>
                                </Hover>
                            </ReactHover>
                        )}
                    </div>
                }
            </div>
        </div>

    );
};

export default ShopWindow;