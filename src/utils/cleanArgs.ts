// args에서 받아온 키값을 널이 아닌것만 걸러내는 함수
const cleanNullArgs = (args: object): object => {
  const notNull = {};
  Object.keys(args).forEach(key => {
    if (args[key] !== null) {
      notNull[key] = args[key];
    }
  });
  return notNull;
};

export default cleanNullArgs;
