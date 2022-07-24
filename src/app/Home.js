import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userListAtom } from "../atoms/userData";

const Home = () => {
    const [filterList, setFilterList] = useState([]);
    const [userList, setUserList] = useRecoilState(userListAtom);

    const getData = async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
            res.json()
        );
        setUserList(res);
        const pustList = [];
        for (let i = 0; i < res.length; i++) {
            if (!pustList.includes(res[i]["userId"])) {
                pustList.push(res[i]["userId"]);
            }
        }
        console.log(pustList);
        setFilterList(pustList);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div style={{ width: "100%", height: "100%", display: "block", direction: "column" }}>
            <div style={{ margin: "100px auto 0px", width: "100px", height: "100px" }}>
                <div style={{ fontSize: "40px" }}>userId</div>
            </div>
            <div style={{ width: "100%" }}>
                {filterList.map((v, i) => {
                    return (
                        <div style={{ margin: "30px auto", width: "100px" }}>
                            <button width="50px" height="50px">
                                <NavLink exact to={{ pathname: `/board/${v}` }}>
                                    {v}
                                </NavLink>
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
