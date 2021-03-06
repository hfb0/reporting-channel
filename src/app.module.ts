import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DenunciationsModule } from './denunciations/denunciations.module';
import { AdressesModule } from './adresses/adresses.module';
import { MapquestModule } from './mapquest/mapquest.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmErrorsInterceptor } from './interceptors/typeorm-errors.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('PG_HOST'),
        port: configService.get<number>('PG_PORT'),
        username: configService.get<string>('PG_USERNAME'),
        password: configService.get<string>('PG_PASSWORD'),
        database: configService.get<string>('PG_DATABASE'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    DenunciationsModule,
    AdressesModule,
    MapquestModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TypeOrmErrorsInterceptor,
    },
  ],
})
export class AppModule {}
