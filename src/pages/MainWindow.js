import React, {useEffect, useState} from 'react';
import {useRef} from "react";
import {useSelector} from "react-redux";
import MainHeader from "../components/MainHeader";
import CharacterInfo from "../components/CharacterInfo";
import Inventory from "../components/Inventory";

const MainWindow = () => {



    return (
        <div className="gameWindow">
            <MainHeader/>
            <div className="row">
                <div className="col-5 p-4">
                    <CharacterInfo/>
                </div>
                <div className="col-7 p-4">
                    <Inventory/>
                </div>
            </div>
        </div>
    );
};

export default MainWindow;