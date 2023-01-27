const classifyingStatus = (now: string) => {
  if (now === '모집중') {
    return { icon: 'fa-solid fa-hourglass-half', color: 'var(--neon-orange)' };
  }
  if (now === '최소인원충족') {
    return { icon: 'fa-solid fa-star-half-stroke', color: 'var(--neon-blue)' };
  }
  if (now === '모집완료') {
    return { icon: 'fa-solid fa-circle-check', color: 'var(--neon-green)' };
  }
  return { icon: 'fa-solid fa-calendar-check', color: 'white' };
};

export default classifyingStatus;
