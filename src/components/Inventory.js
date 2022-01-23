import React, {useEffect, useState} from 'react';
import gold from "../images/gold.png";

import ReactHover, {Hover, Trigger} from "react-hover";

import {useLocation} from "react-router-dom";

import {useSelector, useDispatch} from "react-redux";
import {addGold, removeItemUpdate, equipWeapon, editStat} from "../features/player";


const Inventory = () => {
    const {pathname} = useLocation()
    const dispatch = useDispatch()

    const options = {
        fallowCursor: false
    }

    const traderEffects = useSelector((state) => state.trader.value.effects)
    const person = useSelector((state) => state.player.value)
    const itemsHave = useSelector((state) => state.player.value.items)

    let [emptySlots, setEmptySlots] = useState([])
    let [fullSlots, setFullSLots] = useState([])
    useEffect(() => {
        const getEmptySlots = itemsHave.filter(x => x.value === "empty")
        const getFullSlots = itemsHave.filter(x => x.value !== "empty")
        setEmptySlots([...getEmptySlots])
        setFullSLots([...getFullSlots])
    }, [itemsHave])

    function sellItem(item){
        if (pathname === "/shop"){
            // {(x.hasOwnProperty('maxDamage') && pathname === "/mainWindow") && <button className="button" onClick={() => equip(x)}>Equip</button>}
            if(item.hasOwnProperty('maxDamage') || item.hasOwnProperty('effect')){
                dispatch(removeItemUpdate(item))
                dispatch(addGold(item.price/2))
            }else{
                dispatch(removeItemUpdate(item))
                dispatch(addGold(item.price))

            }

        }
    }

    function equip(item){
        dispatch(equipWeapon(item))
        //-----
        item.effects.forEach(x => {
            let statKey = Object.keys(traderEffects[x].effect)
            let statValue = traderEffects[x].effect
            statValue = statValue[statKey]
            let update = {
                statKey,
                statValue,
                equip: true
            }
            dispatch(editStat(update))
         })
    }


    return (
        <div>
            <div className="inventory d-flex flex-column justify-content-between">
                <div className="items d-flex flex-wrap align-items-start">
                    {
                        fullSlots.map((x, index) =>
                            <ReactHover key={index} options={options}>
                                <Trigger type='trigger'>
                                    <img onDoubleClick={() => sellItem(x)} src={x.image} className="icon" alt="lol"/>
                                </Trigger>
                                <Hover type='hover'>
                                    {x.hasOwnProperty('maxDamage') ?
                                    <div className="iconTooltip">
                                        <img alt="lols" src={x.image} className="mb-4"/>
                                        <p className="mb-0 pb-0">Max damage: {x.maxDamage}</p>
                                        <p>({x.energyPerHit} Energy per hit)</p>
                                        {x.effects.map((x, n) =>
                                            <p key={n} style={{
                                                color: "#1DFE00",
                                                margin: "0px"
                                            }}>{traderEffects[x].title}</p>
                                        )}
                                        <p className="text-center">Sell price: {x.price/2} <img src={gold} alt="gold"/></p>
                                        {(x.hasOwnProperty('maxDamage') && pathname === "/mainWindow") && <button className="button" onClick={() => equip(x)}>Equip</button>}
                                    </div>
                                    :
                                        <div className="iconTooltip">
                                            <img alt="lols" src={x.image} className="mb-4"/>
                                            <p style={{
                                                color: "#1DFE00",
                                                margin: "0px"}}>{x.title}</p>
                                            {(x.hasOwnProperty('maxDamage') || x.hasOwnProperty('effect'))
                                                ?
                                                <p className="text-center">Sell price: {x.price/2} <img src={gold} alt="gold"/></p>
                                                :
                                                <p className="text-center">Sell price: {x.price} <img src={gold} alt="gold"/></p>
                                            }
                                        </div>
                                    }
                                </Hover>
                            </ReactHover>
                        )
                    }
                    {
                        emptySlots.map((item, index) => <img className="icon" src={item.image} key={index} alt=""/>)
                    }
                </div>
                <div className="gold align-self-end">{person.race.gold} <img src={gold} alt="gold"/></div>
            </div>
        </div>
    );
};

export default Inventory;