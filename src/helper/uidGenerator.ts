import { v7 as uuidv7 } from "uuid";

export const uidGenerator = () => {
  const uid = "UID-" + uuidv4();
  return uid;
};
