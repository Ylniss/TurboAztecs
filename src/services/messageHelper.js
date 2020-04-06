export const addMessageType = (type, message) => {
  message = { data: message, type: type };
  return message;
};
