export default {
  getMargin(sellPrice, buyPrice, totalCost, sellType) {
    var margin = Number(sellPrice) - Number(buyPrice) - Number(totalCost);

    console.log(margin);

    var taxFreeMargin = 0;

    if (sellType === "luxuryHouse") {
      // 1세대1주택 9억 이상 고가 주택
      taxFreeMargin =
        margin - (margin * (Number(sellPrice) - 900000000)) / Number(sellPrice); // 비과세 되는 양도차익

      console.log(taxFreeMargin);

      margin = Number(margin) - Number(taxFreeMargin); // 과세되는 양도차익
    }
    return margin.toFixed(0);
  }
};
