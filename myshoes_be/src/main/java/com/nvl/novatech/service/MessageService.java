package com.nvl.novatech.service;

import java.util.List;

import com.nvl.novatech.dto.request.SendMessageRequest;
import com.nvl.novatech.model.Message;
import com.nvl.novatech.model.User;

public interface MessageService {
    
    Message sendMessage(SendMessageRequest request);

    List<Message> getChatsMessages(Long chatId, User reqUser);
    
    Message findMessageById(Long messageId);

    void deleteMessage(Long messageId, User reqUser);

    List<Message> getAllMessages();
}
