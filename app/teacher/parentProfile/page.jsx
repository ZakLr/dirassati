"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  Input,
  Button,
  Avatar,
  List,
  message,
  Select,
  Spin,
  Alert,
} from "antd";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";
import { Send, MessageCircle, Users, User, GraduationCap } from "lucide-react";

const StyledSection = styled.div`
  margin-bottom: 32px;
  position: relative;
`;

const StyledHeader = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: #1a1a1a;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ElegantLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
  }
`;

const LogoText = styled.span`
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
  font-family: "Inter", "Segoe UI", sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    border-radius: 2px;
    opacity: 0.8;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  height: 70vh;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid #e8e8e8;
`;

const ParentsList = styled.div`
  width: 300px;
  background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
  border-right: 1px solid #e8e8e8;
  padding: 20px;
  overflow-y: auto;
`;

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
`;

const MessageInput = styled.div`
  padding: 20px;
  border-top: 1px solid #e8e8e8;
  background: #ffffff;
  display: flex;
  gap: 12px;
  align-items: center;
`;

const StyledInput = styled(Input)`
  flex: 1;
  border-radius: 24px;
  border: 2px solid #e8e8e8;
  padding: 12px 20px;
  font-size: 14px;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
  }
`;

const SendButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    transform: scale(1.05);
  }
`;

const ParentCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 8px;

  &:hover {
    background: rgba(102, 126, 234, 0.1);
    transform: translateX(4px);
  }

  &.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  margin-bottom: 12px;
  position: relative;

  ${(props) =>
    props.isTeacher
      ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    margin-left: auto;
    border-bottom-right-radius: 4px;
  `
      : `
    background: #f0f0f0;
    color: #333;
    margin-right: auto;
    border-bottom-left-radius: 4px;
  `}
