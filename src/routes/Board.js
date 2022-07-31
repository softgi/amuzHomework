import { useEffect, useLayoutEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userListAtom } from "../atoms/userData";
import ListView from "../component/ListView";
import TitleView from "../component/TitleView";

const Board = () => {
    const [list, setList] = useState([]);
    let params = useParams();
    const userIdx = Number(params.userId);
    const userList = useRecoilValue(userListAtom);
    const [checkText, setCheckText] = useState("");

    useEffect(() => {
        const pushList = userList.filter(function (e) {
            return e.userId === userIdx;
        });
        setList(pushList);
    }, []);

    const changeFilter = (completedText) => {
        const pushList = [];
        setCheckText(completedText);
        userList.map((item, index) => {
            if (completedText !== "all") {
                if (completedText === "true") {
                    if (userIdx === Number(item["userId"]) && item["completed"]) {
                        pushList.push(item);
                    }
                } else {
                    if (userIdx === Number(item["userId"]) && !item["completed"]) {
                        pushList.push(item);
                    }
                }
            } else {
                if (userIdx === Number(item["userId"])) {
                    pushList.push(item);
                }
            }
        });
        setList(pushList);
    };

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
            <TitleView userId={userIdx} name={"게시글 리스트"} list={list} />
            <div>
                <button
                    disabled={checkText === "all" || checkText === ""}
                    onClick={() => {
                        changeFilter("all");
                    }}
                >
                    all
                </button>
                <button
                    disabled={checkText === "true"}
                    onClick={() => {
                        changeFilter("true");
                    }}
                >
                    completed
                </button>
                <button
                    disabled={checkText === "false"}
                    onClick={() => {
                        changeFilter("false");
                    }}
                >
                    incompleted
                </button>
            </div>
            {list.map((item, index) => {
                return (
                    <NavLink key={index} to={{ pathname: `/boardDetail/${userIdx}/${item.id}` }}>
                        <ListView
                            number={item.id - (Number(item.userId) - 1) * 20}
                            contents={item.title}
                        />
                    </NavLink>
                );
            })}
        </div>
    );
};

export default Board;
