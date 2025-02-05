import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DwarfParticipantModule } from '../../dwarf-participant/dwarf-participant.module';
import { SecretSantaModule } from '../secret-santa.module';
import { DwarfParticipantEntity } from '../../dwarf-persistence/dwarf-participant/model/dwarf-participant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DwarfParticipantController } from '../../dwarf-participant/controller/dwarf-participant.controller';
import { SecretSantaController } from '../controller/secret-santa.controller';
import { SecretSantaPostgresOrmModule } from '../../dwarf-persistence/secret-santa-postgres-orm.module';
import * as request from 'supertest';
import { DwarfParticipant } from '../../dwarf-participant/model/dwarf-participant.model';
import { NotificationModule } from '../../notification/notification.module';

const TOTAL_PARTICIPANTS_2ND_YEAR = 10;
const TOTAL_PARTICIPANTS_1ST_YEAR = 9;
const firstYearDwarfRequestBody: string =
  '[' +
  '    {' +
  '        "name": "Heinz",' +
  '          "phoneNr": "123"' +
  '    },' +
  '    {' +
  '        "name": "Karl",' +
  '          "phoneNr": "123"' +
  '    },' +
  '    {' +
  '        "name": "Frank",' +
  '          "phoneNr": "123"' +
  '    },' +
  '    {' +
  '        "name": "Tom",' +
  '          "phoneNr": "123"' +
  '    },' +
  '    {' +
  '        "name": "Gupser",' +
  '          "phoneNr": "123"' +
  '    },' +
  '    {' +
  '        "name": "Charlie",' +
  '          "phoneNr": "123"' +
  '    },' +
  '    {' +
  '        "name": "Mason",' +
  '          "phoneNr": "123"' +
  '    },' +
  '    {' +
  '        "name": "Joey",' +
  '          "phoneNr": "123"' +
  '    },' +
  '    {' +
  '        "name": "Peter",' +
  '          "phoneNr": "123"' +
  '    }' +
  ']';
const secondYearNewParticipantName = 'Dominic';
const secondYearDwarfRequestBody: string =
  '[' +
  '    {' +
  '        "name": "Heinz",' +
  '          "phoneNr": "123"' +
  '    },' +
  '    {' +
  '        "name": "Karl",' +
  '          "phoneNr": "123"' +
  '    },' +
  '    {' +
  '        "name": "Frank",' +
  '          "phoneNr": "123"' +
  '    },' +
  '    {' +
  '        "name": "Tom",' +
  '          "phoneNr": "123"' +
  '    },' +
  '    {' +
  '        "name": "Gupser",' +
  '          "phoneNr": "123"' +
  '    },' +
  '    {' +
  '        "name": "Charlie",' +
  '          "phoneNr": "123"' +
  '    },' +
  '    {' +
  '        "name": "Mason",' +
  '          "phoneNr": "123"' +
  '    },' +
  '    {' +
  '        "name": "Joey",' +
  '          "phoneNr": "123"' +
  '    },' +
  '    {' +
  '        "name": "Peter",' +
  '          "phoneNr": "123"' +
  '    },' +
  '    {' +
  '        "name": "' +
  secondYearNewParticipantName +
  '",' +
  '          "phoneNr": "123"' +
  '    }' +
  ']';

function mapDwarfParticipantsToDwarfNames(
  dwarfParticipants: DwarfParticipant[],
) {
  return dwarfParticipants
    .map((dwarf) => dwarf.toDwarf)
    .filter((toDwarf) => toDwarf != null);
}

