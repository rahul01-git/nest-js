// src/app.module.ts
import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { MoviesModule } from './movies/movies.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { ConfigModule as CustomConfigModule } from './config/config.module';

@Module({
  imports: [
    CustomConfigModule,
    SequelizeModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: +configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME', 'movies'),
        autoLoadModels: true,
        synchronize: false,
        logging: false,
      }),
    }),
    BooksModule,
    MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
