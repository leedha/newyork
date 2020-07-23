<template>
  <v-app>
    <v-app-bar app dark color="indigo darken-2">
      <v-toolbar-title class="text-center">양도소득세 계산결과</v-toolbar-title>
    </v-app-bar>

    <v-main class="indigo darken-4">
      <v-container align="center" justify="center">
        <v-row>
          <v-col>
            <v-card flat color="indigo lighten-4">
              <v-card-text>
                ** 계산결과는 참고용으로 사용해주세요.
                <br />
                <br />
                <v-expansion-panels accordion multiple dark class="font">
                  <v-expansion-panel>
                    <v-expansion-panel-header color="indigo darken-4">
                      <v-row no-gutters>
                        <v-col>
                          <v-icon small>mdi-check-circle</v-icon>&nbsp;소재지
                        </v-col>
                        <v-col>
                          <span class="fc-pk" v-if="area === '1'">조정대상지역</span>
                          <span class="fc-pk" v-else>조정대상지역 아닌 지역</span>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content color="indigo darken-3">
                      조정대상지역인 경우
                      <br />- 다주택자 장기보유 특별 공제 적용 배제
                      <br />- 2020년 7월부터 다주택자 중과세 (2주택자 10%p, 3주택자 20%p 추가세율 적용)
                      <br />- 일시적 2주택 비과세 특례 요건 강화
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-header color="indigo darken-4">
                      <v-row no-gutters>
                        <v-col>
                          <v-icon small>mdi-check-circle</v-icon>&nbsp;양도가액
                        </v-col>
                        <v-col>
                          <v-icon x-small>mdi-currency-krw</v-icon>
                          {{sellPrice | comma}}원
                        </v-col>
                      </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content color="indigo darken-3">양도일자 {{sellDate}}</v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-header color="indigo darken-4">
                      <v-row no-gutters>
                        <v-col>
                          <v-icon small>mdi-check-circle</v-icon>&nbsp;취득가액
                        </v-col>
                        <v-col>
                          <v-icon x-small>mdi-currency-krw</v-icon>
                          {{buyPrice | comma}}원
                        </v-col>
                      </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content color="indigo darken-3">취득일자 {{buyDate}}</v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-header color="indigo darken-4">
                      <v-row no-gutters>
                        <v-col>
                          <v-icon small>mdi-check-circle</v-icon>&nbsp;필요경비
                        </v-col>
                        <v-col>
                          <v-icon x-small>mdi-currency-krw</v-icon>
                          {{totalCost | comma}}
                        </v-col>
                      </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content color="indigo darken-3">
                      - 취득세 {{buyTax | comma}}원
                      <br />
                      - 법무사비 {{legalCost | comma}}원
                      <br />- 중개수수료
                      <br />
                      (취득시 {{brokerFeeBuy | comma}}원 + 양도시 {{brokerFeeSell | comma}}원)
                      <br />
                      - 국민주택채권 매각차손 {{bondLoss | comma}}원
                      <br />
                      - 수리비 {{repairCost | comma}}원
                      <br />
                      합계 {{totalCost | comma}}원
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-header color="indigo darken-4">
                      <v-row no-gutters>
                        <v-col>
                          <v-icon small>mdi-numeric-1-box</v-icon>&nbsp;양도차익
                        </v-col>
                        <v-col>
                          <v-icon x-small>mdi-currency-krw</v-icon>
                          {{myMargin | comma}}
                        </v-col>
                      </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content color="indigo darken-3">
                      양도차익 = 양도가액 - 취득가액 - 필요경비
                      <br />
                      <br />1세대1주택 9억 초과인 경우
                      <br />비과세 양도차익 = 양도차익 - (양도차익 × (양도가액 - 9억) ÷ 양도가액)
                      <br />과세되는 양도차익 = 양도차익 - 비과세 양도차익
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-header color="indigo darken-4">
                      <v-row no-gutters>
                        <v-col>
                          <v-icon small>mdi-numeric-2-box</v-icon>&nbsp;장기보유 특별공제
                        </v-col>
                        <v-col>
                          <v-icon x-small>mdi-currency-krw</v-icon>
                          {{myDiscount | comma}}
                        </v-col>
                      </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content color="indigo darken-3">
                      <div>
                        <v-icon small color="blue darken-1">mdi-check</v-icon>조정대상지역이
                        <span class="fc-pk">아닌</span> 다주택자는 공제
                        <span class="fc-pk">가능</span>
                        <br />
                        <v-icon small color="blue darken-1">mdi-check</v-icon>조정대상지역 내 다주택자는 공제 불가
                      </div>

                      <v-simple-table dense light class="elevation-1 mt-5 mb-5">
                        <thead>
                          <tr class="bg-tbl-1">
                            <th>보유기간</th>
                            <th>공제율</th>
                          </tr>
                        </thead>
                        <tbody class="bg-tbl-3">
                          <tr>
                            <th>3년이상~4년미만</th>
                            <th>6%</th>
                          </tr>
                          <tr>
                            <th>4년이상~5년미만</th>
                            <th>8%</th>
                          </tr>
                          <tr>
                            <th>5년이상~6년미만</th>
                            <th>10%</th>
                          </tr>
                          <tr>
                            <th>6년이상~7년미만</th>
                            <th>12%</th>
                          </tr>
                          <tr>
                            <th>7년이상~8년미만</th>
                            <th>14%</th>
                          </tr>
                          <tr>
                            <th>8년이상~9년미만</th>
                            <th>16%</th>
                          </tr>
                          <tr>
                            <th>9년이상~10년미만</th>
                            <th>18%</th>
                          </tr>
                          <tr>
                            <th>10년이상~11년미만</th>
                            <th>20%</th>
                          </tr>
                          <tr>
                            <th>11년이상~12년미만</th>
                            <th>22%</th>
                          </tr>
                          <tr>
                            <th>12년이상~13년미만</th>
                            <th>24%</th>
                          </tr>
                          <tr>
                            <th>13년이상~14년미만</th>
                            <th>26%</th>
                          </tr>
                          <tr>
                            <th>14년이상~15년미만</th>
                            <th>28%</th>
                          </tr>
                          <tr>
                            <th>15년이상</th>
                            <th>30%</th>
                          </tr>
                        </tbody>
                      </v-simple-table>

                      <v-simple-table dense light class="elevation-1 mb-5">
                        <thead>
                          <tr class="bg-tbl-1">
                            <th colspan="2">
                              1세대1주택 9억 초과 주택
                              <br />(2년 이상 거주시 9억초과분에 한해서)
                            </th>
                          </tr>
                          <tr class="bg-tbl-2">
                            <th>보유기간</th>
                            <th>공제율</th>
                          </tr>
                        </thead>
                        <tbody class="bg-tbl-3">
                          <tr>
                            <th>3년이상~4년미만</th>
                            <th>24%</th>
                          </tr>
                          <tr>
                            <th>4년이상~5년미만</th>
                            <th>32%</th>
                          </tr>
                          <tr>
                            <th>5년이상~6년미만</th>
                            <th>40%</th>
                          </tr>
                          <tr>
                            <th>6년이상~7년미만</th>
                            <th>48%</th>
                          </tr>
                          <tr>
                            <th>7년이상~8년미만</th>
                            <th>56%</th>
                          </tr>
                          <tr>
                            <th>8년이상~9년미만</th>
                            <th>64%</th>
                          </tr>
                          <tr>
                            <th>9년이상~10년미만</th>
                            <th>72%</th>
                          </tr>
                          <tr>
                            <th>10년이상</th>
                            <th>80%</th>
                          </tr>
                        </tbody>
                      </v-simple-table>
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-header color="indigo darken-4">
                      <v-row no-gutters>
                        <v-col>
                          <v-icon small>mdi-numeric-3-box</v-icon>&nbsp;양도소득금액
                        </v-col>
                        <v-col>
                          <v-icon x-small>mdi-currency-krw</v-icon>
                          {{myProfit | comma}}
                        </v-col>
                      </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content color="indigo darken-3">양도소득금액 = 양도차익 - 장기보유특별공제</v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-header color="indigo darken-4">
                      <v-row no-gutters>
                        <v-col>
                          <v-icon small>mdi-numeric-4-box</v-icon>&nbsp;양도소득기본공제
                        </v-col>
                        <v-col>
                          <v-icon x-small>mdi-currency-krw</v-icon>
                          {{myBasicDiscount | comma}}
                        </v-col>
                      </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content color="indigo darken-3">기본공제 1인당 연간 250만원 한도</v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-header color="indigo darken-4">
                      <v-row no-gutters>
                        <v-col>
                          <v-icon small>mdi-numeric-5-box</v-icon>&nbsp;과세표준
                        </v-col>
                        <v-col>
                          <v-icon x-small>mdi-currency-krw</v-icon>
                          {{myTaxBase | comma}}
                        </v-col>
                      </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content color="indigo darken-3">과세표준 = 양도소득금액 - 양도소득기본공제</v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-header color="indigo darken-4">
                      <v-row no-gutters>
                        <v-col>
                          <v-icon small>mdi-numeric-6-box</v-icon>&nbsp;세율
                        </v-col>
                        <v-col>{{Number(myTaxRate) * 100}}%</v-col>
                      </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content color="indigo darken-3">
                      <v-simple-table dense light class="elevation-1 mt-5 mb-5">
                        <thead>
                          <tr class="bg-tbl-1">
                            <th>과세표준액</th>
                            <th>기본세율</th>
                          </tr>
                        </thead>
                        <tbody class="bg-tbl-3">
                          <tr>
                            <th>1,200만원이하</th>
                            <th>6%</th>
                          </tr>
                          <tr>
                            <th>4,600만원이하</th>
                            <th>15%</th>
                          </tr>
                          <tr>
                            <th>8,800만원이하</th>
                            <th>24%</th>
                          </tr>
                          <tr>
                            <th>1억5천만원이하</th>
                            <th>35%</th>
                          </tr>
                          <tr>
                            <th>3억원이하</th>
                            <th>38%</th>
                          </tr>
                          <tr>
                            <th>5억원이하</th>
                            <th>40%</th>
                          </tr>
                          <tr>
                            <th>5억원초과</th>
                            <th>42%</th>
                          </tr>
                          <tr>
                            <th colspan="2">
                              조정대상지역 1가구 2주택
                              <br />(입주권 포함, 2021년부터 분양권 포함)
                              <br />: 기본세율 + 10%
                            </th>
                          </tr>
                          <tr>
                            <th colspan="2">
                              조정대상지역 1가구 3주택
                              <br />(입주권 포함, 2021년부터 분양권 포함)
                              <br />: 기본세율 + 20%
                            </th>
                          </tr>
                        </tbody>
                      </v-simple-table>

                      <v-simple-table dense light class="elevation-1 mb-5">
                        <thead>
                          <tr class="bg-tbl-1">
                            <th colspan="2">(조합원) 입주권 (2021년부터 변동됨)</th>
                          </tr>
                          <tr class="bg-tbl-2">
                            <th>보유기간</th>
                            <th>세율</th>
                          </tr>
                        </thead>
                        <tbody class="bg-tbl-3">
                          <tr>
                            <th>1년미만</th>
                            <th>40% (2021년 50%)</th>
                          </tr>
                          <tr>
                            <th>2년미만</th>
                            <th>기본세율 (2021년 40%)</th>
                          </tr>
                          <tr>
                            <th>2년이상</th>
                            <th>기본세율 (2021년 동일)</th>
                          </tr>
                        </tbody>
                      </v-simple-table>

                      <v-simple-table dense light class="elevation-1 mb-5">
                        <thead>
                          <tr class="bg-tbl-1">
                            <th colspan="2">분양권 (2021년 동일)</th>
                          </tr>
                          <tr class="bg-tbl-2">
                            <th>보유기간</th>
                            <th>세율</th>
                          </tr>
                        </thead>
                        <tbody class="bg-tbl-3">
                          <tr>
                            <th>1년미만</th>
                            <th>50%</th>
                          </tr>
                          <tr>
                            <th>2년미만</th>
                            <th>40%</th>
                          </tr>
                          <tr>
                            <th>2년이상</th>
                            <th>기본세율</th>
                          </tr>
                          <tr>
                            <th colspan="2">※ 조정대상지역은 분양권 전매 금지</th>
                          </tr>
                        </tbody>
                      </v-simple-table>
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-header color="indigo darken-4">
                      <v-row no-gutters>
                        <v-col>
                          <v-icon small>mdi-numeric-7-box</v-icon>&nbsp;산출 세액
                        </v-col>
                        <v-col>
                          <v-icon x-small>mdi-currency-krw</v-icon>
                          {{myTaxAmount | comma}}
                        </v-col>
                      </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content color="indigo darken-3">과세표준 × 세율 = 산출세액</v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-header color="pink darken-4">
                      <v-row no-gutters>
                        <v-col>
                          <v-icon small>mdi-numeric-8-box</v-icon>&nbsp;양도소득세
                        </v-col>
                        <v-col>
                          <v-icon x-small>mdi-currency-krw</v-icon>
                          {{myTaxAmount | comma}}
                        </v-col>
                      </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content color="pink darken-3">납부해야할 금액 입니다.</v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-header color="pink darken-4">
                      <v-row no-gutters>
                        <v-col>
                          <v-icon small>mdi-numeric-9-box</v-icon>&nbsp;지방소득세
                        </v-col>
                        <v-col>
                          <v-icon x-small>mdi-currency-krw</v-icon>
                          {{myLocalTax | comma}}
                        </v-col>
                      </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content color="pink darken-3">
                      납부해야할 금액 입니다.
                      <br />지방소득세 = 산출세액 × 10%
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>

              <v-card-text class="fc-gr">
                ** 양도소득세와 지방소득세는
                <br />각각의 고지서로 2가지 모두 납부해야 합니다.
              </v-card-text>

              <v-divider class="mx-4"></v-divider>

              <v-card-actions class="mt-3 pb-7">
                <v-btn color="indigo accent-4" min-width="49.7%" dark to="/start">처음으로</v-btn>
                <v-btn color="indigo accent-4" min-width="49.7%" dark to="/cards">다시계산</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style type="text/css">
