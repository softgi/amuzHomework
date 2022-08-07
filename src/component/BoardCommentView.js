import { useEffect, useState } from "react";
import peopleImage from "../image/people.png";

export default function BoardCommentView(props) {
    const people = props.commentList;
    const [commentNum, setCommentNum] = useState(1);

    useEffect(() => {
        setCommentNum(1);
    }, [people]);

    const changeNum = () => {
        setCommentNum(people.length);
    };
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
                                            <p className="text-sm text-gray-500 truncate">
                                                {"@" + person.body}
                                            </p>
                                        </div>
                                        <div>
                                            <div className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                                                View
                                            </div>
                                        </div>
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
                        onClick={changeNum}
                        className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        View all
                    </div>
                )}
            </div>
        </div>
    );
}
