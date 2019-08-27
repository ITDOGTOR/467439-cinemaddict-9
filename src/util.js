const getRandomInt = ({min, max}) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayElement = (array) => array[Math.floor((Math.random() * array.length) + 0)];
const getRandomArrayElements = (array, elementCount) => array.slice().sort(() => Math.random() - 0.5).slice(0, elementCount);
const getRandomBoolean = () => Boolean(Math.random() > 0.5);

export {getRandomInt, getRandomArrayElement, getRandomArrayElements, getRandomBoolean};
