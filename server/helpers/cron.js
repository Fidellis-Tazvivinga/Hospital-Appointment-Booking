

/* ======================= */
//Use this functionality in doctor booking app
//to check if the schedules have passed we delete them 
//and also for appointments done weeks ago maybe

/* ============================ */


const CronJob = require("cron").CronJob;
const moment = require("moment")
const Appointment = require("../models/Appointment");
const Schedule = require("../models/Schedule");

exports.checkDateAvailability = date => {
    if (moment(date).format("YYYY/MM/DD") < moment().format("YYYY/MM/DD")) {
        return false;
    }
    else {
        return true;
    }
};
exports.checkDateTimeAvailability = (date, time) => {
    //this means that the bus has expired since its biggeer than today's date 
    if (moment(date + ' ' + time).format('DD/MM/YYYY HH:mm') < moment().format('DD/MM/YYYY HH:mm')) {
        //run function which checks on the time
        console.log("appointment expired");
        return false;
    } else {
        console.log("appointment still there");
        return true;
    }
};

exports.runEveryMidnightAppointment = () => {

    new CronJob(
        /*   0 0 * * *,  to run every midnight*/
        "0 0 0 * * *",
        async function () {
            console.log("You will see this message every minute", new Date());
            const appointments = await Appointment.find({});

            appointments.map(async appointment => {

                if (appointment.appointmentTime) {
                    if (!exports.checkDateTimeAvailability(appointment.appointmentDate, appointment.appointmentTime) && (appointment.appointmentStatus == "Active" /* || appointment.appointmentStatus == "Cancelled"  */)) {
                        console.log(`${appointments.appointmentTime} about to be removed`);
                        appointment.remove()
                    }
                }

                /* await appointment.save(); */

            })
        },
        null,
        true,
        "Europe/Istanbul"
    );
};



exports.runEveryMidnightScheduleDelete = () => {

    new CronJob(
        /*   0 0 * * *,  to run every midnight*/
        "0 0 0 * * *",
        async function () {
            try {
                console.log("You will see this message every minute", new Date());
                const schedules = await Schedule.find({});

                schedules.map(async schedule => {

                    if (schedule.date) {
                        if (!exports.checkDateAvailability(schedule.date)) {
                            console.log(`${schedule.date} ıs aboıut to be removed`);
                            schedule.remove()
                        }
                    }

                    /* await appointment.save(); */

                })

            } catch (error) {
                console.log(error);
            }

        },
        null,
        true,
        "Europe/Istanbul"
    );
};

//send and email to the users when the appointment is closer

exports.runEveryMidnightAppointmentReminder = () => {

    new CronJob(

        "0 0 0 * * *",
        async function () {
            try {
                console.log("You will see this message every minute", new Date());
                const appointments = await Appointment.find({});


                appointments.map(async appointment => {

                    if (appointment.appointmentTime) {
                        if (!exports.checkDateTimeAvailability(appointment.appointmentDate, appointment.appointmentTime)) {
                            console.log(`${appointments.appointmentTime} about to be removed`);
                            appointment.remove()
                        }
                    }

                    /* await appointment.save(); */

                })

            } catch (error) {
                console.log(error);
            }

        },
        null,
        true,
        "Europe/Istanbul"
    );
};

