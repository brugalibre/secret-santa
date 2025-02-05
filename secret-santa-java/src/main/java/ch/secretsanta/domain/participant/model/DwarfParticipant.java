package ch.secretsanta.domain.participant.model;

import com.brugalibre.common.domain.model.DomainModel;
import com.brugalibre.domain.user.model.User;

import java.util.UUID;

/**
 * The {@link DwarfParticipant} is one of many participant in the secret santa. He is a dwarf and simultaneously
 * he has a dwarf
 *
 * @param id          the technical id of this {@link DwarfParticipant}
 * @param userId      the technical id of the {@link User} to whom this {@link DwarfParticipant} belongs
 * @param name        the name of this {@link DwarfParticipant}
 * @param toDwarfName the name of the {@link DwarfParticipant} to which this {@link DwarfParticipant} is the dwarf
 */
public record DwarfParticipant(String id, String userId, String name, String toDwarfName) implements DomainModel {

   public static DwarfParticipant of(DwarfParticipant dwarfParticipant, String dwarfName) {
      return new DwarfParticipant(dwarfParticipant.id, dwarfParticipant.userId, dwarfParticipant.name, dwarfName);
   }

   public static DwarfParticipant of(String name, String userId) {
      return new DwarfParticipant(UUID.randomUUID().toString(), userId, name, null);
   }

   @Override
   public String getId() {
      return id;
   }

   @Override
   public String toString() {
      return "User{" +
              "name='" + name + '\'' +
              ", toDwarfName=" + toDwarfName +
              '}';
   }

}
