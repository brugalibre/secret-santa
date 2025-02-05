package ch.secretsanta.application.cli;

import ch.secretsanta.domain.participant.model.DwarfParticipant;

public enum Action {
   /**
    * Creates {@link DwarfParticipant} in the database
    */
   CREATE,

   /**
    * Each persistent {@link DwarfParticipant} is a participant in the dwarf raffle and each of them gets its dwarf
    */
   RAFFLE,

   /**
    * Print the results from the last raffle to the console
    */
   PRINT,

   /**
    * Prints the status of a current secret-santa
    */
   STATUS,

   /**
    * Each {@link DwarfParticipant} is notified about the result of the raffle
    */
   NOTIFY
}
