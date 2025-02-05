import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DwarfParticipantService } from '../service/dwarf-participant.service';
import { CreateDwarfParticipantDto } from '../model/dto/create-dwarf-participant.dto';
import { DwarfParticipant } from '../model/dwarf-participant.model';

@Controller('dwarf-participant')
export class DwarfParticipantController {
  constructor(
    private readonly dwarfParticipantService: DwarfParticipantService,
  ) {}

  @Post()
  create(
    @Body() createDwarfParticipantDto: CreateDwarfParticipantDto,
  ): Promise<DwarfParticipant | DwarfParticipant[]> {
    return this.dwarfParticipantService.create(createDwarfParticipantDto);
  }

  /**
   * Deletes all existing dwarfs, which has the 'participateLastYear' flag set to true and sets the flag to true for all other dwarfs.
   */
  @Put('participate-last-year')
  participateLastYear(): Promise<void | DwarfParticipant | DwarfParticipant[]> {
    return this.dwarfParticipantService.participateLastYear();
  }

  @Get('participate-last-year')
  findAllParticipatedLastYear(): Promise<DwarfParticipant[]> {
    return this.dwarfParticipantService.getAllParticipatedLastYear();
  }

  @Get()
  findAll(): Promise<DwarfParticipant[]> {
    return this.dwarfParticipantService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<DwarfParticipant> {
    return this.dwarfParticipantService.getById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): void {
    return this.dwarfParticipantService.deleteById(id);
  }

  @Delete()
  deleteAll(): void {
    return this.dwarfParticipantService.deleteAll();
  }
}
