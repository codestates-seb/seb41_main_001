const classifyingGender = (gender: string) => {
  if (gender === 'Male') {
    return { text: '남성만', icon: 'fa-solid fa-mars' };
  }
  if (gender === 'Female') {
    return { text: '여성만', icon: 'fa-solid fa-venus' };
  }
  return { text: '성별무관', icon: 'fa-solid fa-venus-mars' };
};

export default classifyingGender;
