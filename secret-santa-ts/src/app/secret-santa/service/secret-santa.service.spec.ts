import { Test, TestingModule } from '@nestjs/testing';
import { SecretSantaService } from './secret-santa.service';
import { DwarfParticipantService } from '../../dwarf-participant/service/dwarf-participant.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('SecretSantaService', () => {
  let service: SecretSantaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecretSantaService, DwarfParticipantService],
    })
      .useMocker((token) => {
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    service = module.get(SecretSantaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
