import { Test, TestingModule } from '@nestjs/testing';
import { DwarfParticipantEntityRepository } from './dwarf-participant-entity.repository';
import { DwarfParticipantEntity } from '../model/dwarf-participant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecretSantaPostgresOrmModule } from '../../secret-santa-postgres-orm.module';

describe('DwarfParticipantEntityRepository', () => {
  let repository: DwarfParticipantEntityRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SecretSantaPostgresOrmModule([DwarfParticipantEntity]),
        TypeOrmModule.forFeature([DwarfParticipantEntity]),
      ],
      providers: [DwarfParticipantEntityRepository],
    }).compile();

    repository = module.get(DwarfParticipantEntityRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
