import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DwarfParticipantEntity } from '../model/dwarf-participant.entity';
import { CreateDwarfParticipantDto } from '../../../dwarf-participant/model/dto/create-dwarf-participant.dto';
import { DeleteResult, Not, Repository } from 'typeorm';

@Injectable()
export class DwarfParticipantEntityRepository {
  constructor(
    @InjectRepository(DwarfParticipantEntity)
    private readonly repository: Repository<DwarfParticipantEntity>,
  ) {}

  getById(id: number): Promise<DwarfParticipantEntity> {
    return this.repository.findOneOrFail({ where: { id: id } });
  }

  getAll() {
    return this.repository.find();
  }

  getAllParticipatedLastYear(): Promise<DwarfParticipantEntity[]> {
    return this.repository.find({ where: { participatedLastYear: true } });
  }

  getAllParticipatingCurrentYear(): Promise<DwarfParticipantEntity[]> {
    const options = { where: { participatedLastYear: false } };
    return this.repository.find(options);
  }

  save(
    createDwarfParticipantDto: CreateDwarfParticipantDto,
  ): Promise<DwarfParticipantEntity> {
    return this.repository.save(createDwarfParticipantDto);
  }

  deleteById(dwarfId: number): Promise<DeleteResult> {
    return this.repository.delete({ id: dwarfId });
  }

  deleteAllParticipatedLastYear(): Promise<DeleteResult> {
    return this.repository.delete({ participatedLastYear: true });
  }

  deleteAll(): Promise<DeleteResult> {
    return this.repository.delete({ id: Not(-1) }); // Implicite delete all, since ids are never negative
  }
}
