import { v4 as uuidv4 } from "uuid";

export const uidGenerator = () => {
  const uid = "UID-" + uuidv4();
  return uid;
};
