const maskingNickname = (n: string) => {
  const NUM_OF_MASKING = Math.floor(n.length / 2);
  const NUM_OF_NON_MASKING = n.length - NUM_OF_MASKING;
  const N_ARRAY = n.split('');
  const FRONT: string[] = [];
  const BACK: string[] = [];
  for (let i = 1; i <= N_ARRAY.length; i += 1) {
    if (i === NUM_OF_NON_MASKING + 1) break;
    if (i % 2 === 1) {
      BACK.unshift(N_ARRAY.pop()!);
    } else {
      FRONT.push(N_ARRAY.shift()!);
    }
  }

  return `${FRONT.join('')}${'*'.repeat(NUM_OF_MASKING)}${BACK.join('')}`;
};

export default maskingNickname;
