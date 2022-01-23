import React, {useState, useEffect} from 'react';
import {ProgressBar} from "react-bootstrap";

import ReactHover, {Hover, Trigger} from "react-hover";

import {useSelector, useDispatch} from "react-redux";

import {useNavigate} from "react-router-dom";

import gold from "../images/gold.png";
import {removeItemUpdate, addItemUpdate} from "../features/player";
import DropItems from "../features/dropItems";


const Arena = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function goTrader() {
        navigate('/shop')
    }

    function goLost() {
        navigate('/')
    }

    let [combat, setCombat] = useState(false)
    let [lost, setLost] = useState(false)

    let [showLoot, setShotLoot] = useState(true)
    let [droppedLoot, setDroppedLoot] = useState([])

    const dropItems = useSelector((state) => state.dropItems.value.dropItems)
    const character = useSelector((state) => state.player.value.race)
    const weaponEquiped = useSelector((state) => state.player.value.equipped)
    const monsters = useSelector((state) => state.monsters.value.monsters)

    let [currentEnemy, setCurrentEnemy] = useState({
        image: "",
        name: "",
        maxDamage: "",
        health: "",
        maxItemsDrop: ""
    })
    let [currentEnemyHp, setCurrentEnemyHp] = useState(0)
    let [maxEnemyHp, setMaxEnemyHp] = useState(0)
    let [currentPlayerHp, setCurrentPlayerHp] = useState(character.health)
    let [maxPlayerHp, setMaxPlayerHp] = useState(character.health)
    let [currentplayerEnergy, setCurrentplayerEnergy] = useState(character.energy)
    let [maxPlayerEnergy, setMaxPlayerEnergy] = useState(character.energy)

    const options = {
        fallowCursor: false
    }
    const itemsHave = useSelector((state) => state.player.value.items)
    const traderEffects = useSelector((state) => state.trader.value.effects)
    let [emptySlots, setEmptySlots] = useState([])
    let [fullSlots, setFullSLots] = useState([])
    useEffect(() => {
        const getEmptySlots = itemsHave.filter(x => x.value === "empty")
        const getFullSlots = itemsHave.filter(x => x.value !== "empty")
        setEmptySlots([...getEmptySlots])
        setFullSLots([...getFullSlots])
    }, [itemsHave])


    /*-----------------------*/

    function getEnemy() {
        setCombat(true)
        let luckyNumber = Math.floor(Math.random() * monsters.length)
        setCurrentEnemy(monsters[luckyNumber])
        setCurrentEnemyHp(monsters[luckyNumber].health)
        setMaxEnemyHp(monsters[luckyNumber].health)
        setDroppedLoot([])
        setShotLoot(false)
    }

    function action(attack) {
        if (attack) {
            if (weaponEquiped) {
                if (currentplayerEnergy >= weaponEquiped.energyPerHit) {
                    playerSwing()
                    enemySwing()
                }
            } else {
                playerSwing()
                enemySwing()
            }
        } else {
            enemySwing()
            setCurrentplayerEnergy(currentplayerEnergy + character.stamina)
        }

    }

    function playerSwing() {
        let damage = Math.round(Math.random() * character.damage)
        let critChance = Math.round(Math.random() * 100)


        if (weaponEquiped !== "") {
            let removeEnergy = weaponEquiped.energyPerHit
            setCurrentplayerEnergy(currentplayerEnergy - removeEnergy)
        }

        if (critChance <= character.strength) {
            damage = damage * 3
        }
        setCurrentEnemyHp(currentEnemyHp - damage)

        if (currentEnemyHp <= 0) {
            playerWon();
            return 0
        }
    }

    function enemySwing() {
        let damage = Math.round(Math.random() * currentEnemy.maxDamage)
        setCurrentPlayerHp(currentPlayerHp - damage)
        if (currentPlayerHp <= 0) {
            enemyWon()
        }
    }

    useEffect(() => {
        setCurrentplayerEnergy(currentplayerEnergy + character.stamina)
        //    Neveikia energy
    }, [currentEnemyHp])


    function playerWon() {
        setCombat(false)
        setShotLoot(true)
        getLoot()
    }

    function enemyWon() {
        setLost(true)
    }

    function drink(potion) {
        let potionKey = Object.keys(potion.effect).toString()
        let potionValue = potion.effect[potionKey]
        if (potionKey === "health") {
            setCurrentPlayerHp(currentPlayerHp + potionValue)
        }
        if (potionKey === "energy") {
            setCurrentplayerEnergy(currentplayerEnergy + potionValue)
        }
        dispatch(removeItemUpdate(potion))
    }

    function getLoot() {
        let itemsCount = Math.round(Math.random() * currentEnemy.maxItemsDrop) //2
        let items = []
        for (let i = 0; i < itemsCount; i++) {
            let item = dropItems[Math.ceil(Math.random() * dropItems.length)]
            items.push(item)
        }
        setDroppedLoot(items)
    }

    function takeItem(item) {
        dispatch(addItemUpdate(item))
        const newLoot = droppedLoot.filter(x => x.image !== item.image)
        console.log(newLoot)
        setDroppedLoot(newLoot)
    }

    function dropItem(item) {
        dispatch(removeItemUpdate(item))
    }


    return (
        <div className="arena p-3">
            <div className="row warzone">
                <div className="col-4 p-4">
                    <div className="enitityUi d-flex flex-column align-items-center">
                        <div className="portrait mt-4">
                            <img className="portraitImg" src={character.image} alt=""/>
                        </div>
                        <div className="d-flex w-100 flex-column align-items-start ps-5">
                            <p className="mt-3">HP: {currentPlayerHp}</p>
                            <div className="health">
                                <ProgressBar className="healthAmount"
                                             now={currentPlayerHp < 0 ? 0 : currentPlayerHp}
                                             max={maxPlayerHp}/>
                            </div>
                            <p className="mt-3">MP: {currentplayerEnergy}</p>
                            <div className="energy">
                                <ProgressBar className="energyAmount"
                                             now={currentplayerEnergy < 0 ? 0 : currentplayerEnergy}
                                             max={maxPlayerEnergy}/>
                            </div>
                        </div>
                        <div className="items d-flex flex-wrap align-items-start mt-5">
                            {
                                fullSlots.map((x, index) =>
                                    <ReactHover key={index} options={options}>
                                        <Trigger type='trigger'>
                                            <img src={x.image} className="icon" alt="lol"/>
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
                                                    <p className="text-center">Sell price: {x.price / 2} <img src={gold}
                                                                                                              alt="gold"/>
                                                    </p>
                                                </div>
                                                :
                                                <div className="iconTooltip">
                                                    <img alt="lols" src={x.image} className="mb-4"/>
                                                    <p style={{
                                                        color: "#1DFE00",
                                                        margin: "0px"
                                                    }}>{x.title}</p>
                                                    {(x.hasOwnProperty('maxDamage') || x.hasOwnProperty('effect'))
                                                        ?
                                                        <p className="text-center">Sell price: {x.price / 2} <img
                                                            src={gold} alt="gold"/></p>
                                                        :
                                                        <p className="text-center">Sell price: {x.price} <img src={gold}
                                                                                                              alt="gold"/>
                                                        </p>
                                                    }
                                                    {x.hasOwnProperty('effect') && <button className="button"
                                                                                           onClick={() => drink(x)}>Drink</button>}
                                                    <button className="button" onClick={() => dropItem(x)}>Drop item
                                                    </button>
                                                </div>
                                            }
                                        </Hover>
                                    </ReactHover>
                                )
                            }
                            {
                                emptySlots.map((item, index) => <img className="icon" src={item.image} key={index}
                                                                     alt=""/>)
                            }
                        </div>
                    </div>
                </div>

                <div className="col-4 d-flex flex-column align-items-center justify-content-center gap-3">
                    {
                        lost ? <button className="button" onClick={goLost}>Restart game</button>
                            :
                            <div className="d-flex flex-column align-items-center justify-content-center gap-3">
                                {!combat && <button className="button" onClick={getEnemy}>Find enemy</button>}
                                {!combat && <button className="button" onClick={goTrader}>Go back</button>}
                                {combat && <button className="button" onClick={() => action(true)}>Attack</button>}
                                {combat && <button className="button" onClick={() => action(false)}>Skip turn</button>}
                            </div>

                    }
                </div>


                <div className="col-4 p-4">
                    <div className="enitityUi d-flex flex-column align-items-center">
                        <div className="portrait mt-4">
                            {currentEnemy.image === "" ?
                                <img className="portraitImg" style={{padding: "1rem"}}
                                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Question_mark_alternate.svg/1200px-Question_mark_alternate.svg.png"
                                     alt=""/>
                                :
                                <img className="portraitImg" src={currentEnemy.image} alt=""/>
                            }
                        </div>
                        <div className="d-flex w-100 flex-column align-items-start ps-5">
                            {currentEnemy.name && <h1 className="align-self-center mt-5">{currentEnemy.name}</h1>}
                            <p className="mt-3"> HP: {currentEnemy.health !== "" && currentEnemyHp}</p>
                            <div className="health">
                                <ProgressBar className="healthAmount" now={currentEnemyHp < 0 ? 0 : currentEnemyHp}
                                             max={maxEnemyHp}/>
                                {showLoot &&
                                    <div className="items mt-4 d-flex flex-wrap align-items-start mt-5">
                                        {
                                            droppedLoot.map((x, index) =>
                                                <ReactHover key={index} options={options}>
                                                    <Trigger type='trigger'>
                                                        <img src={x.image} onDoubleClick={() => takeItem(x)}
                                                             className="icon" alt="lol"/>
                                                    </Trigger>
                                                    <Hover type='hover'>
                                                        <div className="iconTooltip">
                                                            <img alt="lols" src={x.image} className="mb-4"/>
                                                            <p className="text-center">Sell price: {x.price} <img
                                                                src={gold} alt="gold"/></p>
                                                        </div>
                                                    </Hover>
                                                </ReactHover>
                                            )
                                        }
                                    </div>
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Arena;