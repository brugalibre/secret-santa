import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { DwarfParticipant } from '../dwarf-participant/model/dwarf-participant.model';
import Mocked = jest.Mocked;
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

describe('NotificationService', () => {
  const dwarfParticipantHeinz: DwarfParticipant = {
    id: 2,
    name: 'Heinz',
    phoneNr: '0712222345',
    toDwarf: 'Peter',
    participatedLastYear: false,
  };
  const dwarfParticipantPeter: DwarfParticipant = {
    id: 1,
    name: 'Peter',
    phoneNr: '0711112345',
    toDwarf: 'Heinz',
    participatedLastYear: false,
  };

  const configProperty = 'configProperty-';
  const expectedConfigPropertyResult = configProperty + configProperty;
  const expectedNotificationMsgHeinz =
    '{"title":"Ceylanlar Wichtel 2025 Ziehung!","msg":"Hallo Heinz! Herzlich willkommen beim Ceylanlar Wichteln 2025 - die Wichtel wurden ermittelt: Dieses Jahr darfst du Peter ein Geschenk wichteln - yey!","receivers":["0712222345"]}';
  const expectedNotificationMsgPeter =
    '{"title":"Ceylanlar Wichtel 2025 Ziehung!","msg":"Hallo Peter! Herzlich willkommen beim Ceylanlar Wichteln 2025 - die Wichtel wurden ermittelt: Dieses Jahr darfst du Heinz ein Geschenk wichteln - yey!","receivers":["0711112345"]}';

  const expectedReminderMsgHeinz =
    '{"title":"Ceylanlar Wichtel 2025 Ziehung!","msg":"Hallo Heinz! Wichtel reminder! Bald ist es soweit, hast du dein Wichtelgeschenk für Peter bereits besorgt?! :)","receivers":["0712222345"]}';
  const expectedReminderMsgPeter =
    '{"title":"Ceylanlar Wichtel 2025 Ziehung!","msg":"Hallo Peter! Wichtel reminder! Bald ist es soweit, hast du dein Wichtelgeschenk für Heinz bereits besorgt?! :)","receivers":["0711112345"]}';

  let service: NotificationService;
  let httpService: Mocked<HttpService>;
  let configService: Mocked<ConfigService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [NotificationService],
    }).compile();

    httpService = module.get(HttpService);
    configService = module.get(ConfigService);
    service = module.get(NotificationService);
  });

  afterEach(async () => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('send notification to participants', () => {
    // Given
    let result: Observable<AxiosResponse<unknown, unknown>> = new Observable();
    jest.spyOn(httpService, 'post').mockImplementation(() => result);
    jest.spyOn(configService, 'get').mockImplementation(() => configProperty);
    let dwarfParticipants = Array.of(
      dwarfParticipantHeinz,
      dwarfParticipantPeter,
    );

    // When
    const actualResult = service.notifyDwarfParticipants(dwarfParticipants);

    // Then
    expect(actualResult).toHaveLength(dwarfParticipants.length);
    expect(httpService.post).nthCalledWith(
      1,
      expectedConfigPropertyResult,
      expectedNotificationMsgHeinz,
    );
    expect(httpService.post).nthCalledWith(
      2,
      expectedConfigPropertyResult,
      expectedNotificationMsgPeter,
    );
  });

  it('send reminders to participants', () => {
    // Given
    let result: Observable<AxiosResponse<unknown, unknown>> = new Observable();
    jest.spyOn(httpService, 'post').mockImplementation(() => result);
    jest.spyOn(configService, 'get').mockImplementation(() => configProperty);
    let dwarfParticipants = Array.of(
      dwarfParticipantHeinz,
      dwarfParticipantPeter,
    );

    // When
    const actualResult = service.remindDwarfParticipants(dwarfParticipants);

    // Then
    expect(actualResult).toHaveLength(dwarfParticipants.length);
    expect(httpService.post).nthCalledWith(
      1,
      expectedConfigPropertyResult,
      expectedReminderMsgHeinz,
    );
    expect(httpService.post).nthCalledWith(
      2,
      expectedConfigPropertyResult,
      expectedReminderMsgPeter,
    );
  });
});
