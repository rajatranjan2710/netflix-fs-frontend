import toast from "react-hot-toast";

export const useValidate = () => {
  const email_regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  const validateSignUp = ({ email, username, password }) => {
    if (!email || !username || !password) {
      toast.error("All fields are required");
      return false;
    }
    // if (!email_regex.test(email)) {
    //   toast.error("Invalid email address");
    //   return false;
    // }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }
    // toast.success("All fields accepted");
    return true;
  };

  const validateSignIn = ({ email, password }) => {
    if (!email || !password) {
      toast.error("All fields are required");
      return false;
    }
    return true;
  };

  return { validateSignUp, validateSignIn };
};
