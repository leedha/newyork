<template>
  <v-content>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 xl2>
          <v-toolbar color="blue accent-4 mb-2" dark dense mb-2>
            <v-toolbar-title>양도소득세 계산 시작하기</v-toolbar-title>
          </v-toolbar>

          <v-spacer></v-spacer>

          <v-stepper v-model="e6" vertical class="elevation-0">
            <v-stepper-step :complete="e6 > 1" step="1" editable>Q1. 사전정보 확인</v-stepper-step>
            <v-stepper-content step="1">
              <v-card>
                <v-card-title>양도한 물건의 종류</v-card-title>
                <v-card-subtitle>양도한 물건의 종류에 따라서 세율이 달라집니다.</v-card-subtitle>
                <v-card-text>
                  <v-radio-group dense hide-details>
                    <v-radio label="주택 입니다."></v-radio>
                    <v-radio label="분양권 입니다."></v-radio>
                    <v-radio label="입주권 입니다."></v-radio>
                  </v-radio-group>
                </v-card-text>

                <v-card-title>동일년도 주택 매각 횟수</v-card-title>
                <v-card-subtitle>
                  <v-icon small color="blue darken-2">mdi-check</v-icon>동일년도(1월1일~12월31일까지)에 2채 이상 매각시 합산과세 대상 (그 다음해 5월 확정신고)
                  <br>
                  <v-icon small color="blue darken-2">mdi-check</v-icon>2번째 매각한 주택이 1세대1주택 요건 충족시 2번째 주택은 비과세이므로 합산과세 대상 아님
                </v-card-subtitle>
                <v-card-text>
                  <v-radio-group dense hide-details>
                    <v-radio label="1회 매각"></v-radio>
                    <v-radio label="2회 이상 매각 : 계산 불가"></v-radio>
                  </v-radio-group>
                </v-card-text>

                <v-card-title>1세대1주택 or 다주택자</v-card-title>
                <v-card-subtitle>
                  <v-icon small color="blue darken-2">mdi-check</v-icon>양도한 물건이 1세대1주택 요건 충족시 비과세 : 계산 필요 없음
                  <br>
                  <v-icon small color="blue darken-2">mdi-check</v-icon>1세대1주택 요건 충족했지만 양도가액이 9억 초과인 경우 : 9억초과분에 한해 과세
                  <br>
                  <v-icon small color="blue darken-2">mdi-check</v-icon>다주택자 : 이익금에 따라서 계산 (조정대상지역인 경우 2020년 7월부터 중과세)
                </v-card-subtitle>
                <v-card-text>
                  <v-radio-group dense hide-details>
                    <v-radio label="1세대1주택 9억 이하 : 비과세이므로 계산 필요 없음"></v-radio>
                    <v-radio label="1세대1주택 9억 초과"></v-radio>
                    <v-radio label="2주택 이상 다주택자"></v-radio>
                    <v-radio label="3주택 이상 다주택자"></v-radio>
                  </v-radio-group>
                </v-card-text>

                <v-card-title>실거주 기간</v-card-title>
                <v-card-subtitle>2년이상 보유하고 주민등록주소지를 2년 이상 유지한 경우 실거주로 인정됩니다.</v-card-subtitle>
                <v-card-text>
                  <v-radio-group dense hide-details>
                    <v-radio label="2년 이상 거주"></v-radio>
                    <v-radio label="2년 미만 거주"></v-radio>
                  </v-radio-group>
                </v-card-text>

                <v-card-title>조정대상지역 여부</v-card-title>
                <v-card-subtitle></v-card-subtitle>
                <v-card-text>
                  <v-text-field label="읍/면/동 입력" hide-details outlined></v-text-field>해당 동은 조정대상지역 입니다.
                </v-card-text>

                <v-card-actions>
                  <v-btn color="primary" @click="e6 = 2">다음</v-btn>
                  <v-btn to="/ahead">취소</v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 2" step="2" editable>Q2. 양도 정보 입력</v-stepper-step>
            <v-stepper-content step="2">
              <v-card>
                <v-card-title>양도일자</v-card-title>
                <v-card-subtitle>우리집 팔 때 잔금 받은 날 입니다.
                  <br>※ 계약일 아님 주의
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
                  ></v-text-field>
                </v-card-text>

                <v-card-title>양도가액</v-card-title>
                <v-card-subtitle>팔 때 : 계약금 (+ 중도금) + 잔금</v-card-subtitle>
                <v-card-text>
                  <v-text-field
                    label="양도가액 입력"
                    prefix="₩"
                    outlined
                    v-mask="mask"
                    v-model="sellPrice"
                  ></v-text-field>
                </v-card-text>

                <v-card-actions>
                  <v-btn color="primary" @click="e6 = 3">다음</v-btn>
                  <v-btn @click="e6 = 1">취소</v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 3" step="3" editable>Q3. 취득 정보 입력</v-stepper-step>
            <v-stepper-content step="3">
              <v-card>
                <v-card-title>취득시기</v-card-title>
                <v-card-subtitle>우리집 살 때 잔금 준 날 입니다.
                  <br>※ 계약일 아님 주의 ※
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
                  ></v-text-field>
                </v-card-text>

                <v-card-title>취득가액</v-card-title>
                <v-card-subtitle>살 때 : 계약금 (+ 중도금) + 잔금</v-card-subtitle>
                <v-card-text>
                  <v-text-field
                    label="취득가액 입력"
                    prefix="₩"
                    outlined
                    v-mask="mask"
                    v-model="buyPrice"
                  ></v-text-field>
                </v-card-text>

                <v-card-actions>
                  <v-btn color="primary" @click="e6 = 4">다음</v-btn>
                  <v-btn @click="e6 = 2">취소</v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>

            <v-stepper-step step="4" editable>Q4. 필요 경비</v-stepper-step>
            <v-stepper-content step="4">
              <v-card>
                <v-card-title>필요 경비 공제</v-card-title>
                <v-card-subtitle>
                  (세금)계산서, 신용카드 매출전표, 현금영수증 등의 증빙서류가 없는 경우,
                  청구서나 은행계좌 송금내역 등이 확인되면 필요 경비로 인정
                </v-card-subtitle>
                <v-card-text>
                  <v-text-field
                    label="취득세"
                    hint="취득가액 입력시 자동 계산"
                    persistent-hint
                    outlined
                    prefix="₩"
                    clearable
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
                  ></v-text-field>
                </v-card-text>
                <v-card-text>
                  <v-text-field
                    label="취득시 중개수수료"
                    hint="취득가액 입력시 자동 계산"
                    persistent-hint
                    outlined
                    prefix="₩"
                    clearable
                  ></v-text-field>
                </v-card-text>
                <v-card-text>
                  <v-text-field
                    label="양도시 중개수수료"
                    hint="양도가액 입력시 자동 계산"
                    persistent-hint
                    outlined
                    prefix="₩"
                    clearable
                  ></v-text-field>
                </v-card-text>
                <v-card-text>
                  <v-text-field
                    label="국민주택채권 매각차손"
                    hint="없거나 모를 경우 0원으로 계산됨"
                    persistent-hint
                    outlined
                    prefix="₩"
                    clearable
                  ></v-text-field>※ [국민주택(1종)채권매출 매입 확인서] 영수증에서 본인부담액 항목
                </v-card-text>
                <v-card-text>
                  <v-text-field
                    label="수리비"
                    hint="없거나 모를 경우 0원으로 계산됨"
                    persistent-hint
                    outlined
                    prefix="₩"
                    clearable
                  ></v-text-field>※ 부동산의 수명을 연장시키거나 가치를 상승시키기 위해 지출한 수선비만 가능
                  <br>예1) 발코니 샷시 설치 및 교체비, 방/베란다 확장 공사비, 바닥 시공비, 보일러 교체비 등은 가능
                  <br>예2) 장기수선충당금, 벽지, 장판, 싱크대, 문, 조명, 하수도관 교체비, 외벽 도색비, 보일러 수리비, 옥상 방수 공사비, 타일 및 변기 공사비 등은 불가능
                </v-card-text>

                <v-card-title>공동명의 여부</v-card-title>
                <v-card-subtitle>기본공제 1인당 연간 250만원 한도
                  <br>단, 1년에 2채 매각시 1회만 가능
                  <br>예) 부부공동명의 : 250만×2=500만원
                </v-card-subtitle>
                <v-card-text>
                  <v-radio-group>
                    <v-radio label="공동명의 입니다"></v-radio>
                    <v-radio label="1인 단독명의 입니다."></v-radio>
                  </v-radio-group>
                </v-card-text>

                <v-card-actions>
                  <v-btn color="primary" to="/result">완료</v-btn>
                  <v-btn @click="e6 = 3">취소</v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
          </v-stepper>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import createNumberMask from "text-mask-addons/dist/createNumberMask";

const currencyMask = createNumberMask({
  prefix: "",
  allowDecimal: true,
  includeThousandsSeparator: true,
  allowNegative: false
});

export default {
  data: () => ({
    e6: 1,
    sellDate: "",
    buyDate: "",
    mask: currencyMask,
    sellPrice: "",
    buyPrice: ""
    /*houseType: "",
    sellOneHouse: "",
    aHouseForFamily: "",
    live2yrs: "",
    controlArea: "",
    sellPrice: "",
    buyPrice: "",
    sellDate: "",
    buyDate: "",
    saleTax: "",
    legalCost: "",
    brokerFeeBuy: "",
    brokerFeeSell: "",
    bondLoss: "",
    repairCost: "",
    jointName: ""*/
  })
  /*data() {
    return {
      e6: 1
    };
  }*/
  /*watch: {
    sellPrice: (sellPrice, oldSellPrice) => {
      console.log(`sellPrice: ${sellPrice}`);
      localStorage.sellPrice = sellPrice;
    }
  }*/
};
</script>