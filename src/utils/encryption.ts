// Simple encryption/decryption using a basic algorithm
// This is not meant to be cryptographically secure, just to obfuscate the message

const ENCRYPTION_KEY = 'admaxer-fun'; // This can be any string

export const encryptMessage = (message: string): string => {
  let result = '';
  for (let i = 0; i < message.length; i++) {
    const charCode = message.charCodeAt(i);
    const keyChar = ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
    const encryptedChar = charCode ^ keyChar;
    result += String.fromCharCode(encryptedChar);
  }
  return btoa(result); // Convert to base64 for URL safety
};

export const decryptMessage = (encryptedMessage: string): string => {
  try {
    const decoded = atob(encryptedMessage);
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i);
      const keyChar = ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      const decryptedChar = charCode ^ keyChar;
      result += String.fromCharCode(decryptedChar);
    }
    return result;
  } catch (error) {
    return 'Invalid message';
  }
}; 