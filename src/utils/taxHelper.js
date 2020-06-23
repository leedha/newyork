import moment from "moment";

export default {
  tax2019: amount => {
    //취득세 자동 계산 (85m 이상은 1.3% 2.4% 3.5%)
    if (amount <= 600000000) {
      return amount * 0.011;
    } else if (amount <= 900000000) {
      return amount * 0.022;
    } else if (amount > 900000000) {
      return amount * 0.033;
    } else {
      return 0;
    }
  },
  tax2020: amount => {
    if (amount <= 600000000) {
      return amount * 0.011;
    } else if (amount <= 900000000) {
      var rate = ((amount * 2) / 300000000 - 3) * 0.01;

      return amount * rate.toFixed(4) * 1.1;
    } else if (amount > 900000000) {
      return amount * 0.033;
    } else {
      return 0;
    }
  },

  tax: function(amount, buyDate) {
    const year = moment(buyDate).format("YYYY");
    if (year < 2020) {
      return this.tax2019(amount);
    } else {
      return this.tax2020(amount);
    }
  }
};
