import React from 'react';

const Card = ({x, i, race}) => {

    return (
            <div className="cardd">
                <img src={x.image} style={{width:"416px", height:"522px"}} onClick={() => race(i)} className="hero pb-3" alt=""/>
                <h1 style={{color: x.color, textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}}>{x.race}</h1>
                <div className="d-flex justify-content-around">
                    <h4>Health: {x.health}</h4>
                    <h4>Energy: {x.energy}</h4>
                </div>
                <div className="d-flex justify-content-around">
                    <h4>stamina: {x.stamina}</h4>
                    <h4>strength: {x.strength}</h4>
                </div>
                <div className="d-flex justify-content-around">
                    <h4>Inventory Slots: {x.inventorySlots}</h4>
                    <h4>Gold: {x.gold}</h4>
                </div>
            </div>
    );
};

export default Card;