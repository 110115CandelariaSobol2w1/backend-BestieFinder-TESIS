// donation.service.ts
import { HttpStatus, Injectable, InternalServerErrorException, Query, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donacion } from './entities/donacion.entity';
import { CreateDonacionDto } from './dto/create-donacion.dto';
import * as mercadopago from 'mercadopago';
import { Refugio } from 'src/refugios/entities/refugio.entity';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UsuariosRefugio } from 'src/usuarios_refugios/entities/usuarios_refugio.entity';

@Injectable()
export class DonacionesService {
  constructor(
    @InjectRepository(Refugio) private refugioRepository: Repository<Refugio>,
    @InjectRepository(Donacion)
    private donacionRepository: Repository<Donacion>,
    @InjectRepository(UsuariosRefugio)
    private userRefugioRepository: Repository<UsuariosRefugio>,
  ) {
    mercadopago.configure({
      access_token:
        'TEST-5953748682713128-112422-56c14b4ad548e06ae4cac11fcd47ddcf-1564168314', // Reemplaza con tu token de acceso real
    });
  }

  async createOrder(paymentData: any, req) {
    const { refugio, monto } = paymentData;
    const { userId } = req.user;
    console.log(userId);

    const nombreRefugio = await this.refugioRepository.findOne({
      where: { refugio_id: refugio },
      select: ['refugio_nombre'], // Especifica el campo que deseas recuperar
    });

    console.log(nombreRefugio);

    try {
      const notificationURL = `https://246a-190-16-41-81.ngrok-free.app/payments/webhook?userId=${userId}&refugioId=${refugio}`;
      const preference = {
        items: [
          {
            title: nombreRefugio.refugio_nombre || 'Descripción del pago',
            unit_price: parseFloat(monto) || 100,
            quantity: 1,
          },
        ],
        payer: {
          email: paymentData.email || 'email@example.com', // Email del pagador
        },
        notification_url: notificationURL,
      };

      const response = await mercadopago.preferences.create(preference);

      console.log('Corrio el create');
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async receiveWebhook(data: any, queryParams: any) {
    try {
      const userId = queryParams.userId;
      const refugioId = queryParams.refugioId;

      if (data.type === 'payment') {
        console.log('TRUE');
        console.log(data.id);
        const payment = await mercadopago.payment.findById(data.data.id);
        console.log(payment.body.transaction_amount);
        console.log('Aca vos a guardar en la  bd');
        const donacion = this.donacionRepository.create({
          donacion_monto: payment.body.transaction_amount,
          donacion_fecha: new Date(),
          user_id: userId,
          refugio_id: refugioId,
        });
        return this.donacionRepository.save(donacion).then(() => {
          return {
            message: 'Donacion guardada en la bd',
          };
        });
      }
    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong');
    }
  }

  async getDonacionesRefugio(req) {
    const { userId } = req.user;

    try {
      const userOwner = await this.userRefugioRepository.findOne({
        where: {
          user_id: userId,
        },
      });

      if (userOwner.ref_user_owner === false) {
        return 'No tenes permisos para confirmar un usuario en el refugio';
      }

      const donaciones = await this.donacionRepository.find({
        where: {
          refugio_id: userOwner.refugio_id,
        },
        relations: {
          usuario: true,
        },
      });

      return {
        message: 'Donaciones',
        statusCode: HttpStatus.OK,
        data: donaciones,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error Interno del Servidor',
        error: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async getDonacionesAgrupadasPorRefugioPorFecha(startDate: Date, endDate: Date) {
    try {
      // Ajusta las fechas para considerar solo el día, mes y año
      const startDateWithoutTime = new Date(startDate);
      startDateWithoutTime.setHours(0, 0, 0, 0); // Establece la hora a 00:00:00
  
      const endDateWithoutTime = new Date(endDate);
      endDateWithoutTime.setHours(23, 59, 59, 999); // Establece la hora a 23:59:59
  
      const donacionesAgrupadas = await this.donacionRepository
        .createQueryBuilder('donacion')
        .select('refugio.refugio_nombre', 'refugio_nombre')
        .addSelect('COUNT(*)', 'total_donaciones')
        .leftJoin('donacion.refugio', 'refugio')
        .where('donacion.donacion_fecha BETWEEN :startDate AND :endDate', {
          startDate: startDateWithoutTime.toISOString(),
          endDate: endDateWithoutTime.toISOString(),
        }) // Filtrar por rango de fechas
        .groupBy('refugio.refugio_nombre')
        .getRawMany();
  
      return {
        message: 'Donaciones agrupadas por refugio',
        statusCode: HttpStatus.OK,
        data: donacionesAgrupadas,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error Interno del Servidor',
        error: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
  
  

  async getDonacionesAgrupadasPorRefugio() {
    try {
      const donacionesAgrupadas = await this.donacionRepository
        .createQueryBuilder('donacion')
        .select('refugio.refugio_nombre', 'refugio_nombre')
        .addSelect('COUNT(*)', 'total_donaciones')
        .leftJoin('donacion.refugio', 'refugio')
        .groupBy('refugio.refugio_nombre')
        .getRawMany();

      return {
        message: 'Donaciones agrupadas por refugio',
        statusCode: HttpStatus.OK,
        data: donacionesAgrupadas,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error Interno del Servidor',
        error: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
