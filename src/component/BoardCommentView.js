import { useEffect, useState } from "react";
import peopleImage from "../image/people.png";
import {useRecoilState} from "recoil";
import {boardCommentsListAtom} from "../atoms/userData";
import {DeleteComment, ReadComment, UpdateComment} from "../model/model";

export default function BoardCommentView(props) {
    const people = props.commentList;
    const boardId = props.boardId;
    const name = props.name;
    const [comments, setComments] = useRecoilState(boardCommentsListAtom)
    const [commentNum, setCommentNum] = useState(1);
    const [editMode, setEditMode] = useState(false);
    const [editNum, setEditNum] = useState();
    const [editText, setEditText] = useState("");

    useEffect(() => {
        setCommentNum(1);
    }, [people]);

    const ChangeNum = () => {
        setCommentNum(people.length);
    };

    const DeleteComments = (e) => {
        // let list = comments;
        // const target = list.filter((value)=>value["id"] !== e["id"])
        // setComments(target);
        // console.log(target);

        DeleteComment(e.id);
        const aa = ReadComment(e.postId)
        console.log(aa)
    }

    const EditComment = (e) =>{
        setEditMode(prev => !prev);
        setEditText(e["body"]);
        setEditNum(e["id"]);
    }

    const ChangeComment = (e) => {
        let list = JSON.parse(JSON.stringify(comments));
        list.map((item, index)=>{
            if(item["id"] === e["id"]){
                list[index].body = editText;
            }
        })
        setEditMode(prev => !prev);
        setComments(list);
    }

    return (
        <div>
            <div className="flow-root mt-6">
                <div style={{ padding: "24px 0px" }}>{`number of comments : ${people.length}`}</div>
                <ul role="list" className="-my-5 divide-y divide-gray-200">
                    {people.map((person, index) => {
                        if (index <= commentNum) {
                            return (
                                <li key={index} className="py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src={peopleImage}
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {person.name}
                                            </p>
                                            {(!editMode || person.id !== editNum) &&
                                                <p className="text-sm text-gray-500 truncate">
                                                {"@" + person.body}
                                            </p> }
                                            {(editMode && person.id === editNum)&&
                                                <textarea
                                                    className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm"
                                                          value={editText}
                                                          onChange={(e)=>{
                                                              setEditText(e.target.value);
                                                          }}
                                                    style={{borderStyle:"solid", borderWidth:"1px"}} />
                                            }
                                        </div>
                                        {name !== person.name && <div>
                                            {(!editMode || person.id !== editNum) && <>
                                                <button
                                                    onClick={() => {
                                                        DeleteComments(person);
                                                    }}
                                                    className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        EditComment(person);
                                                    }}
                                                    className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                                                    edit
                                                </button>
                                            </>}
                                            {(editMode && person.id === editNum) &&
                                                <button
                                                onClick={()=>{
                                                    ChangeComment(person);
                                                }}
                                                    className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                                                Change
                                            </button>}
                                        </div>}
                                    </div>
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>

            <div className="mt-6">
                {commentNum !== people.length && (
                    <div
                        onClick={ChangeNum}
                        className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        View all
                    </div>
                )}
            </div>
        </div>
    );
}
