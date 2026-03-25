export type AuthState = {
    isAuthencated: boolean;
    username: string;
    accessToken: string;
    refreshToken: string;
}

const initialState: AuthState = {
    isAuthencated: false,
    username: "",
    accessToken: "",
    refreshToken: ""
}

export type AuthAction = {
    type: string;
    payload?: AuthState;
}

export const authReducer = (state = initialState, action: AuthAction) => {
    switch (action.type) {
        case "login":
            if(action.payload){
                return action.payload;
            }
        case "logout":
            return { ...initialState };
        default:
            return state;
    }
}