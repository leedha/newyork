export default {
  //중개수수료 자동 계산
  brokerFee: function(amount) {
    if (amount < 50000000) {
      if (amount * 0.006 > 250000) {
        return 250000;
      } else {
        return amount * 0.006;
      }
    } else if (amount < 200000000) {
      if (amount * 0.005 > 800000) {
        return 800000;
      } else {
        return amount * 0.005;
      }
    } else if (amount < 600000000) {
      return amount * 0.004;
    } else if (amount < 900000000) {
      return amount * 0.005;
    } else {
      return amount * 0.009;
    }
  }
};
