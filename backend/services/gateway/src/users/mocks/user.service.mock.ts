import {userMock} from "./user.mock";

export class UserServiceMock {
    getAllUsers = jest.fn().mockResolvedValue(userMock)
}