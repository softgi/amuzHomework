import React from "react";
import { NavLink } from "react-router-dom";
import HomeImage from "../image/home.png";

export const TitleView = (props) => {
    return (
        <>
            {props.userId !== undefined ? (
                <>
                    <div>
                        <NavLink to={{ pathname: "/" }}>
                            <img src={HomeImage} style={{ width: "24px", height: "24px" }} />
                            <div>home</div>
                        </NavLink>
                    </div>
                    <div style={{ margin: " auto", height: "100px", padding: "0px 24px" }}>
                        <div style={{ fontSize: "40px" }}>
                            {props.userId !== undefined && `${props.userId}'s`} {props.name}
                        </div>
                        <div style={{ fontSize: "20px" }}>
                            {/* {props.list.length } */}
                            {props.name === "유저 리스트" ? props.list.length + " people" : ""}
                            {props.name === "BoardList"
                                ? "number of boards : " + props.list.length
                                : ""}
                        </div>
                    </div>
                </>
            ) : (
                <NavLink to={{ pathname: "/" }}>
                    <img src={HomeImage} style={{ width: "24px", height: "24px" }} />
                    <div>home</div>
                </NavLink>
            )}
        </>
    );
};

export default TitleView;