.v-expansion-panel-content {
  font-size: small;
  /*color: grey;*/
}

/*th {
  color: grey;
}*/
</style>

<script>
import margin from "../utils/margin";
import period from "../utils/period";
import discountRate from "../utils/discountRate";
import sellTax from "../utils/sellTax";

export default {
  data: () => ({
    sellType: "",
    sellCnt: "",
    houseCnt: "",
    area: "",
    livePeriod: "",

    sellPrice: 0,
    sellDate: "",

    buyPrice: 0,
    buyDate: "",

    buyTax: 0,
    legalCost: 0,
    brokerFeeBuy: 0,
    brokerFeeSell: 0,
    bondLoss: 0,
    repairCost: 0,
    joint: "",

    totalCost: 0,
    myMargin: 0,
    myDiscount: 0,
    myProfit: 0,
    myBasicDiscount: 0,
    myTaxBase: 0,
    myTaxRate: 0,
    myTaxAmount: 0,
    myLocalTax: 0
  }),

  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    number(val) {
      return Number(val);
    }
  },

  mounted() {
    const sellType = localStorage.getItem("sellType");
    if (sellType) {
      this.sellType = sellType;
    }

    var houseCnt = localStorage.getItem("houseCnt");
    if (houseCnt) {
      this.houseCnt = houseCnt;
    }

    var livePeriod = localStorage.getItem("livePeriod");
    if (livePeriod) {
      this.livePeriod = livePeriod;
    }

    var area = localStorage.getItem("area");
    if (area) {
      this.area = area;
    }

    var sellPrice = localStorage.getItem("sellPrice");
    if (sellPrice) {
      this.sellPrice = sellPrice;
    }

    var sellDate = localStorage.getItem("sellDate");
    if (sellDate) {
      this.sellDate = sellDate;
    }

    var buyPrice = localStorage.getItem("buyPrice");
    if (buyPrice) {
      this.buyPrice = buyPrice;
    }

    var buyDate = localStorage.getItem("buyDate");
    if (buyDate) {
      this.buyDate = buyDate;
    }

    var buyTax = localStorage.getItem("buyTax");
    if (buyTax) {
      this.buyTax = buyTax;
    }
    console.log(buyTax);

    var legalCost = localStorage.getItem("legalCost");
    if (legalCost) {
      this.legalCost = legalCost;
    }

    const brokerFeeSell = localStorage.getItem("brokerFeeSell");
    if (brokerFeeSell) {
      this.brokerFeeSell = brokerFeeSell;
    }

    const brokerFeeBuy = localStorage.getItem("brokerFeeBuy");
    if (brokerFeeBuy) {
      this.brokerFeeBuy = brokerFeeBuy;
    }

    var bondLoss = localStorage.getItem("bondLoss");
    if (bondLoss) {
      this.bondLoss = bondLoss;
    }

    var repairCost = localStorage.getItem("repairCost");
    if (repairCost) {
      this.repairCost = repairCost;
    }

    var joint = localStorage.getItem("joint");
    if (joint) {
      this.joint = joint;
    }
    console.log(joint);

    // 필요경비
    var totalCost =
      Number(buyTax) +
      Number(legalCost) +
      Number(brokerFeeBuy) +
      Number(brokerFeeSell) +
      Number(bondLoss) +
      Number(repairCost);
    if (totalCost) {
      this.totalCost = totalCost;
    }

    // 양도차익
    var myMargin = margin.getMargin(sellPrice, buyPrice, totalCost, sellType);
    if (myMargin) {
      this.myMargin = myMargin;
    }

    // 장기보유 특별공제
    var myDiscount =
      myMargin *
      discountRate.getDiscountRate(period.getPeriod(sellDate, buyDate));
    if (myDiscount) {
      this.myDiscount = myDiscount;
    }

    // 양도소득금액
    var myProfit = Number(myMargin) - Number(myDiscount);
    if (myProfit) {
      this.myProfit = myProfit;
    }

    // 양도소득 기본공제
    var myBasicDiscount = Number(joint) * 2500000;
    if (myBasicDiscount) {
      this.myBasicDiscount = myBasicDiscount;
    }

    // 과세표준
    var myTaxBase = Number(myProfit) - Number(myBasicDiscount);
    if (myTaxBase) {
      this.myTaxBase = myTaxBase;
    }

    // 세율
    var myTaxRate = sellTax.getTaxRateForHouse(myTaxBase, area, houseCnt);
    if (myTaxRate) {
      this.myTaxRate = myTaxRate;
    }

    // 산출세액 (양도소득세)
    var myTaxAmount = Number(myTaxBase) * Number(myTaxRate);
    if (myTaxAmount) {
      this.myTaxAmount = myTaxAmount;
    }

    // 지방소득세
    var myLocalTax = Number(myTaxAmount) * 0.1;
    if (myLocalTax) {
      this.myLocalTax = myLocalTax;
    }
  }
};
</script>