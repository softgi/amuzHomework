import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userListAtom } from "../atoms/userData";
import ListView from "../component/ListView";
import TitleView from "../component/TitleView";

const BoardDetail = () => {
    const params = useParams();
    const userId = params.userId;
    const boardId = params.id;

    const userList = useRecoilValue(userListAtom);
    const [nowDetail, setNowDetail] = useState();
    const [prevDetail, setPrevDetail] = useState("no-item");
    const [nextDetail, setNextDetail] = useState("no-item");

    useEffect(() => {
        const pushList = userList.filter(function (e) {
            return e.userId === Number(userId);
        });
        const nowList = userList.filter(function (e) {
            return e.id === Number(boardId);
        });
        const prevList = pushList.filter(function (e) {
            return e.id === Number(boardId) - 1;
        });
        const nextList = pushList.filter(function (e) {
            return e.id === Number(boardId) + 1;
        });

        setNowDetail(nowList[0].title);
        if (prevList.length !== 0) {
            setPrevDetail(prevList[0].title);
        } else {
            setPrevDetail("no-item");
        }
        if (nextList.length !== 0) {
            setNextDetail(nextList[0].title);
        } else {
            setNextDetail("no-item");
        }
    }, [params]);

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
            <TitleView name={`${userId}씨의 ${boardId - (Number(userId) - 1) * 20}번 게시글`} />
            <ListView type={"detail"} contents={nowDetail} />
            {prevDetail !== "no-item" && (
                <div>
                    <NavLink to={{ pathname: `/boardDetail/${userId}/${Number(boardId) - 1}` }}>
                        <ListView type="prev" contents={prevDetail} />
                    </NavLink>
                </div>
            )}
            <div>
                {nextDetail !== "no-item" && (
                    <NavLink to={{ pathname: `/boardDetail/${userId}/${Number(boardId) + 1}` }}>
                        <ListView type="next" contents={nextDetail} />
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default BoardDetail;
