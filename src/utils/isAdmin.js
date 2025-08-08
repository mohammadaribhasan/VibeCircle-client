// src/utils/isAdmin.js
export const adminEmails = ["mdaribhasan00@gmail.com"];

export const isAdmin = (user) => {
  return user && adminEmails.includes(user.email);
};
