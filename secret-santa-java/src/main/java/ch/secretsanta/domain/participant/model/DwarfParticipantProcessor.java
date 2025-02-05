package ch.secretsanta.domain.participant.model;

import java.util.List;

/**
 * The {@link DwarfParticipantProcessor} processes a list of {@link DwarfParticipant}s and return a list of {@link DwarfParticipant}
 * which may be modified - depending on the implementation
 */
public interface DwarfParticipantProcessor {
   /**
    * @param dwarfParticipants the {@link DwarfParticipant} to process
    * @return a list of {@link DwarfParticipant}
    * * which may be modified
    */
   List<DwarfParticipant> process(List<DwarfParticipant> dwarfParticipants);
}
