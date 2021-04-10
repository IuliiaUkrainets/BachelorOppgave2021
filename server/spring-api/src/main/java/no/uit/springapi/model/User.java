package no.uit.springapi.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User extends Person{

    @NotNull(message = "{uitt.constraints.username.NotNull.message}")
    @Size(min=4, max=255)
    private String username;

    @NotNull
    @Size(min=4, max=255)
    private String displayName;

    @NotNull
    @Size(min=6, max=255)
    @Pattern(regexp="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}", message="{uitt.constraints.password.Pattern.Message}")
    private String password;

}
