import { Route, Routes, BrowserRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./app/Home";
import Board from "./app/Board";
import BoardDetail from "./app/BoardDetail";

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route path="/board/:userId" element={<Board />}></Route>
                <Route path="/boardDetail/:userID/:id" element={<BoardDetail />}></Route>
            </Routes>
        </div>
    );
};

export default App;
