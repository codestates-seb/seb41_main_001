const classifyingStatus = (now: string) => {
  if (now === '모집중') {
    return { icon: 'fa-solid fa-hourglass-half' };
  }
  if (now === '모집완료') {
    return { icon: 'fa-solid fa-circle-check' };
  }
  return { icon: 'fa-solid fa-calendar-check' };
};

export default classifyingStatus;
