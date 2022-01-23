import React, {useEffect, useRef} from 'react';

import {useSelector, useDispatch} from "react-redux";
import {editStat, equipWeapon, unequipWeapon} from "../features/player";

import ReactHover, {Hover, Trigger} from "react-hover";


const CharacterInfo = () => {

    const person = useSelector((state) => state.player.value)
    const weapon = useSelector((state) => state.player.value.equipped)
    const traderEffects = useSelector((state) => state.trader.value.effects)
    const dispatch = useDispatch()

    const options = {
        fallowCursor: false
    }

    function unequip() {
        dispatch(unequipWeapon())
        //-----
        weapon.effects.forEach(x => {
            let statKey = Object.keys(traderEffects[x].effect)
            let statValue = traderEffects[x].effect
            statValue = statValue[statKey]
            let update = {
                statKey,
                statValue,
                equip: false
            }
            dispatch(editStat(update))
        })

    }

    return (
        <div className="d-flex flex-column align-items-center characterWindow">
            <img src={person.race.image} style={{height: "450px"}} className="mb-4" alt="lol"/>
            <div className="w-100 d-flex justify-content-around">
                <p>Damage: {person.race.damage}</p>
                <p>Energy: {person.race.energy}</p>
            </div>
            <div className="w-100 d-flex justify-content-around">
                <p>Stamina: {person.race.stamina}</p>
                <p>Strength: {person.race.strength}</p>
            </div>
            <div className="mb-4">
                {weapon === "" ?
                    <img className="head" style={{width: "70px", height: "70px"}}
                         src="https://static.wikia.nocookie.net/wowpedia/images/f/f5/Ui-paperdoll-slot-mainhand.png"
                         alt="league of legends"/>
                    :
                    <ReactHover options={options}>
                        <Trigger type='trigger'>
                            <img src={weapon.image} className="icon" alt="lol"/>
                        </Trigger>
                        <Hover type='hover'>
                            <div className="iconTooltip">
                                <img alt="lols" src={weapon.image} className="mb-4"/>
                                <p className="mb-0 pb-0">Max damage: {weapon.maxDamage}</p>
                                <p>({weapon.energyPerHit} Energy per hit)</p>
                                {weapon.effects.map((x, i) =>
                                    <p key={i} style={{
                                        color: "#1DFE00",
                                        margin: "0px"
                                    }}>{traderEffects[x].title}</p>
                                )}
                                <button className="button" onClick={unequip}>Unequip</button>
                            </div>
                        </Hover>
                    </ReactHover>
                }
            </div>
        </div>
    );
};

export default CharacterInfo;