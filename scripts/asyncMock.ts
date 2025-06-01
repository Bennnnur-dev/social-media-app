// for dev only

export default function asyncMock(ms: number, error?: boolean) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) return reject("error");
      resolve;
    }, ms);
  });
}
