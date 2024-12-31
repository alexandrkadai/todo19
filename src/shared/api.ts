export type User = {
    id: string;
    email: string;
  };
  
export function fetchUsers(){
    return fetch("http://localhost:3001/users");
}

export function createUser(user:User){
    return fetch("http:localhost:3001/users",{
        method: "POST",
        headers: {
            "Content-Type": "apllication/json",
        },
        body: JSON.stringify(user),}).then(res => res.json());
    }

export function deleteUser(id: string){
    return fetch(`http:localhost:3001/users/${id}`,{
        method: 'Delete',

    }).then(res => res.json());
}