describe('Secret Santa e2e tests', () => {
  let secretSantaController: SecretSantaController;
  let dwarfParticipantController: DwarfParticipantController;
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        NotificationModule,
        SecretSantaModule,
        DwarfParticipantModule,
        SecretSantaPostgresOrmModule([DwarfParticipantEntity]),
        TypeOrmModule.forFeature([DwarfParticipantEntity]),
      ],
    }).compile();
    secretSantaController = module.get(SecretSantaController);
    dwarfParticipantController = module.get(DwarfParticipantController);
    app = module.createNestApplication();
    await app.init();
    dwarfParticipantController.deleteAll();
  });

  afterAll(() => {
    dwarfParticipantController.deleteAll();
    app.close();
  });

  it('should be defined', () => {
    expect(dwarfParticipantController).toBeDefined();
    expect(secretSantaController).toBeDefined();
  });

  it('create dwarfs 1st year', () => {
    return request(app.getHttpServer())
      .post('/dwarf-participant')
      .send(JSON.parse(firstYearDwarfRequestBody))
      .expect(201)
      .expect((response) => {
        expect(response.body.length).toEqual(TOTAL_PARTICIPANTS_1ST_YEAR);
        dwarfParticipantController.findAll().then((dwarfParticipants) => {
          expect(dwarfParticipants).toEqual(response.body);
        });
      });
  });

  it('raffle dwarfs 1st year', () => {
    return request(app.getHttpServer())
      .post('/secret-santa/raffle-dwarfs')
      .expect(201)
      .expect((response) => {
        const dwarfParticipants: DwarfParticipant[] = response.body;
        const toDwarfs = mapDwarfParticipantsToDwarfNames(dwarfParticipants);
        expect(dwarfParticipants.length).toEqual(TOTAL_PARTICIPANTS_1ST_YEAR);
        // each participant should have a dwarf
        dwarfParticipants.forEach((dwarf) => {
          expect(dwarf.toDwarf).toBeTruthy();
          expect(dwarf.participatedLastYear).toBeFalsy();
          expect(toDwarfs).toContain(dwarf.name);
        });
      });
  });

  it('participated 1st year', () => {
    return request(app.getHttpServer())
      .put('/dwarf-participant/participate-last-year')
      .expect(200)
      .expect((response) => {
        const dwarfParticipants: DwarfParticipant[] = response.body;
        expect(dwarfParticipants.length).toEqual(TOTAL_PARTICIPANTS_1ST_YEAR);
        dwarfParticipants.forEach((dwarf) => {
          expect(dwarf.toDwarf).toBeTruthy();
          expect(dwarf.participatedLastYear).toBeTruthy();
        });
      });
  });

  it('create participants 2nd year', () => {
    return request(app.getHttpServer())
      .post('/dwarf-participant')
      .send(JSON.parse(secondYearDwarfRequestBody))
      .expect(201)
      .expect((response) => {
        expect(response.body.length).toEqual(TOTAL_PARTICIPANTS_2ND_YEAR);
      })
      .then(() => {
        return request(app.getHttpServer())
          .get('/dwarf-participant')
          .expect(200)
          .expect((response) => {
            const dwarfParticipants: DwarfParticipant[] = response.body;
            const firstYearNewParticipants = dwarfParticipants.filter(
              (dwarf) => dwarf.participatedLastYear,
            );
            const secondYearNewParticipants = dwarfParticipants.filter(
              (dwarf) => !dwarf.participatedLastYear,
            );
            expect(dwarfParticipants.length).toEqual(
              TOTAL_PARTICIPANTS_2ND_YEAR + TOTAL_PARTICIPANTS_1ST_YEAR,
            );
            expect(firstYearNewParticipants.length).toEqual(
              TOTAL_PARTICIPANTS_1ST_YEAR,
            );
            expect(secondYearNewParticipants.length).toEqual(
              TOTAL_PARTICIPANTS_2ND_YEAR,
            );
            firstYearNewParticipants.forEach((dwarf) => {
              expect(dwarf.toDwarf).toBeTruthy();
            });
            secondYearNewParticipants.forEach((dwarf) => {
              expect(dwarf.toDwarf).toBeNull();
            });
          });
      });
  });

  it('raffle dwarfs 2nd year', () => {
    return request(app.getHttpServer())
      .post('/secret-santa/raffle-dwarfs')
      .expect(201)
      .expect((response) => {
        const dwarfParticipants: DwarfParticipant[] = response.body;
        const toDwarfs: string[] =
          mapDwarfParticipantsToDwarfNames(dwarfParticipants);
        const lastYearsParticipantToDwarfMap = new Map();
        dwarfParticipantController
          .findAllParticipatedLastYear()
          .then((dwarfsParticipatedLastYear) => {
            dwarfsParticipatedLastYear.forEach((dwarf) => {
              lastYearsParticipantToDwarfMap.set(dwarf.name, dwarf.toDwarf);
            });
            // There should be 10 participants and each one should have a dwarf and nobody should have the same dwarf as last year
            expect(dwarfParticipants.length).toEqual(
              TOTAL_PARTICIPANTS_2ND_YEAR,
            );
            dwarfParticipants.forEach((dwarf) => {
              expect(dwarf.toDwarf).toBeTruthy();
              expect(dwarf.participatedLastYear).toBeFalsy();
              expect(dwarf.toDwarf).not.toEqual(
                lastYearsParticipantToDwarfMap.get(dwarf.name),
              );
              expect(toDwarfs).toContain(dwarf.name);
            });
          });
      });
  });

  it('participated 2nd year', () => {
    return request(app.getHttpServer())
      .put('/dwarf-participant/participate-last-year')
      .expect(200)
      .expect((response) => {
        const dwarfParticipants: DwarfParticipant[] = response.body;
        expect(dwarfParticipants.length).toEqual(TOTAL_PARTICIPANTS_2ND_YEAR);
        dwarfParticipants.forEach((dwarf) => {
          expect(dwarf.toDwarf).toBeTruthy();
          expect(dwarf.participatedLastYear).toBeTruthy();
        });
      })
      .then(() => {
        return request(app.getHttpServer())
          .get('/dwarf-participant')
          .expect(200)
          .expect((response) => {
            const dwarfParticipants: DwarfParticipant[] = response.body;
            expect(dwarfParticipants.length).toEqual(
              TOTAL_PARTICIPANTS_2ND_YEAR,
            );
            dwarfParticipants.forEach((dwarf) => {
              expect(dwarf.toDwarf).toBeTruthy();
              expect(dwarf.participatedLastYear).toBeTruthy();
            });
          });
      });
  });
});
