import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userListAtom } from "../atoms/userData";

const BoardDetail = () => {
    const [list, setList] = useState();
    const [prevList, setPrevList] = useState();
    const [nextList, setNextList] = useState();
    const [userIndex, setUserIndex] = useState(window.location.pathname);

    const [userIdx, setUserIdx] = useState(0);
    const [idIdx, setIdIdx] = useState(0);
    const userList = useRecoilValue(userListAtom);
    const [checkData, setCheckData] = useState(false);

    useLayoutEffect(() => {
        let urlList = [];
        urlList = window.location.pathname.split("/");
        setUserIdx(Number(urlList[3]));
        setIdIdx(Number(urlList[2]));
    }, []);

    useLayoutEffect(() => {
        if (userIdx !== 0) {
            filtering();
        }
    }, [userIdx]);

    const filtering = () => {
        userList.map((item, index) => {
            if (userIdx === Number(item["id"]) && idIdx === Number(item["userId"])) {
                setList(item);
            } else if (userIdx === Number(item["id"]) - 1 && idIdx === Number(item["userId"])) {
                setPrevList(item);
            } else if (userIdx === Number(item["id"]) + 1 && idIdx === Number(item["userId"])) {
                setNextList(item);
            }
        });
        setCheckData(true);
    };

    const prevButton = () => {
        setUserIdx((prev) => prev - 1);
    };

    const nextButton = () => {
        setUserIdx((prev) => prev + 1);
    };

    return (
        <div style={{ padding: "50px 0px", width: "100%", height: "100%" }}>
            <div style={{ width: "100%", height: "100%" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            margin: "auto",
                            height: "100px",
                            width: "200px",
                            fontSize: "40px",
                        }}
                    >
                        현재글
                    </div>
                    {checkData && (
                        <div
                            style={{
                                padding: "0px 50px",
                                flexGrow: 1,
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <div style={{ flexGrow: 1 }}>
                                <div style={{ fontSize: "25px" }}>userId</div>
                                <div>{list["userId"]}</div>
                            </div>
                            <div style={{ flexGrow: 1 }}>
                                <div style={{ fontSize: "25px" }}>id</div>
                                <div>{list["id"]}</div>
                            </div>
                            <div style={{ flexGrow: 1 }}>
                                <div style={{ fontSize: "25px" }}>title</div>
                                <div>{list["title"]}</div>
                            </div>
                            <div style={{ flexGrow: 1 }}>
                                <div style={{ fontSize: "25px" }}>completed</div>
                                <div>{`${list["completed"]}`}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <div>
                    <div>
                        {checkData && (
                            <div style={{ padding: "30px 50px" }}>
                                <button onClick={prevButton}>이전글</button>
                                <button onClick={nextButton}>다음글</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div>{checkData && <div style={{ padding: "30px 50px" }}></div>}</div>
                </div>
            </div>
        </div>
    );
};

export default BoardDetail;
