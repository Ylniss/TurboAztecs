export const getNext = (array, currentItem) => {
  let currentIndex = array.indexOf(currentItem);
  let nextIndex = (currentIndex + 1) % array.length; //it rotates arround collection
  return array[nextIndex];
};
