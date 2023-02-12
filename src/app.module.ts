import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ListsModule } from './modules/lists/lists.module';
import { MoviesModule } from './modules/movies/movies.module';

console.log(process.env.TYPEORM_CONNECTION)

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `env/${process.env.NODE_ENV}.env` }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db-mysql-nyc1-51813-do-user-4634685-0.b.db.ondigitalocean.com',
      port: 25060,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    ListsModule,
    MoviesModule,
  ],
  providers: []
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
