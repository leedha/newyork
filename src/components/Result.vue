<template>
  <v-content>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 xl2>
          <v-toolbar color="blue accent-4 mb-2" dark dense>
            <v-toolbar-title>양도소득세 계산결과</v-toolbar-title>
          </v-toolbar>

          <v-spacer></v-spacer>

          <v-card flat>
            <v-card-text>** 계산결과는 참고용으로 사용해주세요.</v-card-text>
            <v-card-text>
              <v-expansion-panels accordion multiple>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <v-row no-gutters>
                      <v-col>소재지</v-col>
                      <v-col>---</v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>조정대상지역</v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <v-row no-gutters>
                      <v-col>양도가액</v-col>
                      <v-col>{{sellPrice}}</v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>양도일자:</v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <v-row no-gutter>
                      <v-col>취득가액</v-col>
                      <v-col>-</v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>취득일자:</v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <v-row no-gutters>
                      <v-col>필요경비</v-col>
                      <v-col>-</v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>취득세: 원
                    <br>법무사비: 원
                    <br>중개수수료: 원 (취득 + 양도)
                    <br>국민주택채권 매각차손: 원
                    <br>수리비: 원
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <v-row no-gutters>
                      <v-col>양도차익</v-col>
                      <v-col>-</v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>양도차익 = 양도가액 - 취득가액 - 필요경비</v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <v-row no-gutters>
                      <v-col cols="7">장기보유 특별공제</v-col>
                      <v-col>-</v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-simple-table dense class="elevation-1 mb-5">
                      <thead>
                        <tr class="bg-gr-l5">
                          <th>보유기간</th>
                          <th>공제율</th>
                        </tr>
                      </thead>
                      <tbody>
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

                    <v-simple-table dense class="elevation-1 mb-5">
                      <thead>
                        <tr class="bg-gr-l4">
                          <th colspan="2">1세대1주택 9억 초과 주택
                            <br>( 2년 이상 거주시 9억초과분에 한해서)
                          </th>
                        </tr>
                        <tr class="bg-gr-l5">
                          <th>보유기간</th>
                          <th>공제율</th>
                        </tr>
                      </thead>
                      <tbody>
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

                    <div>
                      <v-icon small color="green darken-1">mdi-check</v-icon>조정대상지역 외 다주택자는 공제 가능
                      <br>
                      <v-icon small color="green darken-1">mdi-check</v-icon>조정대상지역 내 다주택자는 공제 불가
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <v-row no-gutters>
                      <v-col>양도소득금액</v-col>
                      <v-col>-</v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>양도소득금액 = 양도차익 - 장기보유특별공제</v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <v-row no-gutters>
                      <v-col cols="7">양도소득기본공제</v-col>
                      <v-col>-</v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>기본공제 1인당 연간 250만원 한도</v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <v-row no-gutters>
                      <v-col>과세표준</v-col>
                      <v-col>-</v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>과세표준 = 양도소득금액 - 양도소득기본공제</v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <v-row no-gutters>
                      <v-col>세율</v-col>
                      <v-col>-</v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-simple-table dense class="elevation-1 mb-5">
                      <thead>
                        <tr class="bg-gr-l5">
                          <th>과세표준액</th>
                          <th>기본세율</th>
                        </tr>
                      </thead>
                      <tbody>
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
                          <th colspan="2">조정대상지역 1가구 2주택 (입주권 포함)
                            <br>: 기본세율 + 10%
                          </th>
                        </tr>
                        <tr>
                          <th colspan="2">조정대상지역 1가구 3주택 (입주권 포함)
                            <br>: 기본세율 + 20%
                          </th>
                        </tr>
                      </tbody>
                    </v-simple-table>

                    <v-simple-table dense class="elevation-1 mb-5">
                      <thead>
                        <tr class="bg-gr-l4">
                          <th colspan="2">※ (조합원) 입주권</th>
                        </tr>
                        <tr class="bg-gr-l5">
                          <th>보유기간</th>
                          <th>세율</th>
                        </tr>
                      </thead>
                      <tbody>
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

                    <v-simple-table dense class="elevation-1 mb-5">
                      <thead>
                        <tr class="bg-gr-l4">
                          <th colspan="2">※ 분양권</th>
                        </tr>
                        <tr class="bg-gr-l5">
                          <th>보유기간</th>
                          <th>세율</th>
                        </tr>
                      </thead>
                      <tbody>
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
                          <th colspan="2">조정대상지역은 분양권 전매 금지</th>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <v-row no-gutters>
                      <v-col>산출 세액</v-col>
                      <v-col>-</v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>과세표준 × 세율 = 산출세액</v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header class="bg-gr-l5">
                    <v-row no-gutters>
                      <v-col>양도소득세</v-col>
                      <v-col>-</v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>납부해야할 금액 입니다.</v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header class="bg-gr-l5">
                    <v-row no-gutters>
                      <v-col>지방소득세</v-col>
                      <v-col>-</v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>납부해야할 금액 입니다.
                    <br>지방소득세 = 산출세액 × 10%
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-text class="fc-gr">** 양도소득세와 지방소득세는
              <br>각각의 고지서로 2가지 모두 납부해야 합니다.
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-actions class="mt-3 pb-7">
              <v-btn color="primary" min-width="48%" dark to="/start">처음으로</v-btn>
              <v-btn color="primary" min-width="48%" dark to="/steps">다시계산</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<style type="text/css">
.v-expansion-panel-content {
  font-size: small;
  color: grey;
}

th {
  color: grey;
}
</style>

<script>
export default {
  mounted: function() {
    const sellPrice = localStorage.getItem("sellPrice");
    if (sellPrice) {
      /*try {
        this.sellPrice = JSON.parse(localStorage.getItem("sellPrice"));
      } catch (e) {
        localStorage.removeItem("sellPrice");
      }*/
      this.sellPrice = sellPrice;
    }
  },
  data: () => ({
    sellPrice: ""
  })
};
</script>