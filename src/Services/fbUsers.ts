import { database } from "./store/index";

interface userData {
  email: string;
  pasword: string;
}

export const addUserDB = (userData: userData) => {
  const ref = database.ref("users").push();
  const newKey = ref.key;
  const dataWithKey = {
    key: newKey,
    email: userData.email,
    password: userData.pasword,
    name: "Аноним",
    number: "нету",
  };
  ref.set(dataWithKey);
};
