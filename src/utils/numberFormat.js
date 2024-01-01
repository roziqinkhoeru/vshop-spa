const dotThree = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const numberFormat = {
  dotThree,
};

export default numberFormat;
