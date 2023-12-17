import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserModule } from 'src/users/user.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'postgres',
          host: process.env.DB_HOST, //process.env.DB_HOST,
          port: +process.env.DB_PORT, //+process.env.DB_PORT,
          username: process.env.DB_USER, // process.env.DB_USER,
          password: process.env.DB_PWD, //process.env.DB_PWD,
          database: process.env.DB_NAME, //process.env.DB_NAME, // process.env.DB_NAME,
          synchronize: process.env.NODE_ENV !== 'production',
          logging: process.env.NODE_ENV !== 'production',
          entities: [__dirname + './../**/**.entity{.ts,.js}'],
        };
      },
    }),
  ],
})
export class DatabaseModule {}
