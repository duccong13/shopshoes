package com.nvl.novatech.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nvl.novatech.dto.request.ApiResponse;
import com.nvl.novatech.dto.request.SendMessageRequest;
import com.nvl.novatech.model.Message;
import com.nvl.novatech.model.User;
import com.nvl.novatech.service.MessageService;
import com.nvl.novatech.service.UserService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MessageController {
    MessageService messageService;
    UserService userService;

    @PostMapping("/create")
    public ApiResponse<Message> sendMessageHandler(@RequestBody SendMessageRequest request, @RequestHeader("Authorization") String jwt){
        User user = userService.findUserProfileByJwt(jwt);
        request.setUserId(user.getUserId());
        return ApiResponse.<Message>builder()
            .result(messageService.sendMessage(request))
            .build();
    }

    @GetMapping("/chat/{chatId}")
    public ApiResponse<List<Message>> getChatsMessageHandler(@PathVariable Long chatId, @RequestHeader("Authorization") String jwt){
        User user = userService.findUserProfileByJwt(jwt);
        return ApiResponse.<List<Message>>builder()
            .result(messageService.getChatsMessages(chatId, user))
            .build();
    }

    @DeleteMapping("/{messageId}")
    public ApiResponse<String> deleteMessageHandler(@PathVariable Long messageId, @RequestHeader("Authorization") String jwt){
        User user = userService.findUserProfileByJwt(jwt);
        messageService.deleteMessage(messageId, user);
        return ApiResponse.<String>builder()
            .result("Delete Message Successfully")
            .build();
    }

    @GetMapping("/all")
    public ApiResponse<List<Message>> getAllMessage(){
        return ApiResponse.<List<Message>>builder()
            .result(messageService.getAllMessages())
            .build();
    }


}
