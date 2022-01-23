import React from 'react';
import {Link} from "react-router-dom";


const StartGame = () => {

    return (
        <div className="d-flex align-items-center justify-content-center" style={{
            background: `url('https://i.imgur.com/lfW8VnQ.jpg') no-repeat center center fixed`,
            height: "100vh"
        }}>
            <div style={{width: "50%"}}>
                <Link to="/charCreate">
                    <div style={{width: "100%"}}
                         className="boxHover blur d-flex justify-content-center align-items-center">
                        <h1 style={{
                            fontSize: "4rem",
                            letterSpacing: "0.4rem"
                        }} className="textHover">Start Game</h1>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default StartGame;