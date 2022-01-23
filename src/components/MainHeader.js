import React from 'react';
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";

const MainHeader = () => {

    const navigate = useNavigate()
    const {pathname} = useLocation()

    function goShop() {navigate('/shop')}
    function goArena() {navigate('/arena')}
    function goMain() {navigate('/mainWindow')}

    return (
        <div className="ps-5 header d-flex justify-content-start align-items-center">
            <button className="button me-4" onClick={goShop}>Shop</button>
            {pathname === "/mainWindow"
                ?
                <button className="button" onClick={goArena}>Arena</button>
                :
                <button className="button" onClick={goMain}>Main</button>
            }


        </div>
    );
};

export default MainHeader;