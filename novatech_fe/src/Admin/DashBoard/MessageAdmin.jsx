import React, { useEffect, useRef, useState } from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Input,
  Popover,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LinkIcon from "@mui/icons-material/Link";
import SendIcon from "@mui/icons-material/Send";
import { deepPurple } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../State/Auth/Action";
import { getUsersChat } from "../../State/User/Chat/Action";
import notificationSound from "../../assets/Sound/notification.mp3";
import {
  createMessage,
  getAllMessages,
  getMessages,
} from "../../State/User/Message/Action";

const formatTimeDifference = (pastDate) => {
  const now = new Date();
  const past = new Date(pastDate);
  const diffInMs = now - past;

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`;
  } else if (diffInHours < 24) {
    return `${diffInHours} giờ trước`;
  } else {
    return `${diffInDays} ngày trước`;
  }
};

const MessageAdmin = () => {
  const { message } = useSelector((store) => store);
  const { auth } = useSelector((store) => store);
  const { chat } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [content, setContent] = useState("");
  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const fileInputRef = useRef();

  const [imageUrl, setImageUrl] = useState("");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };


  useEffect(() => {
    dispatch(getUsersChat({ jwt }));
  }, [chat.createChat]);

  useEffect(() => {
    dispatch(getMessages());
  }, [message.newMessage]);

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  const handleCreateNewMessage = () => {
    dispatch(
      createMessage({
        jwt,
        data: {
          chatId: selectedChatId,
          content: content,
          imageUrl: imageUrl,
        },
      })
    );
    setContent("");
    setImageUrl("");
    const sound = new Audio(notificationSound);
    sound.play();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAvatarClick = (event, avatarIndex, userId, chatId) => {
    setSelectedAvatar(avatarIndex);
    setAnchorEl1(event.currentTarget);
    setSelectedUserId(userId);
    setSelectedChatId(chatId);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const filteredMessages =
    message.allMessage &&
    message.allMessage.data.result.filter(
      (item) => item.chat.chatId === selectedChatId
    );

  return (
    <div className="relative">
      <Avatar
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="relative cursor-pointer"
        sx={{ padding: 3.5, bgcolor: deepPurple[500] }}
      >
        <span className="text-xl">
          <ChatBubbleIcon />
        </span>
      </Avatar>

      <Popover
        id="demo-positioned-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ padding: 2 }}>
          {auth.users &&
            auth.users.data &&
            auth.users.data.result &&
            auth.users.data.result.map((item, index) => {
              const userChats =
                chat.chats &&
                chat.chats.result.filter(
                  (chatItem) => chatItem.createBy.userId === item.userId
                );
              return userChats && userChats.length > 0 ? (
                <Box key={index} sx={{ marginBottom: 1 }}>
                  <Tooltip title={`${item.email}`}>
                    <Avatar
                      src={`https://avatar.iran.liara.run/public/${getRandomNumber()}`}
                      onClick={(event) =>
                        handleAvatarClick(
                          event,
                          index,
                          item.userId,
                          userChats[0].chatId
                        )
                      }
                      className="cursor-pointer"
                    />
                  </Tooltip>
                </Box>
              ) : null;
            })}
        </Box>
      </Popover>

      {selectedAvatar !== null && (
        <Popover
          id="demo-positioned-menu2"
          anchorEl={anchorEl1}
          open={open1}
          onClose={handleClose1}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 100, left: 400 }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{ marginTop: 2, marginLeft: 20 }} // Add margin-top to create space
        >
          <Card className="w-[600px]">
            <CardHeader
              avatar={<ArrowBackIcon />}
              title={
                <Box>
                  <Typography variant="h6">NOVATECH</Typography>
                  <p className="">
                    Hãy hỏi bất cứ điều gì hoặc chia sẻ phản hồi của bạn liên
                    quan đến SP
                  </p>
                </Box>
              }
              action={
                <Button onClick={handleClose1} sx={{ color: "#333" }}>
                  <CloseIcon />
                </Button>
              }
            />
            <CardContent className="h-[400px]" sx={{ overflowY: "scroll" }}>
              {filteredMessages &&
                filteredMessages.map((item, index) => (
                  <div key={index} className="space-y-4">
                    {item.user.userId !== 1 ? (
                      <div className="chat chat-start text-xs">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img
                              alt="Tailwind CSS chat bubble component"
                              src="https://avatar.iran.liara.run/public/22"
                            />
                          </div>
                        </div>
                        <div className="chat-header">
                          {item.user.email}
                          <time className="text-xs opacity-50">
                            {formatTimeDifference(item.timestamp)}
                          </time>
                        </div>
                        <div className="chat-bubble">{item.content}</div>
                        {item.imageUrl && (
                          <img
                            className="rounded-lg shadow w-32 h-32 mt-2 object-cover"
                            src={item.imageUrl}
                          ></img>
                        )}
                      </div>
                    ) : (
                      <div className="chat chat-end text-xs">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img
                              alt="Tailwind CSS chat bubble component"
                              src="https://avatar.iran.liara.run/public/23"
                            />
                          </div>
                        </div>
                        <div className="chat-header">
                          {item.user.email}
                          <time className="text-xs opacity-50">
                            {formatTimeDifference(item.timestamp)}
                          </time>
                        </div>
                        <div className="chat-bubble">{item.content}</div>
                        <div>
                          {item.imageUrl && (
                            <img
                              className="rounded-lg shadow w-32 h-32 mt-2 object-cover"
                              src={item.imageUrl}
                            ></img>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </CardContent>

            <CardActions>
              <Grid container alignItems={"center"}>
                <Grid item xs={10}>
                  <TextField
                    variant="standard"
                    placeholder="Nhập tin nhắn..."
                    fullWidth
                    value={content}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Button
                    variant="text"
                    component="label"
                    onClick={() => fileInputRef.current.click()}
                    sx={{ color: "#333" }}
                  >
                    <LinkIcon />
                  </Button>
                  <Input
                    type="file"
                    inputRef={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Button
                    onClick={handleCreateNewMessage}
                    variant="text"
                    endIcon={<SendIcon />}
                  ></Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Popover>
      )}
    </div>
  );
};

export default MessageAdmin;
