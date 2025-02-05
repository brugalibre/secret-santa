import { Injectable } from '@nestjs/common';
import { AlertSendNotificationDto } from './dto/alert-send-notification.dto';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { DwarfParticipant } from '../dwarf-participant/model/dwarf-participant.model';

const dwarfNotificationTitle: string = 'Ceylanlar Wichtel 2025 Ziehung!';

@Injectable()
export class NotificationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  notifyDwarfParticipants(
    dwarfParticipants: DwarfParticipant[],
  ): Observable<AxiosResponse<any, any>>[] {
    return dwarfParticipants.map((dwarfParticipant) => {
      const message: string = `Hallo ${dwarfParticipant.name}! Herzlich willkommen beim Ceylanlar Wichteln 2025 - die Wichtel wurden ermittelt: Dieses Jahr darfst du ${dwarfParticipant.toDwarf} ein Geschenk wichteln - yey!`;
      return this.sendNotification(message, dwarfParticipant.phoneNr);
    });
  }
  remindDwarfParticipants(
    dwarfParticipants: DwarfParticipant[],
  ): Observable<AxiosResponse<any, any>>[] {
    return dwarfParticipants.map((dwarfParticipant) => {
      let message: string = `Hallo ${dwarfParticipant.name}! Wichtel reminder! Bald ist es soweit, hast du dein Wichtelgeschenk für ${dwarfParticipant.toDwarf} bereits besorgt?! :)`;
      return this.sendNotification(message, dwarfParticipant.phoneNr);
    });
  }

  private sendNotification(
    message: string,
    phoneNr: string,
  ): Observable<AxiosResponse<any, any>> {
    const alertSendUrl = this.getAlertSendUrl();
    let alertSendNotificationDto: AlertSendNotificationDto =
      this.buildAlertSendNotificationDto(message, phoneNr);
    return this.httpService.post(
      alertSendUrl,
      JSON.stringify(alertSendNotificationDto),
    );
  }
  private buildAlertSendNotificationDto(
    message: string,
    phoneNr: string,
  ): AlertSendNotificationDto {
    return {
      title: dwarfNotificationTitle,
      msg: message,
      receivers: [phoneNr],
    };
  }

  private getAlertSendUrl() {
    return (
      this.configService.get('ALERT_SEND_HOST')! +
      this.configService.get('ALERT_SEND_PATH')!
    );
  }
}
