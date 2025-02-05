import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('DWARF_PARTICIPANT')
export class DwarfParticipantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNr: string;

  @Column({ nullable: true })
  toDwarf: string; // name of the dwarf, this dwarf has to give a present to

  @Column({ default: false })
  participatedLastYear: boolean; // true, when this dwarf was a participating last year
}
