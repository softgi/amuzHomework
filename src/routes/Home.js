import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userListAtom } from "../atoms/userData";
import ListView from "../component/ListView";
import TitleView from "../component/TitleView";

const Home = () => {
    const [filterList, setFilterList] = useState([]);
    const [userList, setUserList] = useRecoilState(userListAtom);

    const getData = async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
            res.json()
        );
        setUserList(res);
        const pushData = [];

        res.filter((item1, i) => pushData.push(item1["userId"]));
        const pushList = Array.from(new Set(pushData));
        setFilterList(pushList);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "pink",
            }}
        >
            <TitleView name={"유저 리스트"} list={filterList} />
            {filterList.map((item, index) => {
                return (
                    <NavLink key={index} to={{ pathname: `/board/${item}` }}>
                        <ListView contents={item} />
                    </NavLink>
                );
            })}
        </div>
    );
};

export default Home;
