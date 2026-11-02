export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Credentials matching the assignment specification
      const isValidUser = username.trim().length > 0;
      const isValidPass = password === "demo123456";

      if (isValidUser && isValidPass) {
        resolve({ username: username.trim() });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 500);
  });
}
