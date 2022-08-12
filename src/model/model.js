import {Model, ORM, fk, attr} from "redux-orm";
import { createStore, combineReducers } from "redux";
import { createReducer } from "redux-orm";

class User extends Model {}
User.modelName = 'User';

class Board extends Model {}
Board.modelName = 'Board';

export class Comment extends Model {}
Comment.modelName = 'Comment';

export const orm = new ORM;
orm.register(User, Board);

const rootReducer = combineReducers({
    orm: createReducer(orm), // This will be the Redux-ORM state.
    // … potentially other reducers
});
const store = createStore(rootReducer);

const session = orm.session();

export function ReadUser(){
    let user = session.User.all().toModelArray();
    let userList = [];
    user.map((item)=>{
        userList.push(item._fields);
    })
    return userList;
}

export function CreateUser(id, name, company) {
    session.User.create({
        id: id,
        name: name,
        company : company
    });
}

export function ReadBoard(userId, completed) {
    let board;
    if(userId){
        board = session.Board.all().filter(
            item => item.userId === Number(userId)
        ).toModelArray();
    }else{
        board = session.Board.all().toModelArray();
    }

    let boardList = [];
    board.map((item)=>{
        boardList.push(item._fields);
    })
    return boardList;
}

export function CreateBoard(id, userId, title, completed) {
    session.Board.create({
        id : id,
        userId : userId,
        title : title,
        completed : completed
    })
}

export function ReadComment() {
    let comment = session.Comment.all().toModelArray();
    let commentList = [];
    comment.map((item)=>{
        commentList.push(item._fields);
    })
    return commentList;
}

export function CreateComment(id, postId, name, email, body) {
    session.Comment.create({
        id : id,
        postId : postId,
        name : name,
        email : email,
        body : body
    })
}

export function DeleteComment(id){
    session.Comment.all().filter().orderBy()
}