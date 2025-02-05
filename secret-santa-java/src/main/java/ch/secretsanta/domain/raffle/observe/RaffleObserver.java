package ch.secretsanta.domain.raffle.observe;

import ch.secretsanta.domain.participant.model.DwarfParticipant;
import ch.secretsanta.domain.raffle.SecretSanta;

import java.util.List;

/**
 * The {@link RaffleObserver} is notified as soon as the {@link SecretSanta} is done with raffling
 */
public interface RaffleObserver {

   /**
    * @param dwarfParticipants the participants of the raffle as {@link DwarfParticipant}s
    */
   void notifyDwarfParticipants(List<RaffleResultDwarfParticipant> dwarfParticipants);
}
