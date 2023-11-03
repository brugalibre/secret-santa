package ch.secretsanta.persistence.user.dao;

import ch.secretsanta.persistence.user.DwarfParticipantEntity;
import org.springframework.data.repository.CrudRepository;

public interface DwarfParticipantDao extends CrudRepository<DwarfParticipantEntity, String> {
   // no-op
}
