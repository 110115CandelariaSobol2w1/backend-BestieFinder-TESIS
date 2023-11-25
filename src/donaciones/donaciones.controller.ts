import { Controller, Post, Body } from '@nestjs/common';
import * as mercadopago from 'mercadopago';

@Controller('payments')
export class DonacionesController {

  constructor() {
    mercadopago.configure({
      access_token: 'TEST-5953748682713128-112422-56c14b4ad548e06ae4cac11fcd47ddcf-1564168314' // Reemplaza con tu token de acceso real
    });
  }

  @Post('create')
  async createPayment(@Body() paymentData: any) {
    try {
      const preference = {
        items: [
          {
            title: paymentData.description || 'Descripción del pago',
            unit_price: parseFloat(paymentData.transaction_amount) || 100,
            quantity: 1
          }
        ],
        payer: {
          email: paymentData.email || 'email@example.com' // Email del pagador
        }
        // Puedes añadir más información según la documentación de Mercado Pago
      };

      const response = await mercadopago.preferences.create(preference);

      return response; // Devuelve la respuesta de la creación del pago

    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
