package no.uit.springapi.controller;

import no.uit.springapi.exception.UserNotValidException;
import no.uit.springapi.model.User;
import no.uit.springapi.model.shared.GenericResponse;
import no.uit.springapi.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/api/1.0/users")
    GenericResponse createUser(@RequestBody User user) {
        if (user.getUsername() == null || user.getDisplayName() == null) {
            throw new UserNotValidException();
        }
        userService.save(user);
        return new GenericResponse("User saved");
    }
}
