// Margin constants
const LEFT_MARGIN = 33;
const NO_MARGIN = 0;
const AUTO_MARGIN = "auto";

/**
 * Determines margin for the message bubble (e.g., to align left or right based on the sender)
 */
export const isSameSenderMargin = (messages, m, i, userId) => {
  if (!messages || !m || !m.sender || !userId) return NO_MARGIN;

  if (
    i < messages.length - 1 &&
    messages[i + 1]?.sender?._id === m.sender._id &&
    m.sender._id !== userId
  ) {
    return LEFT_MARGIN;
  } else if (
    (i < messages.length - 1 &&
      messages[i + 1]?.sender?._id !== m.sender._id &&
      m.sender._id !== userId) ||
    (i === messages.length - 1 && m.sender._id !== userId)
  ) {
    return NO_MARGIN;
  } else {
    return AUTO_MARGIN;
  }
};

/**
 * Determines if the current message is the last one by the other user
 */
export const isSameSender = (messages, m, i, userId) => {
  if (!messages || !m || !m.sender || !userId) return false;

  return (
    i < messages.length - 1 &&
    (messages[i + 1]?.sender?._id !== m.sender._id ||
      messages[i + 1]?.sender?._id === undefined) &&
    m.sender._id !== userId
  );
};

/**
 * Checks if this message is the last one overall and not sent by the logged-in user
 */
export const isLastMessage = (messages, i, userId) => {
  if (!messages || !messages[i] || !userId) return false;

  return (
    i === messages.length - 1 &&
    messages[i]?.sender?._id !== userId &&
    messages[i]?.sender?._id !== undefined
  );
};

/**
 * Checks if this message was sent by the same user as the previous one
 */
export const isSameUser = (messages, m, i) => {
  if (!messages || !m || !m.sender || i === 0) return false;

  return messages[i - 1]?.sender?._id === m.sender._id;
};

/**
 * Gets the name of the other user in a 1-on-1 chat
 */
export const getSender = (loggedUser, users) => {
  if (!loggedUser || !users || users.length !== 2) return "Unknown User";

  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

/**
 * Gets the full user object of the other person in a 1-on-1 chat
 */
export const getSenderFull = (loggedUser, users) => {
  if (!loggedUser || !users || users.length !== 2) return null;

  return users[0]._id === loggedUser._id ? users[1] : users[0];
};