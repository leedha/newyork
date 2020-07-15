<template>
  <div>
    <v-text-field
      v-if="visible === true"
      ref="currencyInput"
      :label="label"
      prefix="₩"
      outlined
      @input="updateValue"
      v-model="value"
      clearable
      type="number"
      pattern="\d*"
      class="inputPrice"
      @blur="onBlurNumber"
    ></v-text-field>
    <v-text-field
      v-if="visible === false"
      ref="currencyView"
      :label="label"
      prefix="₩"
      outlined
      :value="currencyValue"
      clearable
      @focus="onFocusText"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: { label: String, value: String },
  data: () => ({
    currencyValue: "",
    visible: true
  }),
  methods: {
    updateValue() {
      this.$emit("input", this.value);
    },
    onBlurNumber(e) {
      this.visible = false;
      this.temp = this.value;
      this.currencyValue = this.thousandSeprator(this.value);
    },
    onFocusText() {
      this.visible = true;
      this.currencyValue = this.temp;
    },
    thousandSeprator(amount) {
      if (
        amount !== "" ||
        amount !== undefined ||
        amount !== 0 ||
        amount !== "0" ||
        amount !== null
      ) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return amount;
      }
    }
  }
};
</script>

<style>
</style>