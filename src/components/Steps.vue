<template>
  <v-app>
    <v-navigation-drawer app>
      <!-- -->
    </v-navigation-drawer>

    <v-app-bar app dark color="blue darken-4">
      <v-toolbar-title>양도소득세 계산 시작하기</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid grid-list-md>
        <v-row align="center" justify="center">
          <v-col>
            <v-stepper v-model="e6" vertical class="elevation-0">
              <v-stepper-step :complete="e6 > 1" step="1" editable>사전정보 확인</v-stepper-step>
              <v-stepper-content step="1">
                <v-card>
                  <v-card-title class="font-weight-bold">양도한 물건의 종류</v-card-title>
                  <v-card-subtitle class="pb-0">양도한 물건의 종류에 따라서 세율이 달라집니다.</v-card-subtitle>
                  <v-card-text>
                    <v-btn-toggle color="teal" v-model="sellType">
                      <v-btn tile value="house">주택</v-btn>
                    </v-btn-toggle>
                  </v-card-text>

                  <v-card-title class="font-weight-bold">동일년도 주택 매각 갯수</v-card-title>
                  <v-card-subtitle class="pb-0">
                    <v-icon small color="blue darken-2">mdi-check</v-icon>동일년도에 2채 이상 매각시 *합산과세 대상
                    <br />
                    <v-chip small label>**합산과세 란?</v-chip>

                    <br />동일년도에 매각한 물건의 양도차익을 합산해서 과세 (매년 5월 확정신고 때 합산하여 신고)
                    <br />
                    <v-icon small color="blue darken-2">mdi-check</v-icon>(※ 단, 마지막에 매각한 주택이 1세대1주택 요건 충족시
                    <br />마지막에 매각한 주택은 비과세이므로
                    <br />합산과세 대상 아님)
                  </v-card-subtitle>
                  <v-card-text>
                    <v-btn-group :mandatory="false" v-model="sellCnt">
                      <v-btn label="1회 매각" value="1" @change="alert1 = false"></v-btn>
                      <v-btn label="2회 이상 매각" value="2" @change="alert1 = true"></v-btn>
                    </v-btn-group>
                  </v-card-text>

                  <v-alert
                    :value="alert1"
                    type="info"
                    transition="scale-transition"
                  >합산과세 대상이므로 계산이 불가 합니다.</v-alert>

                  <v-alert
                    :value="alert1"
                    dense
                    color="blue-grey"
                    dark
                    border="top"
                    transition="scale-transition"
                  >단, 마지막에 매각한 물건이 비과세 요건을 충족한다면 비과세이므로 계산할 필요 없습니다.</v-alert>

                  <v-card-title class="font-weight-bold">
                    1세대1주택 9억초과
                    <br />또는 다주택자
                  </v-card-title>
                  <v-card-subtitle class="pb-0">
                    <v-icon small color="blue darken-2">mdi-check</v-icon>1세대1주택 요건 충족했지만
                    <br />양도가액이 9억 초과인 경우
                    <br />9억초과분에 한해 과세
                    <br />
                    <v-icon small color="blue darken-2">mdi-check</v-icon>다주택자는 이익금에 따라서 계산
                    <br />(※단, 조정대상지역인 경우 2020년 7월부터 중과세)
                  </v-card-subtitle>
                  <v-card-text>
                    <v-btn-group v-model="houseCnt">
                      <v-btn label="1세대1주택 9억 이하" value="1" @change="alert2 = true"></v-btn>
                      <v-btn label="1세대1주택 9억 초과" value="2" @change="alert2 = false"></v-btn>
                      <v-btn label="2주택 이상 다주택자" value="3" @change="alert2 = false"></v-btn>
                      <v-btn label="3주택 이상 다주택자" value="4" @change="alert2 = false"></v-btn>
                    </v-btn-group>
                  </v-card-text>

                  <v-alert
                    :value="alert2"
                    type="info"
                    transition="scale-transition"
                  >비과세 대상이므로 계산할 필요 없습니다.</v-alert>

                  <v-card-title class="font-weight-bold">실거주 기간</v-card-title>
                  <v-card-subtitle class="pb-0">
                    2년이상 보유하고
                    <br />2년 이상 실제 거주한 경우
                    <br />실거주로 인정됩니다.
                  </v-card-subtitle>
                  <v-card-text>
                    <v-btn-group v-model="livePeriod">
                      <v-btn label="2년 미만 거주" value="1"></v-btn>
                      <v-btn label="2년 이상 거주" value="2"></v-btn>
                    </v-btn-group>
                  </v-card-text>

                  <v-card-title class="font-weight-bold">조정대상지역 여부</v-card-title>
                  <v-card-subtitle></v-card-subtitle>
                  <v-card-text>
                    <v-text-field label="읍/면/동 입력" hide-details outlined></v-text-field>해당 동은 조정대상지역 입니다.
                  </v-card-text>

                  <v-card-actions>
                    <v-btn min-width="48%" color="indigo" @click="e6 = 2, step1();">다음</v-btn>
                    <v-btn min-width="48%" to="/ahead">취소</v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 2" step="2" editable>Q2. 양도 정보 입력</v-stepper-step>
              <v-stepper-content step="2">
                <v-card>
                  <v-card-title class="font-weight-bold">양도일자</v-card-title>
                  <v-card-subtitle>
                    우리집 팔 때 잔금 받은 날 입니다.
                    <br />※ 계약일 아님 주의
                  </v-card-subtitle>
                  <v-card-text>
                    <v-text-field
                      label="양도일 입력"
                      outlined
                      clearable
                      hint="입력 예: 2020-01-09"
                      persistent-hint
                      v-mask="'####-##-##'"
                      v-model="sellDate"
                      hide-details
                    ></v-text-field>
                  </v-card-text>

                  <v-card-title class="font-weight-bold">양도가액</v-card-title>
                  <v-card-subtitle>팔 때 : 계약금 (+ 중도금) + 잔금</v-card-subtitle>
                  <v-card-text>
                    <!--<v-text-field
                    label="양도가액 입력"
                    prefix="₩"
                    outlined
                    v-mask="mask"
                    v-model="sellPrice"
                    ></v-text-field>-->
                    <v-text-field
                      label="양도가액 입력"
                      prefix="₩"
                      outlined
                      v-model="sellPrice"
                      clearable
                      type="number"
                      class="inputPrice"
                      pattern="\d*"
                    ></v-text-field>
                    <!--currency-text-field label="양도가액 입력" v-model="sellPrice"/-->
                  </v-card-text>

                  <v-card-actions>
                    <v-btn min-width="48%" color="indigo" @click="(e6 = 3), step2();">다음</v-btn>
                    <v-btn min-width="48%" @click="e6 = 1">취소</v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 3" step="3" editable>Q3. 취득 정보 입력</v-stepper-step>
              <v-stepper-content step="3">
                <v-card>
                  <v-card-title class="font-weight-bold">취득시기</v-card-title>
                  <v-card-subtitle>
                    우리집 살 때 잔금 준 날 입니다.
                    <br />※ 계약일 아님 주의 ※
                  </v-card-subtitle>
                  <v-card-text>
                    <v-text-field
                      label="취득일 입력"
                      clearable
                      hint="입력 예: 2020-01-09"
                      persistent-hint
                      outlined
                      v-mask="'####-##-##'"
                      v-model="buyDate"
                      hide-details
                    ></v-text-field>
                  </v-card-text>

                  <v-card-title class="font-weight-bold">취득가액</v-card-title>
                  <v-card-subtitle>살 때 : 계약금 (+ 중도금) + 잔금</v-card-subtitle>
                  <v-card-text>
                    <v-text-field
                      label="취득가액 입력"
                      prefix="₩"
                      outlined
                      v-model="buyPrice"
                      hide-details
                      clearable
                      type="number"
                      pattern="\d*"
                      class="inputPrice"
                    ></v-text-field>
                    <!--currency-text-field label="취득가액 입력" v-model="buyPrice"/-->
                  </v-card-text>

                  <v-card-actions>
                    <v-btn min-width="48%" color="indigo" @click="(e6 = 4), step3();">다음</v-btn>
                    <v-btn min-width="48%" @click="e6 = 2">취소</v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-content>

              <v-stepper-step step="4" editable>Q4. 필요 경비</v-stepper-step>
              <v-stepper-content step="4">
                <v-card>
                  <v-card-title class="font-weight-bold">필요 경비 공제</v-card-title>
                  <v-card-subtitle>
                    (세금)계산서, 신용카드 매출전표, 현금영수증 등의 증빙서류가 없는 경우
                    <br />청구서나 은행계좌 송금내역 등이 확인되면 필요 경비로 인정
                  </v-card-subtitle>
                  <v-card-text>
                    <v-text-field
                      label="취득세"
                      hint="전용 85㎡ 이하인 경우 자동 계산 가능"
                      persistent-hint
                      outlined
                      prefix="₩"
                      clearable
                      pattern="\d*"
                      v-model="buyTax"
                      append-icon="mdi-calculator"
                      @click:append="autoCal('tax')"
                    ></v-text-field>
                  </v-card-text>
                  <v-card-text>
                    <v-text-field
                      label="법무사비"
                      hint="없거나 모를 경우 0원으로 계산됨"
                      persistent-hint
                      outlined
                      prefix="₩"
                      clearable
                      pattern="\d*"
                      v-model="legalCost"
                    ></v-text-field>
                  </v-card-text>
                  <v-card-text>
                    <v-text-field
                      label="취득시 중개수수료"
                      hint="취득가액 기준 자동 계산 (참고용)"
                      persistent-hint
                      outlined
                      prefix="₩"
                      clearable
                      pattern="\d*"
                      v-model="brokerFeeBuy"
                      append-icon="mdi-calculator"
                      @click:append="autoCal('brokerFeeBuy')"
                    ></v-text-field>
                  </v-card-text>
                  <v-card-text>
                    <v-text-field
                      label="양도시 중개수수료"
                      hint="양도가액 기준 자동 계산 (참고용)"
                      persistent-hint
                      outlined
                      prefix="₩"
                      clearable
                      pattern="\d*"
                      v-model="brokerFeeSell"
                      append-icon="mdi-calculator"
                      @click:append="autoCal('brokerFeeSell')"
                    ></v-text-field>
                  </v-card-text>
                  <v-card-text>
                    <v-text-field
                      label="*국민주택채권 매각차손"
                      hint="없거나 모를 경우 0원으로 계산됨"
                      persistent-hint
                      outlined
                      prefix="₩"
                      clearable
                      pattern="\d*"
                      v-model="bondLoss"
                    ></v-text-field>
                    <v-chip small label>**국민주택채권 매각차손 이란?</v-chip>
                    <br />[국민주택(1종)채권매출 매입 확인서] 영수증에서 본인부담액 항목
                  </v-card-text>
                  <v-card-text>
                    <v-text-field
                      label="*수리비"
                      hint="없거나 모를 경우 0원으로 계산됨"
                      persistent-hint
                      outlined
                      prefix="₩"
                      clearable
                      pattern="\d*"
                      v-model="repairCost"
                    ></v-text-field>
                    <v-chip small label>**수리비 란?</v-chip>
                    <br />부동산의 수명을 연장시키거나 가치를 상승시키기 위해 지출한 수선비만 가능
                    <br />예1) 발코니 샷시 설치 및 교체비, 방/베란다 확장 공사비, 바닥 시공비, 보일러 교체비 등은
                    <b>가능</b>
                    <br />예2) 장기수선충당금, 벽지, 장판, 싱크대, 문, 조명, 하수도관 교체비, 외벽 도색비, 보일러 수리비, 옥상 방수 공사비, 타일 및 변기 공사비 등은
                    <b>불가능</b>
                  </v-card-text>

                  <v-card-title class="font-weight-bold">공동명의 여부</v-card-title>
                  <v-card-subtitle>
                    기본공제 1인당 연간 250만원 한도
                    <br />(※단, 1년에 2채 매각시 1회만 가능)
                    <br />예) 부부공동명의인 경우 1년에 500만원 한도
                  </v-card-subtitle>
                  <v-card-text>
                    <v-btn-group dense v-model="joint">
                      <v-btn label="1인 단독명의" value="1"></v-btn>
                      <v-btn label="공동명의" value="2"></v-btn>
                    </v-btn-group>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn min-width="48%" color="indigo" to="/result" @click.native="step4();">완료</v-btn>
                    <v-btn min-width="48%" @click="e6 = 3">취소</v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-content>
            </v-stepper>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import createNumberMask from "text-mask-addons/dist/createNumberMask";

