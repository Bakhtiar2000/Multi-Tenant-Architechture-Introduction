const USER_ROLE = {
  user: "user",
  admin: "admin",
  super_admin: "super_admin",
} as const; // So that no one can modify or write on this object

export default USER_ROLE;
