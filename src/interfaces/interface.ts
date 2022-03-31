
interface controllerOutput{
    code: number,
    data: any
}

interface requestBody{
    from: string,
    to: string,
    text: string,
    currentUser: currentUser
}

interface currentUser{
    id: number,
    username: string,
}
export {controllerOutput,requestBody,currentUser}