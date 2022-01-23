import React from 'react';
import {useNavigate} from "react-router-dom";

const HeaderShop = () => {

    const navigate = useNavigate()

    function goMain() {navigate("/mainWindow")}
    function goArena() {navigate("/arena")}

    return (
            <div className="ps-5 header d-flex justify-content-start align-items-center">
                <button className="button me-4" onClick={goMain}>Main</button>
                <button className="button" onClick={goArena}>Arena</button>
            </div>
    );
};

export default HeaderShop;