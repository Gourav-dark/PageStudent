// export interface Auth {
// }
export interface registeredUser {
    name:string,
    age:number,
    address:string,
    email:string,
    phone:string,
    password:string,
    roleId:number
}
export interface loggedUser {
    id:string,
    name:string,
    age:number,
    address:string,
    email:string,
    phone:string,
    password:string
}
export interface loginUser {
    email:string,
    password:string,
}

