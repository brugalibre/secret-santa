import { Test, TestingModule } from '@nestjs/testing';
import { DwarfParticipantService } from './dwarf-participant.service';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';

describe('DwarfParticipantService', () => {
  const moduleMocker = new ModuleMocker(global);
  let dwarfParticipantService: DwarfParticipantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DwarfParticipantService],
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
    dwarfParticipantService = module.get(DwarfParticipantService);
  });

  it('should be defined', () => {
    expect(dwarfParticipantService).toBeDefined();
  });
});
