import React from "react";
import { NavLink } from "react-router-dom";

export const TitleView = (props) => {
    return (
        <>
            <div style={{ backgroundColor: "pink" }}>
                <NavLink to={{ pathname: "/" }}>
                    <button>home</button>
                </NavLink>
            </div>
            <div style={{ margin: " auto", height: "100px" }}>
                <div style={{ fontSize: "40px" }}>
                    {props.userId !== undefined && `${props.userId}의`} {props.name}
                </div>
                <div style={{ fontSize: "20px" }}>
                    {/* {props.list.length } */}
                    {props.name === "유저 리스트" ? props.list.length + "명" : ""}
                    {props.name === "게시글 리스트" ? props.list.length + "개" : ""}
                </div>
            </div>
        </>
    );
};

export default TitleView;
