



export const decodeToken = (token:string) =>{
    if(!token) return null;
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload))
}