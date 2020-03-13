// Helper functions
const randomFromArray = array => array[Math.floor(Math.random() * array.length)];
const shuffleArray = array => array.sort(() => 0.5 - Math.random());
const randomBetween = (min, max) => Math.floor(Math.random() * max) + min;

module.exports = { randomFromArray, shuffleArray, randomBetween };