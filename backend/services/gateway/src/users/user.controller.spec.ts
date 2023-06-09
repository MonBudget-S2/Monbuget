import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import * as module from "module";
import {UserServiceMock} from "./mocks/user.service.mock";
import {userMock} from "./mocks/user.mock";
import {JwtService} from "@nestjs/jwt";
import {UserModule} from "./user.module";
import {ClientProxyFactory} from "@nestjs/microservices";
import { JwtModule } from '@nestjs/jwt';

describe('UserController', () => {
    let controller: UserController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                { provide : UserService, useClass: UserServiceMock },
                { provide: JwtService, useValue: {} },
                {
                    provide: 'USER_SERVICE',
                    useFactory: () => ClientProxyFactory.create({}),
                },
            ],
            imports: [UserModule,JwtModule],
        }).compile();

        controller = app.get<UserController>(UserController);
    });

    it('should be defined',() => {
        expect(controller).toBeDefined();
    });

    describe("getAllUsers", () => {
        it('should return an array of user', () => {
            expect(controller.getAllUsers()).resolves.toEqual(userMock);
        });
    });

    describe("getUserById", () => {
        it('should return a single user', () => {
            const id = "d4b69e8f-8bbd-406e-aa2c-e9982ea92da0";
            const u = userMock.find(u => u.id === id)
            expect(controller.getUserById("d4b69e8f-8bbd-406e-aa2c-e9982ea92da0",userMock[0])).resolves.toEqual(u);
        });
    });
});
