package ch.secretsanta.domain.participant.mapper;

import ch.secretsanta.domain.participant.model.DwarfParticipant;
import ch.secretsanta.persistence.dwarf.DwarfParticipantEntity;
import com.brugalibre.common.domain.mapper.CommonDomainModelMapper;
import org.mapstruct.Mapper;

@Mapper
public interface DwarfParticipantEntityMapper extends CommonDomainModelMapper<DwarfParticipant, DwarfParticipantEntity> {
// no-op
}