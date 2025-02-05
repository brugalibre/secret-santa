import { Test, TestingModule } from '@nestjs/testing';
import { DwarfParticipantController } from './dwarf-participant.controller';
import { DwarfParticipantModule } from '../dwarf-participant.module';
import { DwarfParticipantEntityModule } from '../../dwarf-persistence/dwarf-participant/dwarf-participant-entity.module';
import { DwarfParticipantEntity } from '../../dwarf-persistence/dwarf-participant/model/dwarf-participant.entity';
import { SecretSantaPostgresOrmModule } from '../../dwarf-persistence/secret-santa-postgres-orm.module';

describe('DwarfParticipantController', () => {
  let controller: DwarfParticipantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DwarfParticipantModule,
        DwarfParticipantEntityModule,
        SecretSantaPostgresOrmModule([DwarfParticipantEntity]),
      ],
      controllers: [DwarfParticipantController],
    }).compile();

    controller = module.get(DwarfParticipantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
