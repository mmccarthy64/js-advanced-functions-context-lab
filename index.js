/* Your Code Here */

let createEmployeeRecord = function(employeeArray){
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(rayOArrays){
    return rayOArrays.map(function(rec){
        return createEmployeeRecord(rec)
    })
}

let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return this
}

let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return this
}

let hoursWorkedOnDate = function(dateSearch){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === dateSearch
    })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === dateSearch
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(dateSearch){
    let wage = hoursWorkedOnDate.call(this, dateSearch) * this.payPerHour
    return parseFloat(wage.toString())
}

let findEmployeeByFirstName = function(src, firstName){
    return src.find(function(rec){
        return rec.firstName === firstName
    })
}

let calculatePayroll = function(src){
    return src.reduce(function(memo, e){
        return memo + allWagesFor.call(e)
    }, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}