<template>
  <div id="app">
    <v-app>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
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

.bg-bx {
  background-color: #3949ab;
}
.bg-bx-lt {
  background-color: #5c6bc0;
}

.bg-tbl-1 {
  background-color: #7986cb;
}
.bg-tbl-2 {
  background-color: #9fa8da;
}
.bg-tbl-3 {
  background-color: #c5cae9;
}

.bg-tl {
  background-color: #b0bec5;
}
.bg-tl-lt {
  background-color: #eceff1;
}

.bg-lm {
  background-color: #d4e157;
}
.bg-lm-lt {
  background-color: #f0f4c3;
}
.bg-lm-dk {
  background-color: #e6ee9c;
}

.fc-wt {
  color: #ffffff;
}
.fc-bl {
  color: #000000;
}
.fc-gr {
  color: #43a047;
}
.fc-bl {
  color: #1e88e5;
}
.fc-bl-dk {
  color: #0d47a1;
}
.fc-tl-dk {
  color: #004d40;
}
.fc-pk {
  color: #f8bbd0;
}

.box {
  width: 150px;
  border: 3px solid #f8fbfd;
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
