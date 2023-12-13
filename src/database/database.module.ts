import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user';

@Module({
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
        };
      },
    }),
  ],
})
export class DatabaseModule {}

// @Module({
//   imports: [
//     TypeOrmModule.forRootAsync({
//       useFactory() {
//         return {
//           type: 'postgres',
//           host: 'db.vuqseyvrmvlezhuuxanm.supabase.co',
//           port: 5432,
//           username: 'postgres',
//           password: 'fourfour-go123!@',
//           database: 'shinnyang',
//           entities: [User],
//           synchronize: true,
//           logging: true,
//         };
//       },
//     }),
//   ],
// })
// export class DatabaseModule {}

// @Module({
//   imports: [
//     TypeOrmModule.forRootAsync({
//       useFactory() {
//         return {
//           type: 'postgres',
//           host: process.env.DB_HOST,
//           port: +process.env.DB_PORT,
//           username: process.env.DB_USER,
//           password: process.env.DB_PWD,
//           database: process.env.DB_NAME,
//           entities: [User],
//           synchronize: true,
//           logging: true,
//         };
//       },
//     }),
//   ],
// })
// export class DatabaseModule {}
