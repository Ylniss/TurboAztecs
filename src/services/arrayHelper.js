export const getNext = (array, currentItem) => {
  let currentIndex = array.indexOf(currentItem);
  let nextIndex = (currentIndex + 1) % array.length; //it rotates arround collection
  return array[nextIndex];
};

export const shuffle = array => {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
