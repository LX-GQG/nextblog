// timeUtils.js

// 将时间字符串转换为 Date 对象
function parseDate(dateString) {
    return new Date(dateString);
}

// 将时间转换为 "月份 + 时间" 格式的字符串
function formatDateToMonthAndTime(date) {
    const months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    const month = months[date.getMonth()];
    // 把秒去掉   
    const time = date.toLocaleTimeString().slice(0, 5);
    return `${month} ${time}`;
}

// 导出格式化函数
module.exports = {
  parseDate,
  formatDateToMonthAndTime,
};
