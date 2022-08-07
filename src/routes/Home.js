import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userListAtom, boardListAtom } from "../atoms/userData";
import UserListView from "../component/UserListView";

const Home = () => {
    const [filterList, setFilterList] = useState([]);
    const [userList, setUserList] = useRecoilState(userListAtom);
    const [boardList, setBoardList] = useRecoilState(boardListAtom);

    const getUserData = async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
            res.json()
        );
        setUserList(res);
    };

    const getBoardData = async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
            res.json()
        );
        setBoardList(res);
    };

    useEffect(() => {
        getUserData();
        getBoardData();
    }, []);

    return (
        <>
            <div style={{ padding: "24px" }}>
                <UserListView list={userList} />
            </div>
        </>
    );
};

export default Home;
