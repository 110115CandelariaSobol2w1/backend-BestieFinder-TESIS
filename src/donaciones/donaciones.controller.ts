import { Controller, Post, Body, All, HttpStatus, Get, Query, Request, UseGuards, Param } from '@nestjs/common';
import * as mercadopago from 'mercadopago';
import { DonacionesService } from './donaciones.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('payments')
export class DonacionesController {

  constructor(private readonly donacionesService: DonacionesService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createOrder(@Body() paymentData: any, @Request() req) {
    const result = await this.donacionesService.createOrder(paymentData, req);
    return result;
  }

  @Post('webhook')
  async receiveWebhook(@Body() data: any, @Query() queryParams: any) {
    console.log("Received webhook data:", data); // Verificar los datos recibidos
    try {
      await this.donacionesService.receiveWebhook(data, queryParams);
      console.log("Webhook processing completed"); // Confirmar que el procesamiento se completó
      return HttpStatus.OK;
    } catch (error) {
      console.error("Error processing webhook:", error); // Registrar cualquier error que pueda ocurrir
      throw new Error('Error processing webhook');
    }
  }

  @UseGuards(AuthGuard)
  @Get('/refugio')
  async getDonacionesRefugio(@Request() req){
    return this.donacionesService.getDonacionesRefugio(req);
  }

  @Get('donaciones/:startDate/:endDate')
  async getDonacionesFecha(@Param('startDate') startDate:Date, @Param('endDate') endDate: Date){
    return this.donacionesService.getDonacionesAgrupadasPorRefugioPorFecha(startDate,endDate);
  }

  @Get('donaciones')
  async getDonaciones(){
    return this.donacionesService.getDonacionesAgrupadasPorRefugio();
  }
  
}

