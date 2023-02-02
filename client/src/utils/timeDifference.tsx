const timeDifference = (value: string) => {
  const TIME_INPUT = new Date(value).getTime();
  const TIME_NOW = new Date().getTime();
  const TIME_DIFF = Math.abs(TIME_INPUT - TIME_NOW);
  let timeleft;
  if (TIME_DIFF < 1000 * 60) {
    // seconds ago
    timeleft = `${Math.floor(TIME_DIFF / 1000)}초`;
  } else if (TIME_DIFF < 1000 * 60 * 60) {
    // minites ago
    timeleft = `${Math.floor(TIME_DIFF / (1000 * 60))}분`;
  } else if (TIME_DIFF < 1000 * 60 * 60 * 24) {
    // hours ago
    timeleft = `${Math.floor(TIME_DIFF / (1000 * 60 * 60))}시간`;
  } else if (TIME_DIFF < 1000 * 60 * 60 * 24 * 30) {
    // days ago
    timeleft = `${Math.floor(TIME_DIFF / (1000 * 60 * 60 * 24))}일`;
  } else if (TIME_DIFF < 1000 * 60 * 60 * 24 * 365) {
    // months ago
    timeleft = `${Math.floor(TIME_DIFF / (1000 * 60 * 60 * 24 * 30))}달`;
  } else {
    // years ago
    timeleft = `${Math.floor(TIME_DIFF / (1000 * 60 * 60 * 24 * 365))}년`;
  }
  return TIME_INPUT - TIME_NOW <= 0 ? `${timeleft} 전` : `${timeleft} 후`;
};

// 남은 시간을 알려주는 함수.
export default timeDifference;
