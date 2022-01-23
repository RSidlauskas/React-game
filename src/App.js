import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Routes, Route} from "react-router-dom";
import StartGame from "./pages/StartGame";
import CharacterCreation from "./pages/CharacterCreation";
import MainWindow from "./pages/MainWindow";
import Shop from "./pages/Shop";
import Arena from "./pages/Arena";


function App() {




  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StartGame/>}/>
            <Route path="/charCreate" element={<CharacterCreation/>}/>
            <Route path="/mainWindow" element={<MainWindow/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/arena" element={<Arena/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
