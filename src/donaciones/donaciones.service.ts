// donation.service.ts
import { HttpStatus, Injectable, Query, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donacion } from './entities/donacion.entity';
import { CreateDonacionDto } from './dto/create-donacion.dto';
import * as mercadopago from 'mercadopago';
import { Refugio } from 'src/refugios/entities/refugio.entity';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Injectable()
export class DonacionesService {
  constructor(
    @InjectRepository(Refugio) private refugioRepository: Repository<Refugio>,
    @InjectRepository(Donacion)
    private donacionRepository: Repository<Donacion>,
  ) {
    mercadopago.configure({
      access_token:
        'TEST-5953748682713128-112422-56c14b4ad548e06ae4cac11fcd47ddcf-1564168314', // Reemplaza con tu token de acceso real
    });
  }

  
  async createOrder(paymentData: any, req) {
    const { refugio, monto } = paymentData;
    const { userId } = req.user;
    console.log(userId)

    const nombreRefugio = await this.refugioRepository.findOne({
      where: { refugio_id: refugio },
      select: ['refugio_nombre'], // Especifica el campo que deseas recuperar
    });

    console.log(nombreRefugio);

    try {
      const notificationURL = `https://d671-2800-2131-7540-c9b-80e-eccf-5f5a-10f5.ngrok-free.app/payments/webhook?userId=${userId}&refugioId=${refugio}`;
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
        console.log('TRUE')
        console.log(data.id)
        const payment = await mercadopago.payment.findById(data.data.id);
        console.log(payment.body.transaction_amount)
        console.log('Aca vos a guardar en la  bd')
        const donacion = this.donacionRepository.create({
          donacion_monto: payment.body.transaction_amount,
          donacion_fecha: new Date(),
          user_id: userId,
          refugio_id: refugioId,
        });
        return this.donacionRepository
        .save(donacion)
        .then(() => {
          return {
            message: 'Donacion guardada en la bd'
          }
        })
      }
    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong');
    }
  }
}
