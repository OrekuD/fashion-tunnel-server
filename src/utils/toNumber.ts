const toNumber = (number: string): number => {
  try {
    return Number(number);
  } catch (error) {
    return 0;
  }
};

export default toNumber;
