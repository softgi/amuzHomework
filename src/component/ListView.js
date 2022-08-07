import React from "react";
import { NavLink } from "react-router-dom";

const ListView = (props) => {
    return (
        <div>
            <div align="center" style={{ padding: "30px 50px", width: "100%" }}>
                {props.number !== undefined && <div>{props.number}</div>}

                {props.type === "detail" ? (
                    <div
                        style={{
                            width: "30%",
                            minHeight: "200px",
                            fontSize: "30px",
                            backgroundColor: "white",
                        }}
                    >
                        {props.contents}
                    </div>
                ) : (
                    <>
                        {props.type === "prev" && (
                            <div style={{ width: "30%", backgroundColor: "gray", color: "white" }}>
                                이전 글
                            </div>
                        )}
                        {props.type === "next" && (
                            <div style={{ width: "30%", backgroundColor: "gray", color: "white" }}>
                                다음 글
                            </div>
                        )}

                        <button
                            style={{
                                width: "30%",
                                minHeight: "120px",
                                borderStyle: "solid",
                                borderWidth: "1px",
                            }}
                        >
                            {props.contents}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ListView;
