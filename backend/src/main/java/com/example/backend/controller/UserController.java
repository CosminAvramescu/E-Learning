package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.service.EmailService;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLParameters;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.io.IOException;
import java.net.Authenticator;
import java.net.CookieHandler;
import java.net.ProxySelector;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;

@RestController
@RequiredArgsConstructor
@RequestMapping("user")
public class UserController {
    private final UserService userService;
    private final EmailService emailService;

    @CrossOrigin(origins = {"*"})
    @RequestMapping(value = "/signUp", method = RequestMethod.POST)
    public ResponseEntity<User> adduser(@RequestBody User user) {

        User newUser = userService.createStudent(user);
        if (newUser != null)
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        else
            return new ResponseEntity<>(HttpStatus.FOUND);

    }


    @CrossOrigin(origins = {"*"})
    @RequestMapping(value = "/checkEmail", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    ResponseEntity<User> getUserByEmail(@RequestHeader Map<String, String> headers) {

        User requestUser = userService.findUserByEmail(headers.get("email"));
        if (requestUser != null) {
            return new ResponseEntity<>(requestUser, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @CrossOrigin(origins = {"*"})
    @RequestMapping(value = "/sendPassResetMail", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    ResponseEntity<HttpClient> sendPassResetMail(@RequestBody Map<String, String> body) {

        String resetPasswordCode = UUID.randomUUID().toString();
        String email = body.get("email");
        User requestUser = userService.findUserByEmail(body.get("email"));
//        if (requestUser == null){
//            return new ResponseEntity<>(new HttpClient(), HttpStatus.NOT_FOUND);
//        }
//        else {
            return emailService.sendForgotPasswordEmail(email, resetPasswordCode);
//        }
    }

    @Transactional
    @CrossOrigin(origins = {"*"})
    @RequestMapping(value = "/updatePassword", method = RequestMethod.PUT)
    public User updateUserPasswordByEmail(@Valid @RequestBody User theUser) {
        try {
            return userService.updateUserPasswordByEmail(theUser);

        }catch (HibernateException e){
            return null;
        }

    }

}




