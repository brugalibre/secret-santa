package ch.secretsanta.domain.raffle;

import ch.secretsanta.domain.participant.model.AbstractDwarfParticipantProcessor;
import ch.secretsanta.domain.participant.model.DwarfParticipant;
import ch.secretsanta.domain.participant.model.DwarfParticipantProcessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class SecretSantaPrinter extends AbstractDwarfParticipantProcessor {
   private final static Logger LOG = LoggerFactory.getLogger(SecretSantaPrinter.class);

   public SecretSantaPrinter() {
      super();
   }

   public SecretSantaPrinter(DwarfParticipantProcessor dwarfParticipantProcessor) {
      super(dwarfParticipantProcessor);
   }

   @Override
   public List<DwarfParticipant> process(List<DwarfParticipant> dwarfParticipantsIn) {
      List<DwarfParticipant> dwarfParticipants = super.process(dwarfParticipantsIn);
      StringBuilder stringBuilder = new StringBuilder()
              .append("\nErgebnis Wichtellosung:\n")
              .append("===================\n");
      for (DwarfParticipant dwarfParticipant : dwarfParticipants) {
         stringBuilder.append(dwarfParticipant.name())
                 .append(" wichtelt ")
                 .append(dwarfParticipant.toDwarfName())
                 .append("\n");
      }
      stringBuilder.append("===================");
      LOG.info(stringBuilder.toString());
      return dwarfParticipants;
   }
}
