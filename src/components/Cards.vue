<template>
  <v-app>
    <v-app-bar app dark color="indigo darken-2">
      <v-toolbar-title>양도소득세 계산 시작하기</v-toolbar-title>
    </v-app-bar>

    <v-main class="indigo darken-4">
      <v-container align="center" justify="center">
        <v-row>
          <v-col>
            <v-card dark flat color="indigo darken-4" class="pa-2">
              <v-card-title>Q1. 주택 매각 갯수</v-card-title>
              <div class="bg-bx">
                <v-card-subtitle>
                  <v-icon small>mdi-check</v-icon>&nbsp;
                  <span class="fc-pk">동일 과세 년도</span>(1월1일~12월31일)에
                  <span class="fc-pk">2개 이상의 주택을 매각</span>한 경우 양도 차익은
                  <span class="fc-pk">합산해서 과세</span>됩니다. (매년 5월 확정신고 때 합산하여 신고 해야 함)
                  <br />※ 단,
                  <span class="fc-pk">마지막에 매각한 주택이 1세대1주택 요건 충족시</span> 마지막에 매각한 주택은
                  <span class="fc-pk">비과세</span> 되므로 합산과세 대상은 아닙니다.
                </v-card-subtitle>
              </div>
              <v-card-actions>
                <v-chip-group column v-model="sellCnt">
                  <v-chip label color="pink darken-4" @change="alert1 = true">네, 합산과세 대상입니다</v-chip>
                  <v-chip label color="pink darken-4" @change="alert1 = false">아니요</v-chip>
                </v-chip-group>
              </v-card-actions>

              <v-alert
                :value="alert1"
                type="info"
                color="red darken-4"
                transition="scale-transition"
                class="ma-1"
              >
                합산과세 대상이므로 계산이 불가 합니다.
                <br />단, 마지막에 매각한 물건이 비과세 요건을 충족한다면 비과세이므로 계산할 필요 없습니다.
              </v-alert>

              <v-divider></v-divider>

              <v-card-title>Q2. 양도한 물건의 종류</v-card-title>
              <div class="bg-bx">
                <v-card-subtitle>
                  <v-icon small>mdi-check</v-icon>&nbsp;비과세 특례 요건(1세대1주택 등)에 해당되지 않는 경우에 과세 대상이므로 신고 납부 해야합니다.
                  <br />
                  <v-icon small>mdi-check</v-icon>&nbsp;비과세 특례 요건(1세대1주택 등)을 충족해도 양도가액이
                  <span class="fc-pk">9억 초과</span>인 경우, 9억초과분에 한해 과세됩니다.
                </v-card-subtitle>
              </div>
              <v-card-actions>
                <v-chip-group column v-model="sellType">
                  <v-chip label color="pink darken-4" value="luxuryHouse">1세대1주택이지만 양도가액이 9억을 초과</v-chip>
                  <v-chip label color="pink darken-4" value="house">비과세 대상이 아닌 주택 매도</v-chip>
                </v-chip-group>
              </v-card-actions>

              <v-divider></v-divider>

              <v-card-title>Q3. 보유 주택 갯수</v-card-title>
              <div class="bg-bx">
                <v-card-subtitle>
                  <v-icon small>mdi-check</v-icon>&nbsp;일시적 2주택 특례 대상이 아닌 경우, 입주권을 포함한 보유 주택 갯수 입니다.
                  <br />(단, 분양관은 관계없음. 2021년부터 조정대상지역인 경우 분양권도 보유 주택 수에 산입 예정)
                  <br />
                  <v-icon small>mdi-check</v-icon>&nbsp;1세대1주택 9억초과인 경우 1주택을 선택해주세요.
                </v-card-subtitle>
              </div>
              <v-card-actions>
                <v-chip-group column v-model="houseCnt">
                  <v-chip label color="pink darken-4" value="1">1주택</v-chip>
                  <v-chip
                    label
                    color="pink darken-4"
                    value="2"
                    :disabled="sellType=='luxuryHouse'"
                  >2주택</v-chip>
                  <v-chip
                    label
                    color="pink darken-4"
                    value="3"
                    :disabled="sellType=='luxuryHouse'"
                  >3주택 이상</v-chip>
                </v-chip-group>
              </v-card-actions>

              <v-divider></v-divider>

              <v-card-title>Q4. 조정대상지역 여부</v-card-title>
              <div class="bg-bx">
                <v-card-subtitle>
                  <v-icon small>mdi-check</v-icon>&nbsp;조정대상지역인 경우
                  <br />- 다주택자 장기보유 특별 공제 적용 배제
                  <br />- 2020년 7월부터 다주택자 중과세 (2주택자 10%p, 3주택자 20%p 추가세율 적용)
                  <br />- 일시적 2주택 비과세 특례 요건 강화
                </v-card-subtitle>
              </div>
              <v-card-actions>
                <v-chip-group column v-model="area">
                  <v-chip label color="pink darken-4" value="1">네, 조정대상지역 입니다</v-chip>
                  <v-chip label color="pink darken-4" value="0">아니요</v-chip>
                </v-chip-group>
              </v-card-actions>

              <v-divider></v-divider>

              <v-card-title>Q5. 실제 거주 기간</v-card-title>
              <div class="bg-bx">
                <v-card-subtitle>
                  <v-icon small>mdi-check</v-icon>&nbsp;주민등록상 거주 기간이 2년 이상인 경우
                  <br />- 1세대1주택 9억 초과분에 대해 장기보유특별공제 적용 가능
                  <br />- 조정대상지역인 경우 2년 이상 거주시 1세대1주택 비과세 가능
                </v-card-subtitle>
              </div>
              <v-card-actions>
                <v-chip-group column v-model="livePeriod">
                  <v-chip label color="pink darken-4" value="1">2년 미만 거주</v-chip>
                  <v-chip label color="pink darken-4" value="0">2년 이상 거주</v-chip>
                </v-chip-group>
              </v-card-actions>

              <v-divider></v-divider>

              <v-card-title>Q6. 양도 정보</v-card-title>
              <v-card-subtitle>양도가액은 팔 때 계약금과 잔금의 합계액 입니다. (중도금 있을시 중도금도 포함)</v-card-subtitle>
              <v-card-text>
                <v-text-field
                  label="양도일 입력"
                  outlined
                  clearable
                  hint="입력 예: 2020-01-09"
                  v-mask="'####-##-##'"
                  v-model="sellDate"
                ></v-text-field>

                <v-text-field
                  label="양도가액 입력"
                  prefix="₩"
                  outlined
                  v-model="sellPrice"
                  clearable
                  type="number"
                  class="inputPrice"
                  pattern="\d*"
                  inputmode="numeric"
                  hint="숫자만 입력해주세요"
                ></v-text-field>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-title>Q7. 취득 정보</v-card-title>
              <v-card-subtitle>취득가액은 살 때 계약금과 잔금의 합계액 입니다. (중도금 있을시 중도금도 포함)</v-card-subtitle>
              <v-card-text>
                <v-text-field
                  label="취득일 입력"
                  clearable
                  hint="입력 예: 2020-01-09"
                  outlined
                  v-mask="'####-##-##'"
                  v-model="buyDate"
                ></v-text-field>

                <v-text-field
                  label="취득가액 입력"
                  prefix="₩"
                  outlined
                  v-model="buyPrice"
                  hint="숫자만 입력해주세요"
                  clearable
                  type="number"
                  pattern="\d*"
                  inputmode="numeric"
                  class="inputPrice"
                ></v-text-field>
                <!--currency-text-field label="취득가액 입력" v-model="buyPrice"/-->
              </v-card-text>

              <v-divider></v-divider>

              <v-card-title>Q8. 필요경비</v-card-title>
              <v-card-subtitle>
                (세금)계산서, 신용카드 매출전표, 현금영수증 등의 증빙서류가 없는 경우
                <span
                  class="fc-pk"
                >청구서나 은행계좌 송금내역 등이 확인되면 필요 경비로 인정</span>
              </v-card-subtitle>
              <v-card-text>
                <v-text-field
                  label="취득세"
                  hint="전용 85㎡ 이하인 경우 자동 계산 가능"
                  outlined
                  prefix="₩"
                  clearable
                  type="number"
                  pattern="\d*"
                  inputmode="numeric"
                  v-model="buyTax"
                  append-icon="mdi-calculator"
                  @click:append="autoCal('tax')"
                ></v-text-field>

                <v-text-field
                  label="법무사비"
                  hint="없거나 모를 경우 0원으로 계산됨"
                  outlined
                  prefix="₩"
                  clearable
                  type="number"
                  pattern="\d*"
                  inputmode="numeric"
                  v-model="legalCost"
                ></v-text-field>

                <v-text-field
                  label="취득시 중개수수료"
                  hint="취득가액 기준 자동 계산 (참고용)"
                  outlined
                  prefix="₩"
                  clearable
                  type="number"
                  pattern="\d*"
                  inputmode="numeric"
                  v-model="brokerFeeBuy"
                  append-icon="mdi-calculator"
                  @click:append="autoCal('brokerFeeBuy')"
                ></v-text-field>

                <v-text-field
                  label="양도시 중개수수료"
                  hint="양도가액 기준 자동 계산 (참고용)"
                  outlined
                  prefix="₩"
                  clearable
                  type="number"
                  pattern="\d*"
                  inputmode="numeric"
                  v-model="brokerFeeSell"
                  append-icon="mdi-calculator"
                  @click:append="autoCal('brokerFeeSell')"
                ></v-text-field>

                <v-text-field
                  label="*국민주택채권 매각차손"
                  hint="없거나 모를 경우 0원으로 계산됨"
                  outlined
                  prefix="₩"
                  clearable
                  type="number"
                  pattern="\d*"
                  inputmode="numeric"
                  v-model="bondLoss"
                ></v-text-field>
                <v-chip small label color="indigo lighten-1">**국민주택채권 매각차손 이란?</v-chip>
                <br />
                <span class="fc-pk">[국민주택(1종)채권매출 매입 확인서] 영수증에서 본인부담액 항목</span>
                <br />
                <br />
                <v-text-field
                  label="*수리비"
                  hint="없거나 모를 경우 0원으로 계산됨"
                  outlined
                  prefix="₩"
                  clearable
                  type="number"
                  pattern="\d*"
                  inputmode="numeric"
                  v-model="repairCost"
                ></v-text-field>
                <v-chip small label color="indigo lighten-1">**수리비 란?</v-chip>
                <br />
                <span class="fc-pk">부동산의 수명을 연장시키거나 가치를 상승시키기 위해 지출한 수선비만 가능</span>
                <br />예1) 발코니 샷시 설치 및 교체비, 방/베란다 확장 공사비, 바닥 시공비, 보일러 교체비 등은
                <span class="fc-pk">가능</span>
                <br />예2) 장기수선충당금, 벽지, 장판, 싱크대, 문, 조명, 하수도관 교체비, 외벽 도색비, 보일러 수리비, 옥상 방수 공사비, 타일 및 변기 공사비 등은
                <span
                  class="fc-pk"
                >불가능</span>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-title>Q9. 공동명의 여부</v-card-title>
              <div class="bg-bx">
                <v-card-subtitle>
                  기본공제 1인당 연간
                  <span class="fc-pk">250만원 한도</span>
                  <br />(※단, 1년에 2채 매각시 1회만 가능)
                  <br />예) 부부 공동명의인 경우 1년에 500만원 한도
                </v-card-subtitle>
              </div>
              <v-card-text>
                <v-chip-group column v-model="joint">
                  <v-chip label color="pink darken-4" value="1">1인 단독명의</v-chip>
                  <v-chip label color="pink darken-4" value="2">2인 공동명의</v-chip>
                </v-chip-group>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>

              <v-card-actions class="mt-3 pb-7">
                <v-btn
                  block
                  dark
                  color="indigo accent-4"
                  to="/result"
                  @click.native="save();"
                >계산결과 확인하기</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import createNumberMask from "text-mask-addons/dist/createNumberMask";

