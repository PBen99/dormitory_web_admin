import jwt from "jsonwebtoken";

export const getAuth = () => {
  const auth = localStorage.getItem("user");
  return typeof auth === "string" ? JSON.parse(auth) : null;
};

export const setAuth = (token) => {
  const user = jwt.decode(token);
  localStorage.setItem("token", JSON.stringify(token));
  localStorage.setItem("user", JSON.stringify(user));
};

export const isAllowed = (group, permission) => {
  const user = getAuth();
  if (user.group.includes(group)) {
    return true;
  }
  if (user.permission.includes(permission)) {
    return true;
  }
  return false;
};
