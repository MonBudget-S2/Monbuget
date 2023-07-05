/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { host, username, password, port } from './env';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: host,
  port: port,
  username: username,
  password: password,
  database: 'challengemeetings',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default config;