`;

export default function TeacherChatPage() {
  const userId = useSelector((state) => state.auth.userId);
  const [selectedParent, setSelectedParent] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dummy data for parents
  const parents = [
    {
      id: 1,
      name: "Ahmed Alami",
      student: "Youssef Alami",
      avatar: "AA",
      lastMessage: "Thank you for the update",
      timestamp: "2 hours ago",
      unread: 2,
    },
    {
      id: 2,
      name: "Fatima Benali",
      student: "Sara Benali",
      avatar: "FB",
      lastMessage: "When is the next test?",
      timestamp: "1 day ago",
      unread: 0,
    },
    {
      id: 3,
      name: "Omar Tazi",
      student: "Karim Tazi",
      avatar: "OT",
      lastMessage: "Great progress!",
      timestamp: "3 days ago",
      unread: 1,
    },
    {
      id: 4,
      name: "Leila Mouline",
      student: "Amina Mouline",
      avatar: "LM",
      lastMessage: "Homework submitted",
      timestamp: "1 week ago",
      unread: 0,
    },
  ];

  // Dummy messages for selected parent
  const getMessagesForParent = (parentId) => {
    const messageData = {
      1: [
        {
          id: 1,
          text: "Hello Mr. Ahmed, I wanted to discuss Youssef's progress in mathematics.",
          isTeacher: true,
          timestamp: "10:30 AM",
        },
        {
          id: 2,
          text: "Hi Teacher, thank you for reaching out. How is he doing?",
          isTeacher: false,
          timestamp: "10:32 AM",
        },
        {
          id: 3,
          text: "Youssef has been doing well in the recent assignments. His test scores have improved significantly.",
          isTeacher: true,
          timestamp: "10:35 AM",
        },
        {
          id: 4,
          text: "That's great to hear! We'll keep encouraging him at home.",
          isTeacher: false,
          timestamp: "10:37 AM",
        },
        {
          id: 5,
          text: "Thank you for the update",
          isTeacher: false,
          timestamp: "2 hours ago",
        },
      ],
      2: [
        {
          id: 1,
          text: "Hello Mrs. Fatima, regarding the upcoming mathematics test...",
          isTeacher: true,
          timestamp: "9:00 AM",
        },
        {
          id: 2,
          text: "When is the next test?",
          isTeacher: false,
          timestamp: "1 day ago",
        },
      ],
    };
    return messageData[parentId] || [];
  };

  useEffect(() => {
    if (selectedParent) {
      setMessages(getMessagesForParent(selectedParent.id));
    }
  }, [selectedParent]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      isTeacher: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Simulate parent response
    setTimeout(() => {
      const responses = [
        "Thank you for the information.",
        "I appreciate your feedback.",
        "We'll work on this at home.",
        "Thank you for your dedication.",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      const parentMessage = {
        id: messages.length + 2,
        text: randomResponse,
        isTeacher: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, parentMessage]);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      style={{
        padding: "24px",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <div style={{ marginBottom: 32 }}>
        <ElegantLogo>
          <LogoIcon>
            <GraduationCap size={24} color="#ffffff" />
          </LogoIcon>
          <LogoText>Dirassati</LogoText>
        </ElegantLogo>
        <StyledHeader>Chat with Parents</StyledHeader>
        <p style={{ color: "#666", fontSize: "1.1rem", margin: 0 }}>
          Communicate effectively with parents about student progress and
          concerns.
        </p>
      </div>

      <ChatContainer>
        {/* Parents List */}
        <ParentsList>
          <h3 style={{ marginBottom: 20, color: "#333", fontSize: "1.2rem" }}>
            <Users size={20} style={{ marginRight: 8, color: "#667eea" }} />
            Parents ({parents.length})
          </h3>
          {parents.map((parent) => (
            <ParentCard
              key={parent.id}
              className={selectedParent?.id === parent.id ? "active" : ""}
              onClick={() => setSelectedParent(parent)}
            >
              <Avatar
                style={{
                  background:
                    selectedParent?.id === parent.id
                      ? "rgba(255, 255, 255, 0.3)"
                      : "#667eea",
                  color: selectedParent?.id === parent.id ? "white" : "white",
                }}
              >
                {parent.avatar}
              </Avatar>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    marginBottom: 2,
                    color: selectedParent?.id === parent.id ? "white" : "#333",
                  }}
                >
                  {parent.name}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color:
                      selectedParent?.id === parent.id
                        ? "rgba(255, 255, 255, 0.8)"
                        : "#666",
                    marginBottom: 2,
                  }}
                >
                  Student: {parent.student}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color:
                      selectedParent?.id === parent.id
                        ? "rgba(255, 255, 255, 0.6)"
                        : "#999",
                  }}
                >
                  {parent.lastMessage}
                </div>
              </div>
              {parent.unread > 0 && (
                <div
                  style={{
                    background: "#ff4d4f",
                    color: "white",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {parent.unread}
                </div>
              )}
            </ParentCard>
          ))}
        </ParentsList>

        {/* Chat Area */}
        <ChatArea>
          {selectedParent ? (
            <>
              {/* Chat Header */}
              <div
                style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid #e8e8e8",
                  background:
                    "linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <Avatar style={{ background: "#667eea" }}>
                  {selectedParent.avatar}
                </Avatar>
                <div>
                  <div style={{ fontWeight: 600, color: "#333" }}>
                    {selectedParent.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    Student: {selectedParent.student}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <MessagesContainer>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      display: "flex",
                      justifyContent: msg.isTeacher ? "flex-end" : "flex-start",
                      marginBottom: "12px",
                    }}
                  >
                    <MessageBubble isTeacher={msg.isTeacher}>
                      {msg.text}
                      <div
                        style={{
                          fontSize: "10px",
                          opacity: 0.7,
                          marginTop: "4px",
                          textAlign: msg.isTeacher ? "right" : "left",
                        }}
                      >
                        {msg.timestamp}
                      </div>
                    </MessageBubble>
                  </div>
                ))}
              </MessagesContainer>

              {/* Message Input */}
              <MessageInput>
                <StyledInput
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onPressEnter={handleKeyPress}
                  placeholder="Type your message..."
                  size="large"
                />
                <SendButton
                  type="primary"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  <Send size={20} />
                </SendButton>
              </MessageInput>
            </>
          ) : (
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                color: "#999",
              }}
            >
              <MessageCircle
                size={48}
                style={{ marginBottom: 16, opacity: 0.5 }}
              />
              <h3>Select a parent to start chatting</h3>
              <p>Choose a parent from the list to begin your conversation</p>
            </div>
          )}
        </ChatArea>
      </ChatContainer>
    </div>
  );
}
