<template>
  <v-app>
    <v-app-bar app dark color="blue darken-4">
      <v-toolbar-title>양도소득세 계산 시작하기</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid grid-list-md>
        <v-row>
          <v-col>
            <v-card dark color="light blue darken-3" class="ma-2 pa-2">
              <v-card-title>Q1. 주택 매각 갯수</v-card-title>
              <v-card-subtitle>
                동일 과세 년도(1월1일~12월31일)에 매각한 물건이 2개 이상인 경우 양도 차익을 합산해서 과세 합니다. (매년 5월 확정신고 때 합산하여 신고 해야 함)
                <br />※ 단, 마지막에 매각한 주택이 1세대1주택 요건 충족시 마지막에 매각한 주택은 비과세 되므로 합산과세 대상은 아닙니다.
              </v-card-subtitle>
              <v-card-actions>
                <v-chip-group column v-model="controlAreaVal">
                  <v-chip label value="1">네, 합산과세 대상입니다</v-chip>
                  <v-chip label value="0">아니요</v-chip>
                </v-chip-group>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card dark color="light blue darken-3" class="ma-2 pa-2">
              <v-card-title>Q2. 양도한 물건의 종류</v-card-title>
              <v-card-subtitle>
                1세대1주택 요건 충족했지만
                양도가액이 9억 초과인 경우
                9억초과분에 한해 과세됩니다.
              </v-card-subtitle>
              <v-card-actions>
                <v-chip-group column v-model="sellType">
                  <v-chip label value="house">비과세 대상 아닌 주택</v-chip>
                  <v-chip label value="luxuryHouse">1세대1주택 9억 초과</v-chip>
                </v-chip-group>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card dark color="light blue darken-3" class="ma-2 pa-2">
              <v-card-title>Q3. 보유 주택 갯수</v-card-title>
              <v-card-subtitle>
                일시적 2주택 특례 대상이 아닌 경우, 입주권을 포함한 보유 주택 갯수
                <br />(단, 분양관은 관계없음 2021년부터 조정대상지역인 경우 분양권도 보유 주택 수에 산입시킴)
              </v-card-subtitle>
              <v-card-actions>
                <v-chip-group column v-model="houseCnt">
                  <v-chip label value="1">1주택</v-chip>
                  <v-chip label value="2">2주택</v-chip>
                  <v-chip label value="3">3주택 이상</v-chip>
                </v-chip-group>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card dark color="light blue darken-3" class="ma-2 pa-2">
              <v-card-title>Q4. 조정대상지역 여부</v-card-title>
              <v-card-subtitle>조정대상지역의 다주택자는 2020년 7월부터 중과세 및 장기보유 특별 공제 적용 배제</v-card-subtitle>
              <v-card-actions>
                <v-chip-group column v-model="controlAreaVal">
                  <v-chip label value="1">네, 조정대상지역 입니다</v-chip>
                  <v-chip label value="0">아니요</v-chip>
                </v-chip-group>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>