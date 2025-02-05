package ch.secretsanta.domain.raffle;

import ch.secretsanta.domain.participant.model.AbstractDwarfParticipantProcessor;
import ch.secretsanta.domain.participant.model.DwarfParticipant;
import ch.secretsanta.domain.participant.model.DwarfParticipantProcessor;

import java.util.ArrayList;
import java.util.List;

public class SecretSantaValidator extends AbstractDwarfParticipantProcessor {

   public SecretSantaValidator(DwarfParticipantProcessor dwarfParticipantProcessor) {
      super(dwarfParticipantProcessor);
   }

   @Override
   public List<DwarfParticipant> process(List<DwarfParticipant> dwarfParticipantsIn) {
      List<DwarfParticipant> dwarfParticipants = super.process(dwarfParticipantsIn);
      List<String> dwarfIds = new ArrayList<>(dwarfParticipants.size());
      for (DwarfParticipant dwarfParticipant : dwarfParticipants) {
         if (dwarfIds.contains(dwarfParticipant.toDwarfName())) {
            throw new IllegalStateException("Dwarf " + dwarfParticipant.toDwarfName() + " doppelt besetzt!");
         }
         dwarfIds.add(dwarfParticipant.toDwarfName());
      }
      return dwarfParticipants;
   }
}
