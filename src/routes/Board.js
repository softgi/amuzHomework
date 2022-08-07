import { useEffect, useLayoutEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { boardListAtom, userListAtom } from "../atoms/userData";
import TitleView from "../component/TitleView";
import BoardListView from "../component/BoardListView";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const tabs = [
    { name: "all", href: "#", current: true, filter: "all" },
    { name: "completed", href: "#", current: false, filter: "true" },
    { name: "incompleted", href: "#", current: false, filter: "false" },
];

const Board = () => {
    const [list, setList] = useState([]);
    let params = useParams();
    const boardIdx = Number(params.userId);
    const boardList = useRecoilValue(boardListAtom);
    const userList = useRecoilValue(userListAtom);
    const [checkText, setCheckText] = useState("all");

    useEffect(() => {
        const pushList = boardList.filter(function (e) {
            return e.userId === boardIdx;
        });
        setList(pushList);
    }, []);

    const changeFilter = (completedText) => {
        const pushList = [];
        setCheckText(completedText);
        boardList.map((item, index) => {
            if (completedText !== "all") {
                if (completedText === "true") {
                    if (boardIdx === Number(item["userId"]) && item["completed"]) {
                        pushList.push(item);
                    }
                } else {
                    if (boardIdx === Number(item["userId"]) && !item["completed"]) {
                        pushList.push(item);
                    }
                }
            } else {
                if (boardIdx === Number(item["userId"])) {
                    pushList.push(item);
                }
            }
        });
        setList(pushList);
    };

    return (
        <>
            <TitleView userId={userList[boardIdx - 1].name} name={"BoardList"} list={list} />

            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    padding: "24px",
                }}
            >
                <div>
                    <div className="pb-5 border-b border-gray-200 sm:pb-0">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Selected</h3>
                        <div className="mt-3 sm:mt-4">
                            <div className="sm:hidden">
                                <label htmlFor="current-tab" className="sr-only">
                                    Select a tab
                                </label>
                                <select
                                    id="current-tab"
                                    name="current-tab"
                                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    defaultValue={tabs.find((tab) => tab.current).name}
                                >
                                    {tabs.map((tab) => (
                                        <option key={tab.name}>{tab.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="hidden sm:block">
                                <nav className="-mb-px flex space-x-8">
                                    {tabs.map((tab) => (
                                        <div
                                            key={tab.name}
                                            onClick={() => changeFilter(tab.filter)}
                                            className={classNames(
                                                checkText === tab.filter
                                                    ? "border-indigo-500 text-indigo-600"
                                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                                                "whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                                            )}
                                            aria-current={tab.current ? "page" : undefined}
                                        >
                                            {tab.name}
                                        </div>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <BoardListView boardIdx={boardIdx} boardList={list} />
                </div>
            </div>
        </>
    );
};

export default Board;
