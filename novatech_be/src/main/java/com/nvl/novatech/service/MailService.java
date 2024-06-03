package com.nvl.novatech.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.nvl.novatech.dto.request.MailRequest;


@Service
public class MailService {

    @Autowired
    JavaMailSender mailSender;

    @Value("$(spring.mail.username)")
    private String fromMail;

    public void sendMail(String mail, MailRequest request){
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(mail);
        simpleMailMessage.setSubject(request.getSubject());
        simpleMailMessage.setText(request.getMessage());
        simpleMailMessage.setTo(mail);

        mailSender.send(simpleMailMessage);
    }
}
