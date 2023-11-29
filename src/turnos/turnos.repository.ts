import { BadRequestException, HttpStatus, Injectable } from "@nestjs/common";
import { Turno } from "./entities/turno.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from "typeorm";
import { Animal } from "src/animales/entities/animal.entity";
import { CreateTurnoDto } from "./dto/create-turno.dto";
import { turnosDisponiblesDto } from "./dto/turnos-disponibles.dto";
import { UsuariosRefugio } from "src/usuarios_refugios/entities/usuarios_refugio.entity";

@Injectable()
export class turnosRepository {
  constructor(
    @InjectRepository(Turno)
    private turnoRepository: Repository<Turno>,
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,
    @InjectRepository(UsuariosRefugio)
    private usuarioRefugioRepository: Repository<UsuariosRefugio>
  ) {}

  async nuevoTurno(createTurnoDto: CreateTurnoDto, req){

    const { userId } = req.user;
    //primero obtengo el animal para ver que tipo es
    const obtengoTipo = await this.animalRepository.findOne({
      where: {
        animal_id: createTurnoDto.animal_id
      }
    })

    console.log(obtengoTipo.animal_tipo)

    if(obtengoTipo.animal_tipo ===1){
      const fecha_inicio = new Date(createTurnoDto.turno_fecha);
      const nuevaFechaFin = new Date(fecha_inicio.getTime() + 30 * 60000);
      createTurnoDto.turno_fecha_fin = nuevaFechaFin;

      //Si la mascota no tiene un turno dado verifico si hay lugar entre la fecha de inicio y fin
      console.log('verificando disponibilidad');
      //check_in <= @Check_out AND check_out > @Check_in
      const verificacion = await this.turnoRepository.count({
        where: {
          turno_fecha: LessThanOrEqual(createTurnoDto.turno_fecha_fin),
          turno_fecha_fin: MoreThan(createTurnoDto.turno_fecha),
        },
      });

      const verificacionLugar = verificacion;
      const IdEstado = 1;

      //Si hay lugar en las fechas registro el turno
      if (verificacionLugar == 0) {
        console.log('hay lugar en las fechas seleccionadas');
        const registrandoTurno = this.turnoRepository.create({
          turno_fecha: createTurnoDto.turno_fecha,
          turno_estado: IdEstado,
          user_id: userId,
          refugio_id: createTurnoDto.refugio_id,
          turno_fecha_fin: createTurnoDto.turno_fecha_fin
        });

        await this.turnoRepository.save(registrandoTurno);

        return 'registrando turno';

      } else {
        return 'No hay lugar en las fechas solicitadas';
      }
    } else if(obtengoTipo.animal_tipo ===2){

      const fecha_inicio = new Date(createTurnoDto.turno_fecha);
      const nuevaFechaFin = new Date(fecha_inicio.getTime() + 45 * 60000);
      createTurnoDto.turno_fecha_fin = nuevaFechaFin;

      //Si la mascota no tiene un turno dado verifico si hay lugar entre la fecha de inicio y fin
      console.log('verificando disponibilidad');
      //check_in <= @Check_out AND check_out > @Check_in
      const verificacion = await this.turnoRepository.count({
        where: {
          turno_fecha: LessThanOrEqual(createTurnoDto.turno_fecha_fin),
          turno_fecha_fin: MoreThan(createTurnoDto.turno_fecha),
        },
      });

      const verificacionLugar = verificacion;
      const IdEstado = 1;

      //Si hay lugar en las fechas registro el turno
      if (verificacionLugar == 0) {
        console.log('hay lugar en las fechas seleccionadas');
        const registrandoTurno = this.turnoRepository.create({
          turno_fecha: createTurnoDto.turno_fecha,
          turno_estado: IdEstado,
          user_id: userId,
          refugio_id: createTurnoDto.refugio_id,
          turno_fecha_fin: createTurnoDto.turno_fecha_fin
        });

        await this.turnoRepository.save(registrandoTurno);

        return {
          message: 'Turno registrado',
          statusCode: HttpStatus.CREATED,
        };

      } else {
        return 'No hay lugar en las fechas solicitadas';
      }
    }
    
  }

  async getHorariosDisponibles(turnosDisponibles: turnosDisponiblesDto){
    const obtengoTipo = await this.animalRepository.findOne({
      where: {
        animal_id: turnosDisponibles.animal_id
      }
    })

    const tipo = obtengoTipo.animal_tipo
    const duracion = tipo === 2 ? 45 : 30; // duración según el tipo de mascota

    const fechaInicio = new Date(turnosDisponibles.turno_fecha); // convertir la fecha a un objeto Date
    fechaInicio.setHours(9, 0, 0, 0); // establecer la hora de inicio de la agenda
    const fechaFin = new Date(turnosDisponibles.turno_fecha);
    fechaFin.setHours(18, 0, 0, 0); //

    const turnos = await this.turnoRepository.find({
      where: {
        turno_fecha: fechaInicio,
        refugio_id: turnosDisponibles.refugio_id,
      },
    });

    const horariosDisponibles = []; //creo array para guardar los turnos disponibles
    let hora = fechaInicio;
    while (hora <= fechaFin) {
      // verificar si la hora está disponible
      const horaFin = new Date(hora.getTime() + duracion * 60000);
      const disponible = await this.turnoRepository.count({
        where: [
          {
            turno_fecha: LessThanOrEqual(horaFin),
            turno_fecha_fin: MoreThanOrEqual(hora),
          },
          {
            turno_fecha: LessThan(hora),
            turno_fecha_fin: MoreThan(horaFin),
          },
        ],
      });

      if (disponible == 0) {
        horariosDisponibles.push(new Date(hora));
      }
      // avanzar a la siguiente hora
      hora = new Date(hora.getTime() + 15 * 60000); // avanzar en bloques de 15 minutos
    }
    return {
      message: 'Turnos',
      statusCode: HttpStatus.OK,
      data: horariosDisponibles,
    };
  }

  async getTurnosPorUsuario(req){
    try {
      const { userId } = req.user;
      const turnos = await this.turnoRepository.find({
        where: {
          user_id: userId
        }
      });
      return {
        message: 'Turnos',
        statusCode: HttpStatus.OK,
        data: turnos,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error.code} ${error.detail}`,
        error: 'Error Interno del Servidor',
      });
    }
  }

  async getTurnosPorRefugio(req){
    try {
      const { userId } = req.user;
      const usuarioRefugio = await this.usuarioRefugioRepository.findOne({
        where: {
          user_id: userId
        }
      });

      const turnosRefugio = await this.turnoRepository.find({
        where: {
          refugio_id: usuarioRefugio.refugio_id
        }
      })

      return {
        message: 'Turnos',
        statusCode: HttpStatus.OK,
        data: turnosRefugio,
      };
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error.code} ${error.detail}`,
        error: 'Error Interno del Servidor',
      });
    }
  }
  
}