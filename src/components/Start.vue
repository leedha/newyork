<template>
  <v-content>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 xl2>
          <v-card class="mt-12 pt-12 pb-12 pa-5" flat>
            <div class="font-weight-black display-1 box">양도
              <br>소득세
              <br>계산기
            </div>

            <v-card-subtitle class="text-center">#쉽게하는 #아파트 #주택 #우리집 #남의집도
              <br>#알아두면 #쓸데있는 #세법설명 #상세한설명
            </v-card-subtitle>
            <v-card-actions class="mt-12">
              <v-btn block color="primary" dark to="/ahead">시작하기</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  methods: {
    goToStep: function(event) {
      this.$router.push("/Steps");
    }
  }
};
</script>


