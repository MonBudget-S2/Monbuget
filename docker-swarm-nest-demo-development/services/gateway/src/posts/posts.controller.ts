import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Post,
  UseFilters,
} from "@nestjs/common";
import { PostsExceptionFilter } from "./posts.filter";
import { PostsService } from "./posts.service";
import { UsersService } from "./users.service";

@Controller("posts")
@UseFilters(PostsExceptionFilter)
export class PostsController {
  public constructor(
    public readonly postsService: PostsService,
    public readonly usersServices: UsersService
  ) {}

  @Get()
  public getPosts() {
    return this.postsService.getPosts();
  }

  @Post()
  public createPost(@Body() body: unknown) {
    return this.postsService.createPost(body);
  }

  @Delete(":id")
  public deletePost(@Param("id") id: string, body: unknown) {
    return this.postsService.deletePost(id, body);
  }

  @Post("register")
  async register(@Body() body: unknown) {
    // Forward the request to the user microservice's register endpoint
    return this.usersServices.register(body);
  }

  @Post("login")
  async login(@Body() body: unknown) {
    // Forward the request to the user microservice's login endpoint
    return this.usersServices.login(body);
  }
}
