function createEmployeeRecord(input){
    return { 
        firstName: input[0],
        familyName: input[1],
        title: input[2],
        payPerHour: input[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(array){
    return array.map(createEmployeeRecord);
}

function createTimeInEvent(time){
    const [date, hour] = time.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });
    return this;
}

function createTimeOutEvent(time){
    const [date, hour] = time.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });
    return this;
}

function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(event => event.date === date);   
    let timeOut = this.timeOutEvents.find(event => event.date === date);  
    
    return (timeOut.hour - timeIn.hour) / 100;   
}

function wagesEarnedOnDate(date){
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const payRate = this.payPerHour;
    return hoursWorked * payRate;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

function calculatePayroll(records) {
    const allWages = records.map(record => allWagesFor.call(record));
    const totalPayroll = allWages.reduce((acc, curr) => acc + curr, 0);
    return totalPayroll;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date;
    });

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0); // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable;
};
