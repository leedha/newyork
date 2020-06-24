<template>
  <v-app id="inspire">
    <v-content>
      <!--v-content-->
      <v-container fluid grid-list-md>
        <!--v-layout row wrap-->
        <!--v-flex xs12 sm6 md4 lg3 xl2-->
        <v-card flat class="mt-12 pt-12 pb-12 pa-5 mx-auto">
          <div class="box font-weight-bold display-1 fc-bl">양도
            <br>소득세
            <br>계산기
          </div>

          <v-card-text primary class="text-center">#아파트 #주택
            <br>#우리집도 #남의집도
            <br>
            <br>#알아두면 #쓸데있는
            <br>#세법설명 #상세한설명
          </v-card-text>

          <v-card-actions class="mt-12">
            <v-btn block color="primary" dark to="/ahead">시작하기</v-btn>
          </v-card-actions>
        </v-card>
        <!--/v-flex-->
        <!--/v-layout-->
      </v-container>
      <!--/v-content-->
    </v-content>
  </v-app>
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


