import { Module } from '@nestjs/common';
import { DwarfParticipantService } from './service/dwarf-participant.service';
import { DwarfParticipantController } from './controller/dwarf-participant.controller';
import { DwarfParticipantEntityModule } from '../dwarf-persistence/dwarf-participant/dwarf-participant-entity.module';

@Module({
  imports: [DwarfParticipantEntityModule],
  controllers: [DwarfParticipantController],
  providers: [DwarfParticipantService],
  exports: [DwarfParticipantService],
})
export class DwarfParticipantModule {}
