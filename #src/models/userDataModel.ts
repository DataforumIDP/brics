

export type UserData = {
    id: string,
    partner_id: string,
    name: string;
    surname: string;
    lastname?: string;
    passport?: string;
    organization?: string;
    grade?: string;
    mail?: string;
    phone?: string;
    country?: string;
    city?: string;
    type: string;
    created: boolean;
    accreditation: boolean;
    timestamp: string;
    activity?: string;
}

let userData:UserData 

export const setUserData = (data: UserData)=>{
    userData = data
}

export const getUserData = ()=>{
    return userData
}