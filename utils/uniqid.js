exports.uniqid = () => Math.random().toString(36).substring(2, 10);

exports.get_random_int = (min, max) => Math.floor(Math.random() * (max - min) + min);
