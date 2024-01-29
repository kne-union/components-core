export const MAX_NUM = 999999999999999.999999; //最大处理的数字

const changeNumMoneyToChinese = (money) => {
  let cnNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"]; //汉字的数字
  let cnIntRadice = ["", "拾", "佰", "仟"]; //基本单位
  let cnIntUnits = ["", "万", "亿", "兆"]; //对应整数部分扩展单位
  let cnDecUnits = ["角", "分", "毫", "厘"]; //对应小数部分单位
  let cnInteger = "整"; //整数金额时后面跟的字符
  let cnIntLast = "元"; //整型完以后的单位
  let integerNum; //金额整数部分
  let decimalNum; //金额小数部分
  let chineseStr = ""; //输出的中文金额字符串
  let parts; //分离金额后用的数组，预定义
  let symbol = ""; //正负值标记
  if (money === "") {
    return "";
  }

  money = parseFloat(money);
  if (money >= MAX_NUM) {
    chineseStr = "超出最大处理数字";
    console.error("超出最大处理数字");
    return chineseStr;
  }
  if (money === 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  if (money < 0) {
    money = -money;
    symbol = "负 ";
  }
  money = money.toString(); //转换为字符串
  if (money.indexOf(".") === -1) {
    integerNum = money;
    decimalNum = "";
  } else {
    parts = money.split(".");
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  if (parseInt(integerNum, 10) > 0) {
    //获取整型部分转换
    let zeroCount = 0;
    let IntLen = integerNum.length;
    for (let i = 0; i < IntLen; i++) {
      let n = integerNum.substr(i, 1);
      let p = IntLen - i - 1;
      let q = p / 4;
      let m = p % 4;
      if (n === "0") {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        zeroCount = 0; //归零
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m === 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
    //整型部分处理完毕
  }
  if (decimalNum !== "") {
    //小数部分
    let decLen = decimalNum.length;
    for (let i = 0; i < decLen; i++) {
      let n = decimalNum.substr(i, 1);
      if (n !== "0") {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr === "") {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum === "") {
    chineseStr += cnInteger;
  }
  chineseStr = symbol + chineseStr;

  return chineseStr;
};

export default changeNumMoneyToChinese;
