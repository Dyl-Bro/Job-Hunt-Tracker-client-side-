
export default function authenticationHeader() {
    const user = JSON.parse(localStorage.getItem('userAuth'));
    if(user && user.token){
        return {'x-access-token': user.token};
    } else {
        return {};
    }
};