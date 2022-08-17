import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userListAtom, boardListAtom } from "../atoms/userData";
import UserListView from "../component/UserListView";
import {commentPostsSelector, CreateBoard, CreateUser, ReadBoard, ReadUser} from "../model/model";

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

    const saveUserDB= () =>{
        userList.map((item)=>{
            CreateUser(item.id, item.name, item.company.name);
        });
    }

    const saveBoardDB = () =>{
        boardList.map((item)=>{
            CreateBoard(item.id, item.userId, item.title, item.completed);
        });
    }

    useEffect(() => {
        getUserData();
        getBoardData();
    }, []);

    useEffect(()=>{
        saveUserDB();
        saveBoardDB();
    },[userList, boardList])

    return (
        <>
            <div style={{ padding: "24px" }}>
                <UserListView list={userList} />
            </div>
        </>
    );
};

export default Home;
