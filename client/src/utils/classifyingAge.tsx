const classifyingAge = (ages: string[]) => {
  if (ages.length >= 7) return ['연령 무관'];
  return ages.map((el) => `${el}대`);
};

export default classifyingAge;
