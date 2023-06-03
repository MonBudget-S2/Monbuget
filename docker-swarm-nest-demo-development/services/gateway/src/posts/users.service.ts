import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import axios from "axios";
import { catchError, map, of } from "rxjs";

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  // async register(body: unknown): Promise<any>
  async register(body: unknown) {
    // const userMicroserviceUrl = 'http://user-microservice/register';

    // // Forward the request to the user microservice
    // return this.httpService.post(userMicroserviceUrl, body).toPromise();

    // return this.httpService
    //   .get("http://challenge-users-service:3000/users/register")
    //   .pipe(map((response) => response.data));

    try {
      const response = await axios.post(
        "http://challenge-users-service:3000/users/register",
        body
      );
      return response.data;
    } catch (error) {
      console.error("Error calling user microservice:", error);
      return { error: "Error calling user microservice", errorDetails: error };
    }
  }

  async login(body: unknown) {
    try {
      const response = await axios.post(
        "http://challenge-users-service:3000/users/login",
        body
      );
      return response.data;
    } catch (error) {
      console.error("Error calling user microservice:", error);
      return { error: "Error calling user microservice", errorDetails: error };
    }
  }
}
