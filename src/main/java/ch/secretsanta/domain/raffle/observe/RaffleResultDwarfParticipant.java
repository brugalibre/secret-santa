package ch.secretsanta.domain.raffle.observe;

/**
 * @param name                   the name of the dwarf-participant
 * @param phoneNr                the phone-number of the participant
 * @param toDwarfParticipantName the person which will get a present from this dwarf-participant
 */
public record RaffleResultDwarfParticipant(String name, String phoneNr, String toDwarfParticipantName) {
}
