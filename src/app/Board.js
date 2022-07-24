import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userListAtom } from "../atoms/userData";

const Board = () => {
    const [list, setList] = useState();
    let userIndex = window.location.pathname;
    const [userIdx, setUserIdx] = useState(0);
    const userList = useRecoilValue(userListAtom);
    const [checkData, setCheckData] = useState(false);

    useEffect(() => {
        console.log("맞냐?", userList);
        setUserIdx(Number(userIndex.replace("/board/", "")));

        console.log(userIdx);
    }, []);

    useEffect(() => {
        filtering();
    }, [userIdx]);

    const filtering = () => {
        const pushList = [];
        userList.map((item, index) => {
            if (userIdx === Number(item["userId"])) {
                pushList.push(item);
            }
        });
        setList(pushList);
        setCheckData(true);
    };

    const changeFilter = (completedText) => {
        const pushList = [];
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
        <div>
            <button
                onClick={() => {
                    changeFilter("all");
                }}
            >
                all
            </button>
            <button
                onClick={() => {
                    changeFilter("true");
                }}
            >
                completed
            </button>
            <button
                onClick={() => {
                    changeFilter("false");
                }}
            >
                incompleted
            </button>
            <table>
                <thead>
                    <tr>
                        <td>userId</td>
                        <td>id</td>
                        <td>title</td>
                        <td>completed</td>
                    </tr>
                </thead>
                <tbody>
                    {checkData &&
                        list.map((v, i) => {
                            if (userIdx === Number(v["userId"])) {
                                return (
                                    <tr>
                                        <td>{v["userId"]}</td>
                                        <td>{v["id"]}</td>
                                        <Link
                                            to={{
                                                pathname: `/boardDetail/${userIdx}/${v["id"]}`,
                                            }}
                                        >
                                            <td>{v["title"]}</td>
                                        </Link>
                                        <td>{`${v["completed"]}`}</td>
                                    </tr>
                                );
                            }
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default Board;
