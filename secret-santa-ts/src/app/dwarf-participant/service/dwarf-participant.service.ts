import { Injectable, Logger } from '@nestjs/common';
import { DwarfParticipantEntityRepository } from '../../dwarf-persistence/dwarf-participant/service/dwarf-participant-entity.repository';
import { DwarfParticipant } from '../model/dwarf-participant.model';
import { CreateDwarfParticipantDto } from '../model/dto/create-dwarf-participant.dto';
import { UpdateDwarfParticipantDto } from '../model/dto/update-dwarf-participant.dto';

@Injectable()
export class DwarfParticipantService {
  private readonly log = new Logger(DwarfParticipantService.name);

  constructor(
    private readonly dwarfParticipantEntityRepository: DwarfParticipantEntityRepository,
  ) {}

  getById(id: number): Promise<DwarfParticipant> {
    return this.dwarfParticipantEntityRepository.getById(id);
  }

  getAll(): Promise<DwarfParticipant[]> {
    return this.dwarfParticipantEntityRepository.getAll();
  }

  getAllParticipatedLastYear(): Promise<DwarfParticipant[]> {
    return this.dwarfParticipantEntityRepository.getAllParticipatedLastYear();
  }

  getAllActiveDwarfParticipants(): Promise<DwarfParticipant[]> {
    return this.dwarfParticipantEntityRepository.getAllParticipatingCurrentYear();
  }

  create(
    createDto: CreateDwarfParticipantDto,
  ): Promise<DwarfParticipant | DwarfParticipant[]> {
    this.log.log('Creating a new dwarf participant {}', createDto);
    return this.dwarfParticipantEntityRepository.save(createDto);
  }

  update(
    updateDto: UpdateDwarfParticipantDto,
  ): Promise<DwarfParticipant | DwarfParticipant[]> {
    this.log.log('Updating existing dwarf participants {}', updateDto);
    return this.dwarfParticipantEntityRepository.save(updateDto);
  }

  deleteById(dwarfId: number) {
    this.dwarfParticipantEntityRepository.deleteById(dwarfId);
  }

  deleteAll() {
    this.dwarfParticipantEntityRepository.deleteAll();
  }

  participateLastYear(): Promise<DwarfParticipant | DwarfParticipant[]> {
    return this.dwarfParticipantEntityRepository
      .deleteAllParticipatedLastYear()
      .then((deleteResult) => {
        this.log.log(
          'Deleted {} dwarfs which participated last year',
          deleteResult.affected,
        );
        return this.getAll()
          .then((dwarfs) => {
            return dwarfs.map((dwarf) => {
              dwarf.participatedLastYear = true;
              return dwarf;
            });
          })
          .then((dwarf) => {
            return this.update(dwarf);
          });
      });
  }
}
