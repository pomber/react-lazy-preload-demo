import React from "react";

const Modal = ({ children, onClose }) => (
  <Overlay onClose={onClose}>
    <Content onClose={onClose}>{children}</Content>
  </Overlay>
);

const Overlay = ({ children, onClose }) => (
  <div
    children={children}
    style={{
      background: "hsla(0, 0%,0%,0.33)",
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      overflow: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
    onClick={event => {
      event.stopPropagation();
      onClose();
    }}
  />
);

const Content = ({ children, onClose }) => (
  <div
    onClick={event => {
      event.stopPropagation();
    }}
    style={{
      background: "white",
      outline: "none",
      position: "relative",
      borderRadius: "10px"
    }}
    aria-modal="true"
    tabIndex="-1"
  >
    <CloseButton onClick={onClose} />
    {children}
  </div>
);

const CloseButton = ({ onClick }) => (
  <button
    style={{
      position: "absolute",
      top: 18,
      right: 18,
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      zIndex: 10,
      color: "#777"
    }}
    onClick={onClick}
  >
    close
  </button>
);

export default Modal;
