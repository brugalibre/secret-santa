package ch.secretsanta.persistence.user;

import com.brugalibre.common.domain.persistence.DomainEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

import java.util.Objects;

@Entity
@Table(name = "dwarfparticipant")
public class DwarfParticipantEntity extends DomainEntity {
   @NotNull
   private String name;

   @NotNull
   private String userId;

   private String toDwarfName;

   public DwarfParticipantEntity() {
      super(null);
   }

   public String getToDwarfName() {
      return toDwarfName;
   }

   public void setToDwarfName(String toDwarfName) {
      this.toDwarfName = toDwarfName;
   }

   public String getUserId() {
      return userId;
   }

   public void setUserId(String userId) {
      this.userId = userId;
   }

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }


   @Override
   public String toString() {
      return "dwarfParticipantEntity{" +
              "name='" + name + '\'' +
              ", userId='" + userId + '\'' +
              ", toDwarfName=" + toDwarfName +
              '}';
   }

   @Override
   public boolean equals(Object o) {
      if (this == o) return true;
      if (o == null || getClass() != o.getClass()) return false;
      if (!super.equals(o)) return false;
      DwarfParticipantEntity that = (DwarfParticipantEntity) o;
      return id.equals(that.id) && name.equals(that.name);
   }

   @Override
   public int hashCode() {
      return Objects.hash(super.hashCode(), id, name);
   }
}
