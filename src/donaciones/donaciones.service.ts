// donation.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donacion } from './entities/donacion.entity';
import { CreateDonacionDto } from './dto/create-donacion.dto';

@Injectable()
export class DonacionesService {
  constructor(
    @InjectRepository(Donacion)
    private readonly donationRepository: Repository<Donacion>,
  ) {}

  async createDonation(createDonation: CreateDonacionDto): Promise<Donacion> {
    const newDonation = await this.donationRepository.create(createDonation);
    return await this.donationRepository.save(newDonation);
  }
}
