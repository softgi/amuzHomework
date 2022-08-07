/* This example requires Tailwind CSS v2.0+ */
import { MailIcon, PhoneIcon } from "@heroicons/react/solid";
import { NavLink } from "react-router-dom";
import image1 from "../image/imageIdx1.png";
import image2 from "../image/imageIdx2.png";
import image3 from "../image/imageIdx3.png";
import image4 from "../image/imageIdx4.png";
import image5 from "../image/imageIdx5.png";
import image6 from "../image/imageIdx6.png";
import image7 from "../image/imageIdx7.png";
import image8 from "../image/imageIdx8.png";
import image9 from "../image/imageIdx9.png";
import image10 from "../image/imageIdx10.png";

function UserListView(props) {
    const people = props.list;
    const imageList = [
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
        image8,
        image9,
        image10,
    ];
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {people.map((person, index) => (
                <NavLink key={index} to={{ pathname: `/board/${index + 1}` }}>
                    <div
                        key={person.email}
                        className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                        <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={imageList[index]} alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="focus:outline-none">
                                <span className="absolute inset-0" aria-hidden="true" />
                                <p className="text-sm font-medium text-gray-900">{person.name}</p>
                                <p className="text-sm text-gray-500 truncate">{`company: ${person.company.name}`}</p>
                            </div>
                        </div>
                    </div>
                </NavLink>
            ))}
        </div>
    );
}

export default UserListView;
