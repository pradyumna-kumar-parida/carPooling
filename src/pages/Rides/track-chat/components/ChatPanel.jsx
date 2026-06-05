import React, { useState, useEffect, useRef } from "react";
import chatIcon from "../../../../assets/Images/chat-icon.png";
import { BiSolidPhoneCall } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { TbSend } from "react-icons/tb";


const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: "driver",
    text: "Hello! I will reach the pickup point 10 minutes early. Please be ready.",
    time: "10:45 AM",
  },
  {
    id: 2,
    sender: "passenger",
    text: "Thank you! I will be there on time.",
    time: "10:47 AM",
  },
  {
    id: 3,
    sender: "driver",
    text: "Great. My car is White Maruti Swift Dzire. See you soon!",
    time: "10:48 AM",
  },
];

const getNow = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const ChatPanel = ({ driver }) => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = inputText.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "passenger", text, time: getNow() },
    ]);
    setInputText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleOpen = () => {
    setIsVisible(true);
    window.requestAnimationFrame(() => setIsOpen(true));
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setIsVisible(false), 280);
  };

  return (
    <>
      {/* Chat Panel */}
      <div className={`chat-panel-shell${isVisible ? " chat-visible" : ""}`}>
        <div
          className={`cp-container${isVisible ? " cp-open" : ""}${
            isOpen ? " cp-open--active" : isVisible ? " cp-open--hidden" : ""
          }`}
        >
          {/* Header */}
          <div className="cp-header">
            <img
              src={driver.driver_profile_picture}
              alt={driver.driver_name}
              className="cp-driver-avatar"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(driver.driver_name)}&background=1a56db&color=fff`;
              }}
            />
            <div className="cp-driver-meta">
              <p className="cp-driver-name">Chat with {driver.driver_name}</p>
              <div className="cp-online-row">
                <span className="cp-online-dot" />
                <span className="cp-online-text">Online</span>
              </div>
            </div>
            <div className="cp-header-actions">
              <a
                href={`tel:${driver.driver_phone}`}
                className="cp-call-btn"
                title="Call driver"
              >
                <BiSolidPhoneCall size={22} />
              </a>
              <button
                className="chat-close-btn"
                onClick={handleClose}
                title="Close"
              >
                <RxCross2  size={18}/>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="cp-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`cp-msg-row ${
                  msg.sender === "passenger" ? "cp-msg-right" : "cp-msg-left"
                }`}
              >
                {msg.sender === "driver" && (
                  <img
                    src={driver.driver_profile_picture}
                    alt=""
                    className="cp-msg-avatar"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(driver.driver_name)}&background=1a56db&color=fff&size=32`;
                    }}
                  />
                )}
                <div
                  className={`cp-bubble ${
                    msg.sender === "passenger"
                      ? "cp-bubble-passenger"
                      : "cp-bubble-driver"
                  }`}
                >
                  <p className="cp-bubble-text">{msg.text}</p>
                  <span className="cp-bubble-time">{msg.time}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="cp-input-bar">
            <input
              type="text"
              className="cp-input"
              placeholder="Type a message…"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className={`cp-send-btn ${inputText.trim() ? "active" : ""}`}
              onClick={handleSend}
              title="Send"
            >
           <TbSend  size={22}/>

            </button>
          </div>
        </div>

        {isVisible && (
          <div className="chat-panel-overlay" onClick={handleClose} />
        )}
      </div>

      {/* Floating Chat Button */}
      {!isVisible && (
        <button className="chat-bar-showup" type="button" onClick={handleOpen}>
          <img src={chatIcon} alt="chat" height="100%" width="100%" />
          {messages.length > 0 && (
            <span className="chat-badge">{messages.length}</span>
          )}
        </button>
      )}
    </>
  );
};

export default ChatPanel;
