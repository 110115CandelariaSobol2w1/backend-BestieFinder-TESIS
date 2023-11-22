import { Injectable } from "@nestjs/common";
import { Turno } from "./entities/turno.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThanOrEqual, MoreThan, Repository } from "typeorm";
import { Animal } from "src/animales/entities/animal.entity";
import { CreateTurnoDto } from "./dto/create-turno.dto";

@Injectable()
export class turnosRepository {
  constructor(
    @InjectRepository(Turno)
    private turnoRepository: Repository<Turno>,
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>
  ) {}

  async nuevoTurno(createTurnoDto: CreateTurnoDto){
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
          user_id: createTurnoDto.user_id,
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
          user_id: createTurnoDto.user_id,
          refugio_id: createTurnoDto.refugio_id,
          turno_fecha_fin: createTurnoDto.turno_fecha_fin
        });

        await this.turnoRepository.save(registrandoTurno);

        return 'registrando turno';

      } else {
        return 'No hay lugar en las fechas solicitadas';
      }
    }
    
  }





}