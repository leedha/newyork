export default {
  getDiscountRate(days) {
    // 장기보유 특별공제율
    var discountRate = 0;

    if (days < 365 * 3) {
      discountRate = 0;
    } else {
      discountRate = 0.04;
      for (let i = 3; i <= days / 365; i++) {
        if (discountRate >= 0.3) {
          break;
        }
        discountRate = discountRate + 0.02;
      }
    }
    return discountRate.toFixed(2);
  },

  getDiscountRateFor900M(days) {
    //9억초과 장기보유 특별공제율 구하기
    var discountRate = 0;

    if (days < 365 * 3) {
      discountRate = 0;
    } else {
      discountRate = 0.16;
      for (let i = 3; i <= days / 365; i++) {
        if (discountRate >= 0.8) {
          break;
        }
        discountRate = discountRate + 0.08;
      }
    }
    return discountRate.toFixed(2);
  }
};
