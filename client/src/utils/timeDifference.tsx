const timeDifference = (value: string) => {
  const future = new Date(value).getTime();
  const now = new Date().getTime();
  const time = Math.abs(future - now);
  let timeleft;
  if (time < 1000 * 60) {
    // seconds ago
    timeleft = `${Math.floor(time / 1000)}초`;
  } else if (time < 1000 * 60 * 60) {
    // minites ago
    timeleft = `${Math.floor(time / (1000 * 60))}분`;
  } else if (time < 1000 * 60 * 60 * 24) {
    // hours ago
    timeleft = `${Math.floor(time / (1000 * 60 * 60))}시간`;
  } else if (time < 1000 * 60 * 60 * 24 * 30) {
    // days ago
    timeleft = `${Math.floor(time / (1000 * 60 * 60 * 24))}일`;
  } else if (time < 1000 * 60 * 60 * 24 * 365) {
    // months ago
    timeleft = `${Math.floor(time / (1000 * 60 * 60 * 24 * 30))}달`;
  } else {
    // years ago
    timeleft = `${Math.floor(time / (1000 * 60 * 60 * 24 * 365))}년`;
  }
  return future - now < 0 ? `${timeleft} 전` : `${timeleft} 후`;
};

// 남은 시간을 알려주는 함수.
export default timeDifference;
