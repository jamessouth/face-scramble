function getRands(amt: number): Array<number> {
  const nums = new Set();
  while (nums.size < amt) {
    const n: number = Math.floor(Math.random() * amt);
    nums.add(n);
  }
  return Array.from(nums);
}

function checkBoard(size) {
  const randos: Array<number> = getRands(size * size - 1);
  const solArray: Array<number> = [];
  randos.forEach((x, i) => {
    solArray[x] = i;
  });
  return [solArray.concat([size * size - 1]), randos.concat([size * size - 1])];
}

function getInversions(arr: Array<number>): number {
  let inversions: number = 0;
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] == null) { continue; }
    for (let j = 0; j < arr.length; j += 1) {
      if (arr[i] > arr[j + i]) {
        inversions += 1;
      }
    }
  }
  return inversions;
}





export function getBoardOrder(size): Array<number> {
  let doable = checkBoard(size);
  while (getInversions(doable[0]) % 2 !== 0) {
    doable = checkBoard(size);
  }
  return doable[1];
}





export function getCanvArray(size): Array<any> {
  const canvArray: Array<any> = [];
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      canvArray.push([j, i]);
    }
  }
  return canvArray;
}













export function onWin(el): void {
  el.animate({
      duration: 800,
      delay: 100,
      curve: 'easeInOut',
      scale: { x: 5.7, y: 3.4 }
  }).then(() => el.animate({
      duration: 800,
      curve: 'easeInOut',
      scale: { x: .5, y: .5 }
  })).then(() => el.animate({
      duration: 3000,
      curve: 'spring',
      scale: { x: 3.7, y: 3 }
  }));
}
