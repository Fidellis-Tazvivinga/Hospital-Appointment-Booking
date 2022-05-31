import React from 'react'

const ScheduleTest = () => {
    const doctorSchedule = [
        "08:00", "08:10", "08:20", "08:30", "08:40", "08:50",
        "09:00", "09:10", "09:20", "09:30", "09:40", "09:50",
        "10:00", "10:10", "10:20", "10:30", "10:40", "10:50",
    ];

    const slots = doctorSchedule.reduce((acc, time) =>
        ((hour) => ({ ...acc, [hour]: [...(acc[hour] ?? []), time] }))
            (parseInt(time.split(':')[0], 10)), {});


    console.log(slots);

    return (
        <div>

            <h1>times</h1>


            {
                //list main header times 
                Object.entries(slots).map(([hour, times]) => (
                    <>
                        <h2>hey {`${(hour + '').padStart(2, '0')}:00`} </h2>

                        {
                            times.map(time => <h1>{time}</h1>)
                        }
                    </>

                ))

                //now body text

            }
        </div>
    )
}

export default ScheduleTest