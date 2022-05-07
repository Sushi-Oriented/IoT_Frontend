const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// const defaultFormatDate = 'yyyy-mm-dd'  // 2019-05-05
// const defaultFormatTime = 'HH:MM'       // 16:05

var DateFormat = require('dateformat');

class Dates {

    static FORMAT = {
        DATE1: 'yyyy-mm-dd', // 2019-05-05
        DATE2: 'yyyy/mm/dd', // 2019/05/05
        DATE3: 'dd/mm/yyyy', // 05/12/2020
        TIME1: 'HH:MM', // 16:05
        TIME2: 'HH:MM:ss', // 16:05
        TIME3: 'hh:MM TT', // 1:05 AM
        TIME4: 'hh:MM:ss TT', // 6:05 PM
        DATE_TIME1: 'yyyy-mm-dd HH:MM', // 2019-05-05 16:05
        DATE_TIME2: 'dd-mm-yyyy HH:MM', // 05-12-2020 16:05
        DATE_TIME3: 'dd/mm/yyyy HH:MM', // 05/12/2020 16:05
        DATE_TIME4: 'dd-mm-yyyy HH:MM:ss', // 05/12/2020 16:05:35
        DATE_TIME5: 'dd/mm/yyyy hh:MM TT', // 05/12/2020 04:05 PM
    }

    static initDate(datetime) {
        if (typeof (datetime) === 'undefined' || datetime === null) {
            return new Date()
        }
        else {
            return new Date(datetime)
        }
    }

    // datetime refer to local time
    // return Sunday,..
    static getDayName(datetime) {
        return days[this.initDate(datetime).getDate()]
    }
    // datetime refer to local time
    // return Januari,..
    static getMonthName(datetime) {
        return months[this.initDate(datetime).getMonth()]
    }
    // 1-12
    static getMonthNameByNumber(number) {
        if (number < 1 || number > 12) {
            return null
        }
        return months[number - 1]
    }

    // datetime refer to local time
    // return 01,...31
    static getDateNumber(datetime) {
        let _d = this.initDate(datetime).getDate()
        if (_d.toString().length === 1) {
            _d = '0' + _d.toString()
        }
        return _d
    }
    // datetime refer to local time
    // return 01,...12
    static getMonthNumber(datetime) {
        let m_ = this.initDate(datetime).getMonth() + 1
        if (m_.toString().length === 1) {
            m_ = '0' + m_.toString()
        }
        return m_
    }
    // datetime refer to local time
    // return 2019,...
    static getYear(datetime) {
        return this.initDate(datetime).getFullYear()
    }

    static getDiffTime(date_from, date_to) {
        let _diff = Math.abs(new Date(date_from) - new Date(date_to)) / 1000
        var year = Math.floor(_diff / 946080000)
        var month = Math.floor(_diff / 2592000) % 30;
        var days = Math.floor(_diff / 86400);
        var hours = Math.floor(_diff / 3600) % 24;
        var minutes = Math.floor(_diff / 60) % 60;
        var seconds = Math.floor(_diff % 60);

        return ({ year: year, month: month, day: days, hour: hours, minute: minutes, second: seconds })
    }
    static getDiffTimeByDay(date_from, date_to) {
        //console.log(date_from)
        let _diff = Math.abs(new Date(date_from) - new Date(date_to)) / 1000
        return Math.floor(_diff / 86400);
    }

    static format(datetime, format) {
        if (typeof (datetime) === 'undefined') {
            return ''
        }
        if (datetime === null) {
            return ''
        }
        let dates = DateFormat(datetime, format)
        return dates
    }
    static getToday(format) {
        return DateFormat(format)
    }
    static getDatesBetween(start, end) {
        for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
            arr.push(new Date(dt));
        }
        return arr;
    }
    static getSubtractDate(daySubtract, currenDate) {
        if (typeof (currenDate) === 'undefined') {
            return new Date(Date.now() - daySubtract * 24 * 60 * 60 * 1000)
        }

        return new Date(new Date(currenDate).getTime() - daySubtract * 24 * 60 * 60 * 1000)
    }
    static getAddDate(dayAdded, currenDate) {
        if (typeof (currenDate) === 'undefined') {
            return new Date(Date.now() + dayAdded * 24 * 60 * 60 * 1000)
        }

        return new Date(new Date(currenDate).getTime() + dayAdded * 24 * 60 * 60 * 1000)
    }
    static getNumberPrevMonth(year, month) {
        // month = 1-12
        if (month === 1) {
            return {
                year: year - 1,
                month: 12
            }
        }

        return {
            year: year,
            month: month - 1
        }
    }
    static getNumberNextMonth(year, month) {
        // month = 1-12
        if (month === 12) {
            return {
                year: year + 1,
                month: 1
            }
        }

        return {
            year: year,
            month: month + 1
        }
    }
    static getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
    static getDateFromDates(dates) {
        dates = new Date(dates)

        return {
            date: dates.getDate(),
            month: dates.getMonth() + 1,
            year: dates.getFullYear()
        }
    }
}
export default Dates;