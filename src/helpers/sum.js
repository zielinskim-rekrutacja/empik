const sum = (arr, key) => arr.map(item => item[key]).reduce((prev, next) => Number(prev) + Number(next));

export default sum