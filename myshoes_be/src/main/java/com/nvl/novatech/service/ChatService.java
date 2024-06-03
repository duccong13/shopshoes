package com.nvl.novatech.service;

import java.util.List;

import com.nvl.novatech.model.Chat;
import com.nvl.novatech.model.User;

public interface ChatService {
    Chat createChat(User reqUser, Long userIdReq);
    Chat deleteChat(Long chatId, Long userId);   
    Chat findChatById(Long chatId);
    List<Chat> findAllChatByUserId(Long userId);
}
