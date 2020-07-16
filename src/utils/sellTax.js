export default {
  getTaxRateForHouse(taxBase, controlArea, houseCnt) {
    var taxRate = 0;
    if (taxBase <= 0) {
      taxRate = 0;
    }
    else if (taxBase <= 12000000) {
      taxRate = 0.06;
    } else if (taxBase <= 46000000) {
      taxRate = 0.15;
    } else if (taxBase <= 88000000) {
      taxRate = 0.24;
    } else if (taxBase <= 150000000) {
      taxRate = 0.35;
    } else if (taxBase <= 300000000) {
      taxRate = 0.38;
    } else if (taxBase <= 500000000) {
      taxRate = 0.4;
    } else {
      //5억 초과
      taxRate = 0.42;
    }

    if (controlArea === 1 && houseCnt === 2) {
      // 조정대상지역 2주택
      taxRate = taxRate + 0.1;
    }

    if (controlArea === 1 && houseCnt === 3) {
      // 조정대상지역 3주택
      taxRate = taxRate + 0.2;
    }

    return taxRate;
  },

  getTaxRateForResidenceRight(taxBase, period) {
    // 조합원 입주권
    var taxRate = 0;
    if (period < 365) {
      // 1년 미만 보유
      taxRate = 0.4;
    } else {
      // 2년 이상 보유
      if (taxBase <= 0) {
        taxRate = 0;
      } else if (taxBase <= 12000000) {
        taxRate = 0.06;
      } else if (taxBase <= 46000000) {
        taxRate = 0.15;
      } else if (taxBase <= 88000000) {
        taxRate = 0.24;
      } else if (taxBase <= 150000000) {
        taxRate = 0.35;
      } else if (taxBase <= 300000000) {
        taxRate = 0.38;
      } else if (taxBase <= 500000000) {
        taxRate = 0.4;
      } else {
        //5억 초과
        taxRate = 0.42;
      }
    }
    return taxRate;
  },

  getTaxRateForOwnRight(taxBase, period) {
    // 분양권
    var taxRate;
    if (period < 365) {
      // 1년 미만 보유
      taxRate = 0.5;
    } else if (period < 365 * 2) {
      // 2년 미만 보유
      taxRate = 0.4;
    } else {
      // 2년 이상 보유
      if (taxBase <= 0) {
        taxRate = 0;
      } else if (taxBase <= 12000000) {
        taxRate = 0.06;
      } else if (taxBase <= 46000000) {
        taxRate = 0.15;
      } else if (taxBase <= 88000000) {
        taxRate = 0.24;
      } else if (taxBase <= 150000000) {
        taxRate = 0.35;
      } else if (taxBase <= 300000000) {
        taxRate = 0.38;
      } else if (taxBase <= 500000000) {
        taxRate = 0.4;
      } else {
        //5억 초과
        taxRate = 0.42;
      }
    }
    return taxRate;
  },

  getTaxRate(sellType, taxBase, period, houseCnt, controlArea) {
    if (sellType === "house") {
      return this.getTaxRateForHouse(taxBase, controlArea, houseCnt);
    } else if (sellType === "residenceRight") {
      return this.getTaxRateForResidenceRight(taxBase, period);
    } else if (sellType === "ownRight") {
      return this.getTaxRateForOwnRight(taxBase, period);
    } else {
      return 0;
    }
  }
};
