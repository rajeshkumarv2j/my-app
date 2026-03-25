import {createStore} from 'redux';


const initialState = {
    messege: "Hello",
    count: 5
}

const reducer = (state = initialState, action)=> {

    if(action.type === "increment_ctr") {
        return {
            ...state,
            count: state.count + 1
        }
    }
    if(action.type === "update_ctr") {
        return {
            ...state,
            count: action.ctr
        }
    }
    return state;
}


const store = createStore(reducer);
console.log("State:", store.getState());


store.subscribe(() => {
    console.log("State updated", store.getState());
});

store.dispatch({type: "increment_ctr"});
// console.log("State:", store.getState());

store.dispatch({type: "update_ctr", ctr:10});
// console.log("State:", store.getState());