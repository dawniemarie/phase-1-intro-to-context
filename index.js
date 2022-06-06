function createEmployeeRecord(employee){
    // console.log(employee)
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) { 
    return employees.map(employee => createEmployeeRecord(employee)) // .map process array of arrays into an array
}

function createTimeInEvent(empRecord, dateStamp) {
    let eventObj = {
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    }
    empRecord.timeInEvents.push(eventObj)
    return empRecord
}

function createTimeOutEvent(empRecord, dateStamp) {
    let eventObj = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    }
    empRecord.timeOutEvents.push(eventObj)
    return empRecord
}

function hoursWorkedOnDate(empRecord, date) {
    const timeIn = empRecord.timeInEvents.find(empRecord => empRecord.date === date)
    const timeOut = empRecord.timeOutEvents.find(empRecord => empRecord.date === date)
    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(empRecord, date) {
    return (hoursWorkedOnDate(empRecord, date)) * empRecord.payPerHour
}

function allWagesFor(empRecordObj){
    let totalPay = [];
    let totalDates = [];

    for (let i = 0; i < empRecordObj.timeInEvents.length; i++){
        totalDates.push(empRecordObj.timeInEvents[i].date)
    }

    totalDates.forEach(date => {
        totalPay.push(wagesEarnedOnDate(empRecordObj, date))
    });

    return totalPay.reduce((previousValue, currentValue) => previousValue + currentValue)
}


function calculatePayroll(rRecord) {
    let payroll = [];

    rRecord.forEach(employee => {
        payroll.push(allWagesFor(employee))
    });
    return payroll.reduce((previousValue, currentValue) => previousValue + currentValue)

}