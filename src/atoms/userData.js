import { atom } from "recoil";

export const boardListAtom = atom({
    key: "boardListState",
    default: [],
});

export const userListAtom = atom({
    key: "userListState",
    default: [],
});

export const boardCommentsListAtom = atom({
    key: "boardCommentsListState",
    default: [],
});
