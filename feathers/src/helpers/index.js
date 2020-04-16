// Helper functions
const randomFromArray = array => array[Math.floor(Math.random() * array.length)];
const shuffleArray = array => array.sort(() => 0.5 - Math.random());
const randomBetween = (min, max) => Math.floor(Math.random() * max) + min;

/**
 * @desc Transforms an array of strings into an array of objects
 * where in each object contains the string and the number of
 * occurances
 * @param [String] arr
 * @returns [{ city: String, count: Number }]
 **/
const transformArray = arr => {
    const output = [];
    arr.forEach(city => {
        const count = arr.filter(c => c === city).length;
        // check that the city doesn't exist already
        const exists = output.filter(c => c.city === city).length > 0;
        if (!exists) {
            output.push({ city, count });
        }
    });
    return output;
};

module.exports = { randomFromArray, shuffleArray, randomBetween, transformArray };