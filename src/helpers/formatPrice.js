const formatPrice = arg => new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(arg)

export default formatPrice;
