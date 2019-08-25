const getRandomInt = ({min, max}) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayElement = (array) => array[Math.floor((Math.random() * array.length) + 0)];
const getRandomArrayElements = (array, elementCount) => {
  const copyArray = array.slice();
  const copyArrayLength = array.length >= elementCount ? array.length - elementCount : 0;

  if (array.length >= elementCount) {
    while (--array.length > copyArrayLength) {
      let index = Math.floor((array.length) * Math.random());
      let temp = copyArray[index];
      copyArray[index] = copyArray[array.length];
      copyArray[array.length] = temp;
    }
  }

  return copyArray.slice(copyArrayLength);
};
const getRandomBoolean = () => Boolean(Math.random() > 0.5);

export {getRandomInt, getRandomArrayElement, getRandomArrayElements, getRandomBoolean};
