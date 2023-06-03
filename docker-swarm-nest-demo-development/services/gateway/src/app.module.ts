import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { PostsModule } from "./posts/posts.module";
import { PostsService } from "./posts/posts.service";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [HttpModule, PostsModule, UsersModule],
  providers: [PostsService],
})
export class AppModule {}
