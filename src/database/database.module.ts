import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/Users';
import { UserModule } from 'src/users/user.module';

@Module({
  // imports: [
  //   TypeOrmModule.forRoot({
  //     type: 'postgres',
  //     host: 'localhost', //process.env.DB_HOST,
  //     port: 5432, //+process.env.DB_PORT,
  //     username: 'pilsungchoi', // process.env.DB_USER,
  //     password: 'cps159753', //process.env.DB_PWD,
  //     database: 'postgres', // process.env.DB_NAME,
  //     synchronize: true,
  //     logging: true,
  //     entities: [User],
  //   }),
  //   UserModule,
  // ],
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'postgres',
          host: process.env.DB_HOST,
          port: +process.env.DB_PORT,
          username: process.env.DB_USER,
          password: process.env.DB_PWD,
          database: process.env.DB_NAME,
          synchronize: process.env.NODE_ENV !== 'production',
          logging: process.env.NODE_ENV !== 'production',
          entities: [__dirname + './../**/**.entity{.ts,.js}'],
        };
      },
    }),
    UserModule,
  ],
})
export class DatabaseModule {}
