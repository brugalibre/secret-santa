package ch.secretsanta.domain.raffle;

import ch.secretsanta.domain.participant.model.AbstractDwarfParticipantProcessor;
import ch.secretsanta.domain.participant.model.DwarfParticipant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SecretSanta extends AbstractDwarfParticipantProcessor {

   private final static Logger LOG = LoggerFactory.getLogger(SecretSanta.class);

   public SecretSanta() {
      super();
   }

   @Override
   public List<DwarfParticipant> process(List<DwarfParticipant> dwarfParticipants) {
      LOG.info("Start raffling for participants {}", dwarfParticipants);
      List<DwarfParticipant> usersAvailableAsDwarf = new ArrayList<>(super.process(dwarfParticipants));
      Collections.shuffle(usersAvailableAsDwarf);
      List<DwarfParticipant> raffledDwarfs = new ArrayList<>();
      for (int i = 0; i < usersAvailableAsDwarf.size(); i++) {
         String dwarfName = null;
         // for participants 1 to 2nd-last each get the next one as its dwarf
         if (i + 1 < usersAvailableAsDwarf.size()) {
            dwarfName = usersAvailableAsDwarf.get(i + 1).name();
         } else if (usersAvailableAsDwarf.size() > 1) {
            // the last one gets the first one as dwarf
            dwarfName = usersAvailableAsDwarf.get(0).name();
         } else {
            // Only one participant -> no dwarf can be evaluated
         }
         raffledDwarfs.add(DwarfParticipant.of(usersAvailableAsDwarf.get(i), dwarfName));
      }
      return raffledDwarfs;
   }
}
