import { gun } from "./gun";


export const user = gun.user().recall({ sessionStorage: true });


export const fetchUserPub = () => {
    if (user.is) {
        let pub = user.is.pub
        return pub
    }
}


export const fetchUserAlias = () => {
    if (user.is) {
        let alias = user.is.alias
        return alias
    }
}

export const setUserClass = (userClass) => {
    console.log(userClass)
    user.get("classes").set(userClass);
}




// export const fetchUser = () => {
//     return new Promise((resolve, reject) => {
//         user.get("profile").once((data) => {
//         if (data) {
//             resolve(data);
//         } else {
//             reject("no user");
//         }
//         });
//     });
//     };