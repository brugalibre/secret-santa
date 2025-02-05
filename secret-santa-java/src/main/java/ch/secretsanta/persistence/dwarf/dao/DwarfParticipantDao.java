package ch.secretsanta.persistence.dwarf.dao;

import ch.secretsanta.persistence.dwarf.DwarfParticipantEntity;
import org.springframework.data.repository.CrudRepository;

public interface DwarfParticipantDao extends CrudRepository<DwarfParticipantEntity, String> {
   // no-op
}
