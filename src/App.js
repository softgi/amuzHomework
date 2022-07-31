import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./routes/Home";
import Board from "./routes/Board";
import BoardDetail from "./routes/BoardDetail";

const App = () => {
    return (
        <Routes>
            <Route exact="true" path="/" element={<Home />} />
            <Route path="/board/:userId" element={<Board />} />
            <Route path="/boardDetail/:userId/:id" element={<BoardDetail />} />
        </Routes>
    );
};

export default App;
