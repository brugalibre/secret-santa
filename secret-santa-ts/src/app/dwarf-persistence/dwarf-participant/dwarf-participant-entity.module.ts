import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DwarfParticipantEntityRepository } from './service/dwarf-participant-entity.repository';
import { DwarfParticipantEntity } from './model/dwarf-participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DwarfParticipantEntity])],
  providers: [DwarfParticipantEntityRepository],
  exports: [DwarfParticipantEntityRepository],
})
export class DwarfParticipantEntityModule {}
