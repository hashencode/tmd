const isEmpty = (value) => {
  const protoString = Object.prototype.toString.call(value);
  return (
    ["[object Undefined]", "[object Null]"].indexOf(protoString) >= 0 ||
    (protoString === "[object String]" && value === "")
  );
};

export default isEmpty;
