import { database } from "./store/index";

interface userData {
  email: string;
  pasword: string;
  name: string;
  surname: string;
  city: string;
  country: string;
  number: string;
}

export const addUserDB = (userData: userData) => {
  const ref = database.ref("users").push();
  const newKey = ref.key;
  const dataWithKey = {
    key: newKey,
    email: userData.email,
    password: userData.pasword,
    name: userData.name,
    surname: userData.surname,
    city: userData.city,
    country: userData.country,
    number: userData.number,
  };
  ref.set(dataWithKey);
};