import buyTax from "../utils/buyTax";
import brokerFee from "../utils/brokerFee";

const currencyMask = createNumberMask({
  prefix: "",
  //allowDecimal: false,
  //includeThousandsSeparator: true,
  //allowNegative: false
});

export default {
  data: () => ({
    mask: currencyMask,

    alert1: false,
    alert2: false,

    sellType: "",
    sellCnt: "",
    houseCnt: "",
    area: "",
    livePeriod: "",

    sellPrice: "",
    sellDate: "",

    buyPrice: "",
    buyDate: "",

    buyTax: "",
    legalCost: "",
    brokerFeeBuy: "",
    brokerFeeSell: "",
    bondLoss: "",
    repairCost: "",
    joint: "",
  }),

  methods: {
    save() {
      localStorage.sellType = this.sellType;

      localStorage.sellCnt = this.sellCnt;

      localStorage.houseCnt = this.houseCnt;

      localStorage.area = this.area;

      localStorage.livePeriod = this.livePeriod;

      localStorage.sellPrice = this.sellPrice;

      localStorage.sellDate = this.sellDate;

      localStorage.buyPrice = this.buyPrice;

      localStorage.buyDate = this.buyDate;

      localStorage.buyTax = this.buyTax;

      localStorage.legalCost = this.legalCost;

      localStorage.brokerFeeBuy = this.brokerFeeBuy;

      localStorage.brokerFeeSell = this.brokerFeeSell;

      localStorage.bondLoss = this.bondLoss;

      localStorage.repairCost = this.repairCost;

      localStorage.joint = this.joint;
    },

    autoCal(type) {
      if (type === "tax") {
        this.buyTax = Math.floor(buyTax.getBuyTax(this.buyPrice, this.buyDate));
      } else if (type === "brokerFeeBuy") {
        this.brokerFeeBuy = brokerFee.getBrokerFee(this.buyPrice);
      } else if (type === "brokerFeeSell") {
        this.brokerFeeSell = brokerFee.getBrokerFee(this.sellPrice);
      }
    },
  },

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
    if (localStorage.area) {
      this.area = localStorage.area;
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
      this.buyTax = localStorage.buyTax;
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

  computed: {},
};
</script>