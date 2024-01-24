const dotThree = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const formatCurrency = (number) => {
  const numericValue = parseFloat(number);
  if (Number.isNaN(numericValue)) {
    return 0;
  }
  const formattedNumber = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);

  return formattedNumber;
};

const numberFormat = {
  dotThree,
  formatCurrency,
};

export default numberFormat;
