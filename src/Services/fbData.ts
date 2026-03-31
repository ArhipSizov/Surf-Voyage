export interface dataUser {
  id: string;
  key: string;
  name: string;
  email: string;
  password: string;
  surname?: string;
  city?: string;
  country: string;
  number: string;
}

export interface dataRests {
  id: number;
  name: string;
  description: string;
  img: string;
  where: string;
  long: number;
  cost: number;
}
