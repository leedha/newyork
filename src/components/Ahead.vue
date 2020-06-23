<template>
  <v-content>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 xl2>
          <v-toolbar color="blue accent-4 mb-2" dark dense>
            <v-toolbar-title>우리집, 비과세인지 확인해보기</v-toolbar-title>
          </v-toolbar>

          <v-spacer></v-spacer>

          <v-card flat>
            <v-card-title primary-title>*1세대1주택이고 2년 이상 보유해야 합니다.</v-card-title>

            <v-card-actions>
              <v-chip
                class="ml-2"
                color="green"
                text-color="white"
                @click="show1 = !show1"
              >**1세대1주택 이란?</v-chip>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show1">
                <v-card-text>
                  <v-icon small color="green darken-1">mdi-check</v-icon>주민등록상 동일 주소지의 구성원 중에 별도의 집(또는 조합원 입주권)을 소유한 사람이
                  <b>없어야</b> 1세대1주택으로 인정. (※분양권은 해당사항 없음)
                  <br>
                  <v-icon small color="green darken-1">mdi-check</v-icon>
                  <b>부부</b>는 별도 세대로 주민등록이 되어있어도
                  <br>1세대로 간주하기 때문에,
                  별거 중이라 할지라도
                  <br>부부가 각각 주택을 소유하고 있다면
                  <br>
                  <b>1세대2주택</b>으로 인정
                  <br>※ 동일년도에
                  <b>2개</b> 이상의 주택을 매각할 시
                  <b>합산과세</b> 대상이나, 2번째 주택이 비과세 요건 충족시 비과세
                </v-card-text>
              </div>
            </v-expand-transition>

            <v-divider></v-divider>

            <v-card-title>2주택이라도
              <br>*대체취득을 위한 일시적 2주택,
              <br>*동거봉양, 혼인으로 인한 2주택
              <br>이라면 비과세를 받을 수 있습니다.
            </v-card-title>

            <v-card-actions>
              <v-chip
                class="ml-2"
                color="green"
                text-color="white"
                @click="show2 = !show2"
              >**대체 취득으로 인한 일시적 2주택 이란?</v-chip>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show2">
                <v-card-text>
                  주택 1채를 소유한 1세대가 새로운 주택으로 2주택이 된 경우,
                  <br>
                  <v-icon small color="green darken-1">mdi-check</v-icon>기존 주택 취득한 날로부터
                  <b>1년</b> 이상 경과된 후에 신규 주택 취득하고,
                  <br>
                  <v-icon small color="green darken-1">mdi-check</v-icon>신규 주택 취득한지
                  <b>3년</b> 이내 기존 주택 처분하는 경우
                  <br>※ [조정대상지역]이며, 2018년 9월13일 이후에 취득한 경우
                  <b>2년</b> 이내 기존주택 처분
                  <br>※ [조정대상지역]일지라도, 2018년 9월13일 이전에 매매 또는 입주권, 분양권 계약한 경우
                  <b>3년</b> 이내 기존 주택 처분
                </v-card-text>
              </div>
            </v-expand-transition>

            <v-card-actions>
              <v-chip
                class="ml-2"
                color="green"
                text-color="white"
                @click="show3 = !show3"
              >**동거 봉양ㆍ혼인으로 인한 2주택 이란?</v-chip>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show3">
                <v-card-text>
                  <v-icon small color="green darken-1">mdi-check</v-icon>부모를 모시거나 혼인 때문에 2주택이 된 경우,
                  <br>결혼한 날(또는 부모를 모시게 된 날)로부터
                  <b>5년</b> 이내에 먼저 양도한 주택은 비과세 적용
                </v-card-text>
              </div>
            </v-expand-transition>

            <v-divider></v-divider>

            <v-card-title>
              양도가액이
              9억 이하 여야 합니다.
            </v-card-title>
            <v-card-subtitle>9억 초과시 초과분에 대해서는 과세됩니다.</v-card-subtitle>

            <v-divider></v-divider>

            <v-card-title>*조정대상지역 이라면
              <br>2년 이상 실거주 해야 합니다.
            </v-card-title>

            <v-card-actions>
              <v-chip
                class="ml-2"
                color="green"
                text-color="white"
                @click="show4 = !show4"
              >**조정대상지역 이란?</v-chip>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show4">
                <v-card-text>
                  <v-icon small color="green darken-1">mdi-check</v-icon>조정대상지역에 있는 주택은 공고일 이후 (해제된 지역일 경우 해제일 이전) 취득한 경우에
                  <br>2년 이상 보유 및 2년 이상 거주시 비과세 적용
                  <br>
                  <v-icon small color="green darken-1">mdi-check</v-icon>조정대상지역이 아니거나 해제 공고일 이후 취득시 2년 이상 보유만 해도 비과세 적용
                </v-card-text>
              </div>
            </v-expand-transition>

            <v-card-actions>
              <v-chip
                class="ml-2"
                color="green"
                text-color="white"
                @click="show5 = !show5"
              >지역별로 **조정대상지역 간단히 보기</v-chip>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show5">
                <v-simple-table dense class="elevation-1 mb-5">
                  <thead>
                    <tr>
                      <th colspan="3" class="text-center bg-gr-l4">서울</th>
                    </tr>
                    <tr class="bg-gr-l5">
                      <th>지역</th>
                      <th>지정공고일</th>
                      <th>해제공고일</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>전체</th>
                      <th>2017.9.6</th>
                      <th class="text-center">-</th>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th colspan="3" class="text-center bg-gr-l4">부산</th>
                    </tr>
                    <tr class="bg-gr-l5">
                      <th>지역</th>
                      <th>지정공고일</th>
                      <th>해제공고일</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>해운대구</th>
                      <th>2017.09.06</th>
                      <th>2019.11.8</th>
                    </tr>
                    <tr>
                      <th>연제구</th>
                      <th>2017.09.06</th>
                      <th>2018.12.31</th>
                    </tr>
                    <tr>
                      <th>동래구</th>
                      <th>2017.09.06</th>
                      <th>2019.11.8</th>
                    </tr>
                    <tr>
                      <th>남구</th>
                      <th>2017.09.06</th>
                      <th>2018.12.31</th>
                    </tr>
                    <tr>
                      <th>부산 진구</th>
                      <th>2017.09.06</th>
                      <th>2018.12.31</th>
                    </tr>
                    <tr>
                      <th>수영구</th>
                      <th>2017.09.06</th>
                      <th>2019.11.8</th>
                    </tr>
                    <tr>
                      <th>기장군 기장읍 장안읍 정관읍 철마면</th>
                      <th>2017.09.06</th>
                      <th>2018.8.28</th>
                    </tr>
                    <tr>
                      <th>기장군 일광면</th>
                      <th>2017.09.06</th>
                      <th>2018.12.31</th>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th colspan="3" class="text-center bg-gr-l4">경기 (제외지역은 자세히보기 참조)</th>
                    </tr>
                    <tr class="bg-gr-l5">
                      <th>지역</th>
                      <th>지정공고일</th>
                      <th>해제공고일</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>과천시</th>
                      <th>2017.09.06</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>광명시</th>
                      <th>2017.09.06</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>성남시</th>
                      <th>2017.09.06</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>고양시</th>
                      <th>2017.09.06</th>
                      <th>2019.11.8</th>
                    </tr>
                    <tr>
                      <th>고양시</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>남양주시</th>
                      <th>2017.09.06</th>
                      <th>2019.11.08</th>
                    </tr>
                    <tr>
                      <th>남양주시 (제외지역 있음)</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>하남시</th>
                      <th>2017.09.06</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>화성시</th>
                      <th>2017.09.06</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>구리시</th>
                      <th>2018.08.28</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>안양시 동래구</th>
                      <th>2018.08.28</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>광교</th>
                      <th>2018.08.28</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>수원시 팔달구</th>
                      <th>2018.12.31</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>용인시 수지구</th>
                      <th>2018.12.31</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>용인시 기흥구</th>
                      <th>2018.12.31</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>용인시 처인구</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>수원시 영통구</th>
                      <th>2020.02.21</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>수원시 권선구</th>
                      <th>2020.02.21</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>수원시 장안구</th>
                      <th>2020.02.21</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>안양시 만안구</th>
                      <th>2020.02.21</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>의왕시</th>
                      <th>2020.02.21</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>군포시</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>안성시 (제외지역 있음)</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>부천시</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>안산시</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>시흥시</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>오산시</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>평택시</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>광주시 (제외지역 있음)</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>양주시</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>의정부시</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th colspan="3" class="text-center bg-gr-l4">인천</th>
                    </tr>
                    <tr class="bg-gr-l5">
                      <th>지역</th>
                      <th>지정공고일</th>
                      <th>해제공고일</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>연수구</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>남동구</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>서구</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>중구</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>동구</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>미추홀구</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>부평구</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>계양구</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th colspan="3" class="text-center bg-gr-l4">대전</th>
                    </tr>
                    <tr class="bg-gr-l5">
                      <th>지역</th>
                      <th>지정공고일</th>
                      <th>해제공고일</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>동구</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>중구</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>서구</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>유성구</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>대덕구</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th colspan="3" class="text-center bg-gr-l4">세종</th>
                    </tr>
                    <tr class="bg-gr-l5">
                      <th>지역</th>
                      <th>지정공고일</th>
                      <th>해제공고일</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>연기군 금남면</th>
                      <th>2017.09.06</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>연기군 남면</th>
                      <th>2017.09.06</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>연기군 동면</th>
                      <th>2017.09.06</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>공주시 장기면</th>
                      <th>2017.09.06</th>
                      <th class="text-center">-</th>
                    </tr>
                    <tr>
                      <th>공주시 반포면</th>
                      <th>2017.09.06</th>
                      <th class="text-center">-</th>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th colspan="3" class="text-center bg-gr-l4">충북 (제외지역은 자세히보기 참조)</th>
                    </tr>
                    <tr class="bg-gr-l5">
                      <th>지역</th>
                      <th>지정공고일</th>
                      <th>해제공고일</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>청주시 (제외지역 있음)</th>
                      <th>2020.06.19</th>
                      <th class="text-center">-</th>
                    </tr>
                  </tbody>
                </v-simple-table>
              </div>
            </v-expand-transition>

            <v-card-actions>
              <v-chip
                class="ml-2"
                color="green"
                text-color="white"
                @click="show6 = !show6"
              >공고일 순으로 **조정대상지역 자세히 보기</v-chip>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show6">
                <v-timeline dense>
                  <v-timeline-item color="red darken-1" small>
                    <v-card class="elevation-2">
                      <v-card-text>[조정대상지역] 지정
                        <br>공고일 : 2017.09.06
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-icon small color="blue darken-2">mdi-check</v-icon>서울 - 25개구 전역
                        <br>
                        <v-icon small color="blue darken-2">mdi-check</v-icon>경기 - 과천시, 광명시, 성남시, 고양시, 남양주시, 하남시, 화성시 택지개발지구
                        <span
                          class="caption"
                        >(반송동·석우동, 동탄면 금곡리ㆍ목리ㆍ방교리ㆍ산척리ㆍ송리ㆍ신리ㆍ영천리ㆍ오산리ㆍ장지리ㆍ중리ㆍ청계리 일원에 지정된 택지개발지구에 한함)</span>
                        <br>
                        <v-icon small color="blue darken-2">mdi-check</v-icon>부산 - 해운대구ㆍ연제구ㆍ동래구ㆍ남구ㆍ부산진구, 수영구, 기장군
                        <br>
                        <v-icon small color="blue darken-2">mdi-check</v-icon>세종 - 행정중심복합도시 예정 지역
                      </v-card-text>
                    </v-card>
                  </v-timeline-item>

                  <v-timeline-item color="green darken-1" small>
                    <v-card class="elevation-2">
                      <v-card-text>조정대상지역 해제
                        <br>공고일 : 2018.08.28
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-icon small color="blue darken-2">mdi-check</v-icon>부산 - 기장군
                        <span class="caption">(일광면 제외)</span>
                      </v-card-text>
                    </v-card>
                  </v-timeline-item>

                  <v-timeline-item color="red darken-1" small>
                    <v-card class="elevation-2">
                      <v-card-text>조정대상지역 지정
                        <br>공고일 : 2018.08.28
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-icon small color="blue darken-2">mdi-check</v-icon>경기도 - 구리시, 안양시 동안구, 광교 택지개발지구
                        <span
                          class="caption"
                        >(수원시 영통구 이의동·원천동·하동·매탄동, 팔달구 우만동, 장안구 연무동, 용인시 수지구 상현동, 기흥구 영덕동 일원)</span>
                      </v-card-text>
                    </v-card>
                  </v-timeline-item>

                  <v-timeline-item color="red darken-1" small>
                    <v-card class="elevation-2">
                      <v-card-text>조정대상지역 지정
                        <br>공고일 : 2018.12.31
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-icon small color="blue darken-2">mdi-check</v-icon>경기도 - 수원시 팔달구, 용인시 수지구ㆍ기흥구
                      </v-card-text>
                    </v-card>
                  </v-timeline-item>

                  <v-timeline-item color="green darken-1" small>
                    <v-card class="elevation-2">
                      <v-card-text>조정대상지역 해제
                        <br>공고일 : 2018.12.31
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-icon small color="blue darken-2">mdi-check</v-icon>부산 - 기장군 일광면
                      </v-card-text>
                    </v-card>
                  </v-timeline-item>

                  <v-timeline-item color="green darken-1" small>
                    <v-card class="elevation-2">
                      <v-card-text>조정대상지역 해제
                        <br>공고일 : 2019.11.08
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-icon small color="blue darken-2">mdi-check</v-icon>경기도 - 고양시
                        <span
                          class="caption"
                        >(삼송 택지개발지구, 원흥·지축·향동 공공주택지구, 덕은·킨텍스(한국국제전시장) 1단계·고양관광문화단지(한류월드) 도시개발구역 제외)</span>, 남양주시
                        <span class="caption">(다산동·별내동 제외)</span>,
                        <br>
                        <v-icon small color="blue darken-2">mdi-check</v-icon>부산 - 해운대구, 수영구, 동래구
                      </v-card-text>
                    </v-card>
                  </v-timeline-item>

                  <v-timeline-item color="red darken-1" small>
                    <v-card class="elevation-2">
                      <v-card-text>조정대상지역 지정
                        <br>공고일 : 2020.02.21
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-icon small color="blue darken-2">mdi-check</v-icon>경기도 - 수원시 영통구ㆍ권선구ㆍ장안구, 안양시 만안구, 의왕시
                      </v-card-text>
                    </v-card>
                  </v-timeline-item>
                  <v-timeline-item color="red darken-1" small>
                    <v-card class="elevation-2">
                      <v-card-text>조정대상지역 지정
                        <br>공고일 : 2020.06.19
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-icon small color="blue darken-2">mdi-check</v-icon>경기도 - 고양시, 남양주시
                        <span class="caption">(화도급, 수동면, 조안면 제외)</span>, 군포시, 안성시
                        <span
                          class="caption"
                        >(일죽면, 죽산면 죽산리ㆍ용설리ㆍ장계리ㆍ매산리ㆍ장릉리ㆍ장원리ㆍ두현리, 삼죽면 용월리ㆍ덕산리ㆍ율곡리ㆍ내장리ㆍ배태리 제외)</span>, 부천시, 안산시, 시흥시, 용인시 처인구
                        <span
                          class="caption"
                        >(포곡읍, 모현면, 백암면, 양지면, 원삼면 가재월리ㆍ사암리ㆍ미평리ㆍ좌항리ㆍ맹리ㆍ두창리 제외)</span>, 오산시, 평택시, 광주시
                        <span class="caption">(초월읍, 곤지암읍, 도척면, 퇴촌면, 남종면, 남한산성면 제외)</span>, 양주시, 의정부시
                        <br>
                        <v-icon small color="blue darken-2">mdi-check</v-icon>인천 - 중구, 동구, 미추홀구, 연수구, 남동구, 부평구, 계양구, 서구
                        <br>
                        <v-icon small color="blue darken-2">mdi-check</v-icon>대전 - 동구, 중구, 서구, 유성구, 대덕구
                        <br>
                        <v-icon small color="blue darken-2">mdi-check</v-icon>충북 - 청주
                        <span
                          class="caption"
                        >(낭성면, 미원면, 가덕면, 남일면, 문의면, 남이면, 현도면, 강내면, 옥산면, 내수읍, 북이면 제외)</span>
                      </v-card-text>
                    </v-card>
                  </v-timeline-item>
                </v-timeline>
              </div>
            </v-expand-transition>

            <v-card-actions class="mb-10 mt-5">
              <v-btn block color="primary" dark to="/steps">비과세가 아니라면 계산 시작하기</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data: () => ({
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    show5: false,
    show6: false
  })
  /*data() {
    return {
      e6: 1
    };
  }*/
};
</script>

<style>
th {
  color: grey;
}
</style>