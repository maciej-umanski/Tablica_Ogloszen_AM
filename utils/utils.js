import {
    format
} from "date-fns";

export const getDateString = (date, formatPattern = "dd.MM.yyyy HH:mm") => {
    if (!!!date) return "";
    return format(new Date(date), formatPattern);
}

export const isPasswordInvalid = (password, rePassword, setErrorMsgCallback = () => null) => {
    if (password.length <= 5) {
        setErrorMsgCallback("Password must contain more than 5 characters!");
      return true;
    } else if (!password.match(rePassword)) {
        setErrorMsgCallback("Provided passwords are not equal!");
      return true;
    }
    return false;
  };

export const isEmailInvalid = (users, email,setErrorMsgCallback = () => null) => {
  if (users.find((user) => user.email == email)) {
    setErrorMsgCallback("Email is taken!");
    return true;
  } else if (!email.includes("@")) {
    setErrorMsgCallback("Email must be in valid format");
    return true;
  }
  return false;
};

export const isPhoneNumberInvalid = (phoneNumber, setErrorMsgCallback = () => null) => {
    if (!phoneNumber.length) {
      setErrorMsgCallback("Phone number is required!");
      return true;
    }
    return false;
  };
