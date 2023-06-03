import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { UsersService } from "./users.service";

@Module({
  imports: [HttpModule],
  controllers: [PostsController],
  providers: [PostsService, UsersService],
})
export class PostsModule {}
