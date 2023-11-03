package ch.secretsanta.domain.participant.model;

import java.util.List;

/**
 * The {@link AbstractDwarfParticipantProcessor} processes a list of {@link DwarfParticipant}s and return a list of {@link DwarfParticipant}
 * which may be modified - depending on the implementation
 */
public abstract class AbstractDwarfParticipantProcessor implements DwarfParticipantProcessor {
   private final DwarfParticipantProcessor dwarfParticipantProcessor;

   /**
    * Creates an {@link AbstractDwarfParticipantProcessor} with an internal no-op {@link DwarfParticipantProcessor}
    */
   public AbstractDwarfParticipantProcessor() {
      this(dwarfParticipants -> dwarfParticipants);
   }

   public AbstractDwarfParticipantProcessor(DwarfParticipantProcessor dwarfParticipantProcessor) {
      this.dwarfParticipantProcessor = dwarfParticipantProcessor;
   }

   @Override
   public List<DwarfParticipant> process(List<DwarfParticipant> dwarfParticipants) {
      return dwarfParticipantProcessor.process(dwarfParticipants);
   }
}
