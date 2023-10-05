export const authenticateAdmin = (username) =>{
    let token = localStorage.getItem("auth")

    if(!token)
    return false;

    let role = localStorage.getItem("role")
    if(role == "ROLE_ADMIN"){
        let name = localStorage.getItem("name")
        return username == name
    }
    return false;
    
}

export const authenticateCustomer = (username) =>{
    let token = localStorage.getItem("auth")

    if(!token)
    return false;

    let role = localStorage.getItem("role")
    if(role == "ROLE_CUSTOMER"){
        let name = localStorage.getItem("name")
        return username == name
    }
    return false;
    
}

export const authenticateAgent = (username) =>{
    let token = localStorage.getItem("auth")

    if(!token)
    return false;

    let role = localStorage.getItem("role")
    if(role == "ROLE_AGENT"){
        let name = localStorage.getItem("name")
        return username == name
    }
    return false;
    
}

export const authenticateEmployee = (username) =>{
    let token = localStorage.getItem("auth")

    if(!token)
    return false;

    let role = localStorage.getItem("role")
    if(role == "ROLE_EMPLOYEE"){
        let name = localStorage.getItem("name")
        return username == name
    }
    return false;
    
}