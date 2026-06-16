export interface UserRegisterResponse{
    // message:string,
    user:{
     name?:string,
     email?:string,
     role?:string,
     createdAt?:Date
    },
    tokens:TokenPair
}

export interface TokenPair{
    accessToken:string,
    refreshToken:string
}