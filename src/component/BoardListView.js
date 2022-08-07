/* This example requires Tailwind CSS v2.0+ */
import { NavLink } from "react-router-dom";

export default function BoardListView(props) {
    const boardList = props.boardList;
    const boardIdx = props.boardIdx;
    return (
        <div className="flow-root">
            <ul role="list" className="-mb-8">
                {boardList.map((event, eventIdx) => (
                    <NavLink
                        key={eventIdx}
                        to={{ pathname: `/boardDetail/${boardIdx}/${event.id}` }}
                    >
                        <li key={event.id}>
                            <div className="relative pb-8">
                                {eventIdx !== boardList.length - 1 ? (
                                    <span
                                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                        aria-hidden="true"
                                    />
                                ) : null}
                                <div className="relative flex space-x-3">
                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                        <div>
                                            <div className="text-sm text-gray-500">
                                                {eventIdx + 1}
                                                <div className="font-medium text-gray-900">
                                                    {event.title}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </NavLink>
                ))}
            </ul>
        </div>
    );
}
