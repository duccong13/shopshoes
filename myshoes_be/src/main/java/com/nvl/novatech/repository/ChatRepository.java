package com.nvl.novatech.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.nvl.novatech.model.Chat;
import com.nvl.novatech.model.User;

public interface ChatRepository extends JpaRepository<Chat, Long>{
    
    @Query("Select c from Chat c join c.users u where u.userId=:userId")
    public List<Chat> findChatByUserId(@Param("userId") Long userId);

    @Query("Select c from Chat c where :user Member of c.users and :reqUser Member of c.users")
    public Chat findSingleChatByUserId(@Param("user") User user, @Param("reqUser") User reqUser);
}
