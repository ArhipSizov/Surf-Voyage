import { database } from "./store/index";

import type { dataUser, dataRests } from "./fbData";

export const addUserDB = (dataUser: dataUser) => {
  const refUser = database.ref("users").push();
  const dataWithKeyUser = {
    key: refUser.key,
    email: dataUser.email,
    password: dataUser.password,
    name: dataUser.name,
    surname: dataUser.surname,
    city: dataUser.city,
    country: dataUser.country,
    number: dataUser.number,
  };
  refUser.set(dataWithKeyUser);
};

export const addRestsDB = (dataRests: dataRests) => {
  const refRests = database.ref("rests").push();
  const dataWithKeyRests = {
    key: refRests.key,
    id: dataRests.id,
    name: dataRests.name,
    description: dataRests.description,
    img: dataRests.img,
    where: dataRests.where,
    long: dataRests.long,
    cost: dataRests.cost,
  };
  refRests.set(dataWithKeyRests);
};
