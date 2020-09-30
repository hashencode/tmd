const createUniqueId = () => {
  return `ID${Math.random().toString().slice(5, 10)}${new Date().getTime()}`;
};

export default createUniqueId;
