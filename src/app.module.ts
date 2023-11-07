import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RefugiosModule } from './refugios/refugios.module';
import { UsuariosRefugiosModule } from './usuarios_refugios/usuarios_refugios.module';
import { AnimalesModule } from './animales/animales.module';
import { RedesSocialesModule } from './redes_sociales/redes_sociales.module';
import { AnimalTipoModule } from './animal_tipo/animal_tipo.module';
import { AnimalEstadoModule } from './animal_estado/animal_estado.module';
import { EventosModule } from './eventos/eventos.module';
import { PublicacionesModule } from './publicaciones/publicaciones.module';
import { TurnosModule } from './turnos/turnos.module';
import { EstadoTurnosModule } from './estado_turnos/estado_turnos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '8denoviembre',
      database: 'bestiefindertesis',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    RefugiosModule,
    UsuariosRefugiosModule,
    AnimalesModule,
    RedesSocialesModule,
    AnimalEstadoModule,
    AnimalTipoModule,
    EventosModule,
    PublicacionesModule,
    TurnosModule,
    EstadoTurnosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
