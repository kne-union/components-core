import dayjs from "dayjs";

const ageComputedFun = (birthday) => {
  if (!birthday) return false;
  birthday = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  if (
    !(
      birthday.getMonth() < today.getMonth() ||
      (birthday.getMonth() === today.getMonth() &&
        birthday.getDate() < today.getDate())
    )
  ) {
    age -= 1;
  }
  return Math.max(0, age);
};

export const ageComputedToBirth = (age) => {
  const today = new Date();
  let birthYear = today.getFullYear() - age;
  const birthMonth = today.getMonth() + 1;

  return dayjs(
    `${birthYear}-${birthMonth < 10 ? "0" + birthMonth : birthMonth}`
  );
};

export default ageComputedFun;
