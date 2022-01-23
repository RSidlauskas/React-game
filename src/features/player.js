import {createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";

import React from "react";

export const player = createSlice({
    name: "player",
    initialState: {
        value: {
            race: "",
            items: [],
            equipped: "",
            buyDisabled: false
        },
    },
    reducers: {
        chooseRace: (state, action) => {
            state.value.race = action.payload
        },
        addItem: (state, action) => {
            state.value.items = [...state.value.items, action.payload]
        },
        addItemUpdate: (state, action) => {
            const emptybagSlot = {
                image: "https://static.wikia.nocookie.net/wowpedia/images/0/08/Ui-paperdoll-slot-bag.png",
                value: "empty",
            }
            let realItems = state.value.items.filter((x) =>
                x.value !== "empty")

            realItems = [...realItems, action.payload]
            const emptySlots = state.value.race.inventorySlots - realItems.length

            for (let i = 0; i < emptySlots ; i++) {
                realItems = [...realItems, emptybagSlot]
            }

            state.value.items = realItems
        },
        removeItemUpdate: (state, action) => {
            const emptybagSlot = {
                image: "https://static.wikia.nocookie.net/wowpedia/images/0/08/Ui-paperdoll-slot-bag.png",
                value: "empty",
            }

            let filtered = state.value.items.filter((x) =>
                x.image === action.payload.image)

            let filteredOut = state.value.items.filter((x) =>
                x.image !== action.payload.image)

            for (let i = 0; i < filtered.length-1; i++) {
                filteredOut = [...filteredOut, action.payload]
            }

            filteredOut = [...filteredOut, emptybagSlot]

            state.value.items = filteredOut
        },
        addGold: (state, action) => {
            state.value.race.gold += action.payload
        },
        removeGold: (state, action) => {
            state.value.race.gold -= action.payload
        },
        equipWeapon: (state, action) => {
            const emptybagSlot = {
                image: "https://static.wikia.nocookie.net/wowpedia/images/0/08/Ui-paperdoll-slot-bag.png",
                value: "empty",
            }

            state.value.equipped = action.payload

            state.value.race.damage += state.value.equipped.maxDamage


            let filteredOut = state.value.items.filter((x) =>
                x.image !== action.payload.image)

            filteredOut = [...filteredOut, emptybagSlot]

            state.value.items = filteredOut


        },
        unequipWeapon: (state, action) => {
            const emptybagSlot = {
                image: "https://static.wikia.nocookie.net/wowpedia/images/0/08/Ui-paperdoll-slot-bag.png",
                value: "empty",
            }

            let realItems = state.value.items.filter((x) =>
                x.value !== "empty")

            state.value.race.damage -= state.value.equipped.maxDamage

            realItems = [...realItems, state.value.equipped]

            state.value.equipped = ""

            const emptySlots = state.value.race.inventorySlots - realItems.length
            console.log(emptySlots)

            for (let i = 0; i < emptySlots; i++) {
                realItems = [...realItems, emptybagSlot]
            }
            console.log(realItems)

            state.value.items = realItems
        },
        editStat: (state, action) => {
            const emptybagSlot = {
                image: "https://static.wikia.nocookie.net/wowpedia/images/0/08/Ui-paperdoll-slot-bag.png",
                value: "empty",
            }

            if(action.payload.equip) {
                state.value.race[action.payload.statKey] += action.payload.statValue


                if (action.payload.statKey.toString() === "inventorySlots") {
                    state.value.items = [...state.value.items, emptybagSlot]
                }

            }else{
                state.value.race[action.payload.statKey] -= action.payload.statValue

                if (action.payload.statKey.toString() === "inventorySlots") {

                    let realItems = state.value.items.filter((x) =>
                        x.value !== "empty")

                    const emptySlots = state.value.race.inventorySlots - realItems.length

                    for (let i = 0; i < emptySlots ; i++) {
                        realItems = [...realItems, emptybagSlot]
                    }

                    state.value.items = realItems
                }

            }
        },
        refreshItems: (state, action) =>{
            const emptybagSlot = {
                image: "https://static.wikia.nocookie.net/wowpedia/images/0/08/Ui-paperdoll-slot-bag.png",
                value: "empty",
            }

            let realItems = state.value.items.filter((x) =>
                x.value !== "empty")
            const emptySlots = state.value.race.inventorySlots - realItems.length

            for (let i = 0; i < emptySlots; i++) {
                realItems = [...realItems, emptybagSlot]
            }
            console.log(realItems)

            state.value.items = realItems
        }

    }
})

export const {chooseRace, addItem, addItemUpdate, removeItemUpdate,
    removeGold, addGold, equipWeapon, unequipWeapon, editStat, refreshItems} = player.actions

export default player.reducer

/*
{
    image: "https://images.blz-contentstack.com/v3/assets/blt3452e3b114fab0cd/blt8a0bea138cdc9f77/6165eebb70b75d5011e405d4/GYI6XASNQ8YE1613677290450.png",
        race: "Orc",
    damage: 7,
    health: 120,
    energy: 40,
    stamina: 1,
    strength: 10,
    inventorySlots: 5,
    gold: 50,
    color: "#8A9E33"
},*/

// const emptybagSlot = {
//     image: "https://static.wikia.nocookie.net/wowpedia/images/0/08/Ui-paperdoll-slot-bag.png",
//     value: "empty",
// }
