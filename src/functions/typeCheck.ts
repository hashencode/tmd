const typeCheck = ({
  value,
  type,
}: {
  value: any;
  type: "String" | "Array" | "Boolean";
}) => {
  return Object.prototype.toString.call(value) === `[object ${type}]`;
};

export default typeCheck;
