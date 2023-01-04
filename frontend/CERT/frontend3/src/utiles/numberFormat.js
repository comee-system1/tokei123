function number_format(num) {
    return num.toString().replace(
      /(\d+?)(?=(?:\d{3})+$)/g,
      function (x) {
        return x + ',';
      }
    );
  }

  export default {
    number_format,
};