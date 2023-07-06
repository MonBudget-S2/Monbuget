import {userMock} from "./user.mock";

export class UserServiceMock {
    getAllUsers = jest.fn().mockResolvedValue(userMock)
    getUserById = jest.fn().mockImplementation((id:string)=>{
        return Promise.resolve(userMock.find(u => u.id === id) )
    })
}