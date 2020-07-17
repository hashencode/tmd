const objectStyleToString = (obj) => {
  const keysArray = Object.keys(obj);
  if (keysArray.length < 0) return "";
  let stringStyle = "";
  keysArray.map((item) => {
    stringStyle += `;${item}:${obj[item]}`;
  });
  return stringStyle;
};

export default objectStyleToString;
