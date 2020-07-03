<template>
  <div id="app">
    <v-app>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Noto Sans KR", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  text-decoration: none;
}

.bg-gr {
  background-color: #4CAF50;
}
.bg-gr-lt {
  background-color: #E8F5E9;
}

.bg-tl {
  background-color: #4DB6AC;
}
.bg-tl-lt {
  background-color: #B2DFDB;
}

.bg-lm {
  background-color: #D4E157;
}
.bg-lm-lt {
  background-color: #F0F4C3;
}
.bg-lm-dk {
  background-color: #E6EE9C;
}

.fc-wt {
  color: #FFFFFF;
}
.fc-bl {
  color: #000000;
}
.fc-gr {
  color: #43A047;
}
.fc-bl {
  color: #1E88E5;
}
.fc-bl-dk {
  color: #0D47A1;
}
.fc-tl-dk {
  color: #004D40;
}

.box {
  width: 150px;
  border: 1px solid #1E88E5;
  padding: 10px;
  margin: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  margin: auto;
  margin-left: auto;
  margin-right: auto;
}

.inputPrice input[type="number"] {
  -moz-appearance: textfield;
}
.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.v-expansion-panels.font .v-expansion-panel-header {
  font-size: small;
}
</style>
