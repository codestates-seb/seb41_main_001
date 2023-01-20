const modifyingDate = (d: string) => {
  const year = new Date(d).getFullYear();
  const month = new Date(d).getMonth() + 1;
  const date = new Date(d).getDate();
  const hour = new Date(d).getHours();
  const minute = new Date(d).getMinutes();
  return `${year}년 ${month}월 ${date}일 ${
    hour > 12 ? `오후 ${hour % 12}` : `오전 ${hour}`
  }시 ${minute > 0 ? `${minute}분` : ''}`;
};

export default modifyingDate;
