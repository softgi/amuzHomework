import {Model, ORM, fk, attr, createSelector, many} from "redux-orm";
import { createStore, combineReducers } from "redux";
import { createReducer } from "redux-orm";

class User extends Model {}
User.modelName = 'User';

export class Board extends Model {}
Board.modelName = 'Board';
Board.fields = {
    id : attr('Id', 'boards'),
    userId: attr(),
    title : attr(),
    completed: attr()
}

export class Comment extends Model {}
Comment.modelName = 'Comment';
Comment.fields={
    boardId : many({
        to: 'Board',
        as: 'boards',
        relatedName: 'comments',
    }),
    id : attr(),
    name : attr(),
    body: attr()
}

export class Post extends Model {}
Post.modelName = 'Post';
Post.fields={
    id : fk('Id', )
}

export const orm = new ORM;
orm.register(User, Board, Comment);

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
    session.User.upsert({
        id: id,
        name: name,
        company : company
    });
}

export function ReadBoard(userId, completed) {
    let board;
    if(userId){
        if(completed){
            board = session.Board.all().filter(
                item => (
                    item.userId === Number(userId) &&
                    `${item.completed}` === completed
                )
            ).toModelArray();
        }else {
            board = session.Board.all().filter(
                item => item.userId === Number(userId)
            ).toModelArray();
        }
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
    session.Board.upsert({
        id : id,
        userId : userId,
        title : title,
        completed : completed
    })
}

export function ReadComment(boardId) {
    let comment;
    if(boardId){
        comment = session.Comment.all().filter(
            item => item.postId === Number(boardId)
        ).toModelArray();
    }else {
        comment = session.Comment.all().toModelArray();
    }

    let commentList = [];
    comment.map((item)=>{
        commentList.push(item._fields);
    })
    return commentList;
}

export function CreateComment(id, postId, name, email, body) {
    session.Comment.upsert({
        id : id,
        postId : postId,
        name : name,
        email : email,
        body : body
    })
}


export function DeleteComment(id){
    let comm = session.Comment.withId(id);
    comm?.delete();
}

export function UpdateComment(id, body){
    let comm = session.Comment.withId(id);
    comm?.update({body: body});
}

// export const commentPostsSelector = createSelector(
//     [Board, Comment.comments],
//     (board, posts) => {
//         if (!posts) return [];
//         return posts.map((post) => ({
//             board: board.id,
//             id: post.id,
//             name: post.name,
//             body: post.body
//         }));
//     }
// );