package com.nvl.novatech.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.nvl.novatech.dto.request.SendMessageRequest;
import com.nvl.novatech.exception.AppException;
import com.nvl.novatech.exception.ErrorCode;
import com.nvl.novatech.model.Chat;
import com.nvl.novatech.model.Message;
import com.nvl.novatech.model.User;
import com.nvl.novatech.repository.MessageRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RequiredArgsConstructor
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MessageServiceImpl  implements MessageService{

    MessageRepository messageRepository;
    UserService userService;
    ChatService chatService;

    @Override
    public Message sendMessage(SendMessageRequest request) {
        User user = userService.findUserById(request.getUserId());
        Chat chat = chatService.findChatById(request.getChatId());
        Message message = new Message();
        message.setChat(chat);
        message.setUser(user);
        message.setContent(request.getContent());
        message.setImageUrl(request.getImageUrl());
        message.setTimestamp(LocalDateTime.now());

        return messageRepository.save(message);
    }

    @Override
    public List<Message> getChatsMessages(Long chatId, User reqUser) {
        Chat chat = chatService.findChatById(chatId);
        if(!chat.getUsers().contains(reqUser)){
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        List<Message> messages = messageRepository.findByChatId(chat.getChatId());
        return messages;
        
    }

    @Override
    public Message findMessageById(Long messageId) {
        return messageRepository.findById(messageId).orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));
    }

    @Override
    public void deleteMessage(Long messageId, User reqUser) {
        Message message = findMessageById(messageId);
        if(message.getUser().getUserId().equals(reqUser.getUserId())){
            messageRepository.deleteById(messageId);
        }

        throw new AppException(ErrorCode.UNAUTHENTICATED);
    }

    @Override
    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }
    
}
