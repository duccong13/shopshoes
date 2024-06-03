package com.nvl.novatech.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nvl.novatech.exception.AppException;
import com.nvl.novatech.exception.ErrorCode;
import com.nvl.novatech.model.Chat;
import com.nvl.novatech.model.User;
import com.nvl.novatech.repository.ChatRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PACKAGE, makeFinal = true)
public class ChatServiceImpl implements ChatService {

    ChatRepository chatRepository;
    UserService userService;

    @Override
    public Chat createChat(User reqUser, Long userIdReq) {
        User user = userService.findUserById(userIdReq);
        Chat isChatExist = chatRepository.findSingleChatByUserId(user, reqUser);
        if(isChatExist != null){
            return isChatExist;
        }
        Chat chat = new Chat();
        chat.setCreateBy(reqUser);
        chat.getUsers().add(user);
        chat.getUsers().add(reqUser);
        chat.setGroup(false);

        return chatRepository.save(chat);
    }

    @Override
    public Chat deleteChat(Long chatId, Long userId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteChat'");
    }

    @Override
    public Chat findChatById(Long chatId) {
        Optional<Chat> chat = chatRepository.findById(chatId);
        if(chat.isPresent()){
            return chat.get();
        }
        throw new AppException(ErrorCode.UNAUTHENTICATED);
    }

    @Override
    public List<Chat> findAllChatByUserId(Long userId) {
        User user = userService.findUserById(userId);
        List<Chat> chats = chatRepository.findChatByUserId(user.getUserId());
        return chats;
    }
    
}