//import CurrencyTextField from "./CurrencyTextField.vue";

import taxHelper from "../utils/sellTax";
import brokerFee from "../utils/brokerFee";

const currencyMask = createNumberMask({
  prefix: ""
  //allowDecimal: false,
  //includeThousandsSeparator: true,
  //allowNegative: false
});

export default {
  data: () => ({
    e6: 1,

    mask: currencyMask,

    alert1: false,
    alert2: false,

    sellType: "",
    sellCnt: "",
    houseCnt: "",
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
    joint: ""
  }),

  /*components: {
    CurrencyTextField
  },*/

  mounted() {
    if (localStorage.sellType) {
      this.sellType = localStorage.sellType;
    }
    if (localStorage.sellCnt) {
      this.sellCnt = localStorage.sellCnt;
    }
    if (localStorage.houseCnt) {
      this.houseCnt = localStorage.houseCnt;
    }
    if (localStorage.livePeriod) {
      this.livePeriod = localStorage.livePeriod;
    }

    if (localStorage.sellPrice) {
      this.sellPrice = localStorage.sellPrice;
    }

    if (localStorage.sellDate) {
      this.sellDate = localStorage.sellDate;
    }

    if (localStorage.buyPrice) {
      this.buyPrice = localStorage.buyPrice;
    }

    if (localStorage.buyDate) {
      this.buyDate = localStorage.buyDate;
    }

    if (localStorage.buyTax) {
      this.buyTax = localStorage.buyDate;
    }

    if (localStorage.legalCost) {
      this.legalCost = localStorage.legalCost;
    }

    if (localStorage.brokerFeeBuy) {
      this.brokerFeeBuy = localStorage.brokerFeeBuy;
    }

    if (localStorage.brokerFeeSell) {
      this.brokerFeeSell = localStorage.brokerFeeSell;
    }

    if (localStorage.bondLoss) {
      this.bondLoss = localStorage.bondLoss;
    }

    if (localStorage.repairCost) {
      this.repairCost = localStorage.repairCost;
    }

    if (localStorage.joint) {
      this.joint = localStorage.joint;
    }
  },

  methods: {
    step1() {
      localStorage.sellType = this.sellType;

      localStorage.sellCnt = this.sellCnt;

      localStorage.houseCnt = this.houseCnt;

      localStorage.livePeriod = this.livePeriod;
    },
    step2() {
      localStorage.sellPrice = this.sellPrice; //.replace(/,/g, ""); //remove comma

      localStorage.sellDate = this.sellDate;
    },
    step3() {
      localStorage.buyPrice = this.buyPrice; //.replace(/,/g, ""); //remove comma

      localStorage.buyDate = this.buyDate;
    },
    step4() {
      localStorage.buyTax.setItem(this.buyTax);

      localStorage.legalCost.setItem(this.legalCost);

      localStorage.brokerFeeBuy.setItem(this.brokerFeeBuy);

      localStorage.brokerFeeSell.setItem(this.brokerFeeSell);

      localStorage.bondLoss.setItem(this.bondLoss);

      localStorage.repairCost.setItem(this.repairCost);

      localStorage.joint = this.joint;
    },

    autoCal(type) {
      if (type === "tax") {
        this.buyTax = Math.floor(taxHelper.tax(this.buyPrice, this.buyDate));
      } else if (type === "brokerFeeBuy") {
        this.brokerFeeBuy = brokerFee.brokerFee(this.buyPrice);
      } else if (type === "brokerFeeSell") {
        this.brokerFeeSell = brokerFee.brokerFee(this.sellPrice);
      }
    }
  },

  computed: {
    //sellCnt(val) {
    //console.log(val);
    //}
  }
};
</script>