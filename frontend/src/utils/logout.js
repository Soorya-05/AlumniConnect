export const logout = (navigate) => {
  localStorage.removeItem("user");
  navigate("/");
};