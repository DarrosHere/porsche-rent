export default function parsePrice(price) {
    return Number(price.replace(/[^0-9]/g, ''));
  }