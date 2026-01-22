/**
 * 验证二代身份证号码（18位）
 * @param {string} idCard - 身份证号码
 * @returns {Object} 验证结果对象
 */
function validateIDCard(idCard) {
    // 移除首尾空格并转大写
    const id = (idCard || '').trim().toUpperCase();
    const result = {
        isValid: false, message: '', info: null
    };

    // 1. 基本格式验证
    const basicReg = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dX]$/;
    if (!basicReg.test(id)) {
        result.message = '身份证格式不正确';
        return result;
    }

    // 2. 日期合法性验证
    const year = parseInt(id.substr(6, 4), 10);
    const month = parseInt(id.substr(10, 2), 10);
    const day = parseInt(id.substr(12, 2), 10);

    if (!isValidDate(year, month, day)) {
        result.message = '身份证日期不合法';
        return result;
    }

    // 3. 校验码验证
    if (!validateCheckCode(id)) {
        result.message = '身份证校验码错误';
        return result;
    }

    // 4. 地区码验证（前6位）
    const areaCode = id.substr(0, 6);
    if (!isValidAreaCode(areaCode)) {
        result.message = '身份证地区码不正确';
        return result;
    }

    // 5. 所有验证通过，解析信息
    result.isValid = true;
    result.message = '身份证号码有效';
    result.info = parseIDInfo(id);

    return result;
}

/**
 * 验证日期合法性
 * @param {number} year - 年
 * @param {number} month - 月
 * @param {number} day - 日
 * @returns {boolean} 是否有效日期
 */
function isValidDate(year, month, day) {
    // 基本范围检查
    if (year < 1800 || year > 2099 || month < 1 || month > 12 || day < 1 || day > 31) {
        return false;
    }

    // 月份天数验证
    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // 闰年处理
    if (isLeapYear(year)) {
        monthLength[1] = 29; // 2月29天
    }

    return day <= monthLength[month - 1];
}

/**
 * 判断是否为闰年
 * @param {number} year - 年
 * @returns {boolean} 是否为闰年
 */
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * 验证校验码
 * @param {string} id - 身份证号码
 * @returns {boolean} 校验码是否正确
 */
function validateCheckCode(id) {
    // 加权因子
    const weightFactors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 校验码对应值
    const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

    let sum = 0;
    // 前17位加权求和
    for (let i = 0; i < 17; i++) {
        sum += parseInt(id[i], 10) * weightFactors[i];
    }

    // 计算校验码
    const mod = sum % 11;
    const expectedCheckCode = checkCodes[mod];
    const actualCheckCode = id[17];

    return expectedCheckCode === actualCheckCode;
}

/**
 * 简单地区码验证
 * 注意：完整的地区码需要完整的行政区划数据
 * @param {string} areaCode - 地区码
 * @returns {boolean} 地区码是否有效
 */
function isValidAreaCode(areaCode) {
    // 这里只做基本验证，实际应使用完整的行政区划数据库
    const provinceCode = areaCode.substr(0, 2);
    const cityCode = areaCode.substr(2, 2);
    const districtCode = areaCode.substr(4, 2);

    // 省份代码应在 11-91 之间（实际范围）
    const province = parseInt(provinceCode, 10);
    if (province < 11 || province > 91) {
        return false;
    }

    // 城市代码应在 00-99 之间
    const city = parseInt(cityCode, 10);
    if (city < 0 || city > 99) {
        return false;
    }

    // 区县代码应在 00-99 之间
    const district = parseInt(districtCode, 10);
    return !(district < 0 || district > 99);
}

/**
 * 解析身份证信息
 * @param {string} id - 身份证号码
 * @returns {Object} 身份证信息
 */
function parseIDInfo(id) {
    const year = id.substr(6, 4);
    const month = id.substr(10, 2);
    const day = id.substr(12, 2);
    const birthdate = `${year}-${month}-${day}`;

    // 计算年龄
    const today = new Date();
    const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    // 判断性别（第17位，奇数为男，偶数为女）
    const genderDigit = parseInt(id.substr(16, 1), 10);
    const gender = genderDigit % 2 === 1 ? '男' : '女';

    // 地区码
    const areaCode = id.substr(0, 6);

    return {
        birthdate, age, gender, areaCode, year, month, day
    };
}

/**
 * 生成校验码（辅助函数，用于生成或验证）
 * @param {string} first17 - 身份证前17位
 * @returns {string} 校验码
 */
function generateCheckCode(first17) {
    const weightFactors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

    let sum = 0;
    for (let i = 0; i < 17; i++) {
        sum += parseInt(first17[i], 10) * weightFactors[i];
    }

    return checkCodes[sum % 11];
}

export default validateIDCard;