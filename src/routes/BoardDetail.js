import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { boardCommentsListAtom, boardListAtom, userListAtom } from "../atoms/userData";
import ListView from "../component/ListView";
import TitleView from "../component/TitleView";
import BoardDetailConponent from "../component/BoardDetailConponent";
import BoardCommentView from "../component/BoardCommentView";
import AddCommentConponent from "../component/AddCommentConponent";
import {boards, CreateComment, DeleteComment, ReadComment} from "../model/model";

const BoardDetail = () => {
    const params = useParams();
    const userId = params.userId;
    const boardId = params.id;

    const userList = useRecoilValue(userListAtom);
    const boardList = useRecoilValue(boardListAtom);
    const [comments, setComments] = useRecoilState(boardCommentsListAtom);
    const [commentList, setCommentList]= useState([]);
    const [nowDetail, setNowDetail] = useState();
    const [prevDetail, setPrevDetail] = useState("no-item");
    const [nextDetail, setNextDetail] = useState("no-item");

    const getBoardComments = async () => {
        if (comments.length === 0) {
            const res = await fetch(
                `https://jsonplaceholder.typicode.com/comments`
            ).then((res) => res.json());
            let commentCheck = res.filter((value) => value["postId"] === Number(boardId))
            setComments(res);
            setCommentList(commentCheck);
            saveComment(res);
        } else {
            let commentCheck = comments.filter((value) => value["postId"] === Number(boardId));
            setCommentList(commentCheck);
        }
    };

    const saveComment = (res) => {
        res.map((item)=>{
            CreateComment(item.id, item.postId, item.name, item.email, item.body)
        })
    }


    useEffect(() => {
        getBoardComments();
    }, [comments]);

    useEffect(() => {
        getBoardComments();
        const pushList = boardList.filter(function (e) {
            return e.userId === Number(userId);
        });
        const nowList = boardList.filter(function (e) {
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
        <>
            <TitleView />
            <div style={{ padding: "24px" }}>
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <BoardDetailConponent
                        title={`${userList[userId - 1].name}'s number ${
                            boardId - (Number(userId) - 1) * 20
                        } board`}
                        content={nowDetail}
                    />
                </div>
                <AddCommentConponent name={userList[userId - 1].name} boardId={boardId} />
                {commentList.length !== 0 ? (
                    <BoardCommentView name={userList[userId - 1].name} boardId={boardId} commentList={commentList} />
                ) : (
                    <div style={{ width: "100%" }}>
                        <div style={{ width: "150px", margin: "auto" }}>댓글이 없습니다.</div>
                    </div>
                )}
                <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                    {prevDetail !== "no-item" && (
                        <div style={{ width: "50%" }}>
                            <NavLink
                                to={{ pathname: `/boardDetail/${userId}/${Number(boardId) - 1}` }}
                            >
                                <ListView type="prev" contents={prevDetail} />
                            </NavLink>
                        </div>
                    )}
                    <div style={{ width: "50%" }}>
                        {nextDetail !== "no-item" && (
                            <NavLink
                                to={{ pathname: `/boardDetail/${userId}/${Number(boardId) + 1}` }}
                            >
                                <ListView type="next" contents={nextDetail} />
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BoardDetail;
