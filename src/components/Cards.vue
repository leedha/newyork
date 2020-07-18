<template>
  <v-app>
    <v-app-bar app dark color="blue darken-4">
      <v-toolbar-title>양도소득세 계산 시작하기</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid grid-list-md>
        <v-row>
          <v-col>
            <v-card dark color="indigo" class="ma-2 pa-2">
              <v-card-title>Q1. 주택 매각 갯수</v-card-title>
              <v-card-subtitle>
                <v-icon small>mdi-check</v-icon>동일 과세 년도(1월1일~12월31일)에 매각한 물건이 2개 이상인 경우 양도 차익을 합산해서 과세 합니다. (매년 5월 확정신고 때 합산하여 신고 해야 함)
                <br />※ 단, 마지막에 매각한 주택이 1세대1주택 요건 충족시 마지막에 매각한 주택은 비과세 되므로 합산과세 대상은 아닙니다.
              </v-card-subtitle>
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
              >
                합산과세 대상이므로 계산이 불가 합니다.
                <br />단, 마지막에 매각한 물건이 비과세 요건을 충족한다면 비과세이므로 계산할 필요 없습니다.
              </v-alert>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card dark color="indigo" class="ma-2 pa-2">
              <v-card-title>Q2. 양도한 물건의 종류</v-card-title>
              <v-card-subtitle>
                <v-icon small>mdi-check</v-icon>1세대1주택 요건 충족했지만
                양도가액이 9억 초과인 경우
                9억초과분에 한해 과세됩니다.
              </v-card-subtitle>
              <v-card-actions>
                <v-chip-group column v-model="sellType">
                  <v-chip label color="pink darken-4" value="house">비과세 대상 아닌 주택</v-chip>
                  <v-chip label color="pink darken-4" value="luxuryHouse">1세대1주택 9억 초과</v-chip>
                </v-chip-group>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card dark color="indigo" class="ma-2 pa-2">
              <v-card-title>Q3. 보유 주택 갯수</v-card-title>
              <v-card-subtitle>
                <v-icon small>mdi-check</v-icon>일시적 2주택 특례 대상이 아닌 경우, 입주권을 포함한 보유 주택 갯수 입니다.
                <br />(단, 분양관은 관계없음. 2021년부터 조정대상지역인 경우 분양권도 보유 주택 수에 산입 예정)
                <br />
                <v-icon small>mdi-check</v-icon>1세대1주택 9억초과인 경우 1주택을 선택해주세요.
              </v-card-subtitle>
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
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card dark color="indigo" class="ma-2 pa-2">
              <v-card-title>Q4. 조정대상지역 여부</v-card-title>
              <v-card-subtitle>
                <v-icon small>mdi-check</v-icon>조정대상지역의 다주택자는 2020년 7월부터 중과세 및 장기보유 특별 공제 적용 배제
              </v-card-subtitle>
              <v-card-actions>
                <v-chip-group column v-model="controlAreaVal">
                  <v-chip label color="pink darken-4" value="1">네, 조정대상지역 입니다</v-chip>
                  <v-chip label color="pink darken-4" value="0">아니요</v-chip>
                </v-chip-group>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card dark color="indigo" class="ma-2 pa-2">
              <v-card-title>Q5. 실제 거주 기간</v-card-title>
              <v-card-subtitle>
                <v-icon small>mdi-check</v-icon>주민등록상 거주 기간이 2년 이상인 경우
                <br />- 1세대1주택 9억 초과분에 대해 장기보유특별공제 적용 가능
                <br />- 조정대상지역인 경우 2년 이상 거주시 1세대1주택 비과세 가능
              </v-card-subtitle>
              <v-card-actions>
                <v-chip-group column v-model="livePeriod">
                  <v-chip label color="pink darken-4" value="1">2년 미만 거주</v-chip>
                  <v-chip label color="pink darken-4" value="0">2년 이상 거주</v-chip>
                </v-chip-group>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card dark color="indigo" class="ma-2 pa-2">
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
                  hint="숫자만 입력해주세요"
                ></v-text-field>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card dark color="indigo" class="ma-2 pa-2">
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
                  class="inputPrice"
                ></v-text-field>
                <!--currency-text-field label="취득가액 입력" v-model="buyPrice"/-->
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card dark color="indigo" class="ma-2 pa-2">
              <v-card-title>Q8. 필요경비</v-card-title>
              <v-card-subtitle>
                (세금)계산서, 신용카드 매출전표, 현금영수증 등의 증빙서류가 없는 경우
                <br />청구서나 은행계좌 송금내역 등이 확인되면 필요 경비로 인정
              </v-card-subtitle>
              <v-card-text>
                <v-text-field
                  label="취득세"
                  hint="전용 85㎡ 이하인 경우 자동 계산 가능"
                  outlined
                  prefix="₩"
                  clearable
                  pattern="\d*"
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
                  pattern="\d*"
                  v-model="legalCost"
                ></v-text-field>

                <v-text-field
                  label="취득시 중개수수료"
                  hint="취득가액 기준 자동 계산 (참고용)"
                  outlined
                  prefix="₩"
                  clearable
                  pattern="\d*"
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
                  pattern="\d*"
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
                  pattern="\d*"
                  v-model="bondLoss"
                ></v-text-field>
                <v-chip small label color="indigo darken-4">**국민주택채권 매각차손 이란?</v-chip>
                <br />[국민주택(1종)채권매출 매입 확인서] 영수증에서 본인부담액 항목
                <br />
                <br />
                <v-text-field
                  label="*수리비"
                  hint="없거나 모를 경우 0원으로 계산됨"
                  outlined
                  prefix="₩"
                  clearable
                  pattern="\d*"
                  v-model="repairCost"
                ></v-text-field>
                <v-chip small label color="indigo darken-4">**수리비 란?</v-chip>
                <br />부동산의 수명을 연장시키거나 가치를 상승시키기 위해 지출한 수선비만 가능
                <br />예1) 발코니 샷시 설치 및 교체비, 방/베란다 확장 공사비, 바닥 시공비, 보일러 교체비 등은
                <b>가능</b>
                <br />예2) 장기수선충당금, 벽지, 장판, 싱크대, 문, 조명, 하수도관 교체비, 외벽 도색비, 보일러 수리비, 옥상 방수 공사비, 타일 및 변기 공사비 등은
                <b>불가능</b>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card dark color="indigo" class="ma-2 pa-2">
              <v-card-title>Q9. 공동명의 여부</v-card-title>

              <v-card-subtitle>
                기본공제 1인당 연간 250만원 한도
                <br />(※단, 1년에 2채 매각시 1회만 가능)
                <br />예) 부부공동명의인 경우 1년에 500만원 한도
              </v-card-subtitle>
              <v-card-text>
                <v-chip-group column v-model="joint">
                  <v-chip label color="pink darken-4" value="1">1인 단독명의</v-chip>
                  <v-chip label color="pink darken-4" value="2">2인 공동명의</v-chip>
                </v-chip-group>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn block color="primary" to="/result" @click.native="save();">계산결과 확인하기</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import createNumberMask from "text-mask-addons/dist/createNumberMask";

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

  methods: {
    save() {
      localStorage.sellType = this.sellType;

      localStorage.sellCnt = this.sellCnt;

      localStorage.houseCnt = this.houseCnt;

      localStorage.livePeriod = this.livePeriod;

      localStorage.sellPrice = this.sellPrice; //.replace(/,/g, ""); //remove comma

      localStorage.sellDate = this.sellDate;

      localStorage.buyPrice = this.buyPrice; //.replace(/,/g, ""); //remove comma

      localStorage.buyDate = this.buyDate;

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

  computed: {}
};
</script>