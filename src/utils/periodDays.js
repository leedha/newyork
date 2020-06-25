export default {
  getPeriod(date1, date2) {
    // 두개의 날짜의 기간(일수) 구하기
    var dateTmp1 = new Date(date1);
    var dateTmp2 = new Date(date2);
    var periodDays = (dateTmp1 - dateTmp2) / (1000 * 60 * 60 * 24);
    return periodDays;
  }
};
