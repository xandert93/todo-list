exports.getPrettyDate = () => {
  let options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };

  return new Date().toLocaleDateString('en-US', options);
};

exports.getOnlyDay = () => {
  let options = {
    weekday: 'long',
  };

  return new Date().toLocaleDateString('en-US', options);
};

// const getPrettyDate = () => {
//     let options = {
//       weekday: 'long',
//       day: 'numeric',
//       month: 'long',
//     };

//     return new Date().toLocaleDateString('en-US', options);
//   };

//   const getOnlyDay = () => {
//     let options = {
//       weekday: 'long',
//     };

//     return new Date().toLocaleDateString('en-US', options);
//   };

//   module.exports = { getPrettyDate, getOnlyDay };
