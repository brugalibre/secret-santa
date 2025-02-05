import { PartialType } from '@nestjs/mapped-types';
import { CreateDwarfParticipantDto } from './create-dwarf-participant.dto';

export class UpdateDwarfParticipantDto extends PartialType(
  CreateDwarfParticipantDto,
) {}
