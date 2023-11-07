import { Injectable } from "@nestjs/common";
import { Turno } from "./entities/turno.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class turnosRepository {
  constructor(
    @InjectRepository(Turno)
    private eventoRepository: Repository<Turno>
  ) {}
}