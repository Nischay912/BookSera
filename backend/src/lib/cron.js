import cron from 'cron'
import https from 'https'
import dotenv from 'dotenv'
dotenv.config();

const job = new cron.CronJob("*/14 * * * *", function () {
    https
        .get(process.env.API_URL, (res) => {
            if(res.statusCode === 200){
                console.log("GET request sent successfully!")
            }
            else{
                console.log("GET request failed", res.statusCode);
            }
        })
        .on("error", (e) => console.error("Error while sending request", e));
});

export default job;

// step339: SEE THE NEXT STEPS IN INDEX.JS FILE NOW THERE.

/*
So : CRON library allows us to run tasks on a specific schedule.

https module is used to send GET request to the API_URL every 14 minutes.

// 14 * * * * - is a CRON expression that means every 14 minutes ; so the function will be called every 14 minutes.

then we send "get" request using the https module to the API_URL.

If server is up and running, we get 200 status code back from the server, so we print "GET request sent successfully!" ; else if server is not up and running, we get some other status code back from the server, so we print "GET request failed" and the status code.

.on method is used to listen for errors while sending the request.

Then we finally export the job, so that we can use it in other files to do some job and start the job somehwere else too thus now ; like in the server entry file and all now there.

So : Cron jobs are scheduled tasks that run periodically at a specific/fixed time or interval.

we here like discussed earlier want to send GET request for every 14 minutes

We define the schedule using a CRON expression, which consists of five fields: minutes, hours, days of the month, months, and days of the week.

Examples -

* 14 * * * * - is a CRON expression that means every 14 minutes.
* 0 0 * * 0 - is a CRON expression that means at midnight on every Sunday.
* 30 3 15 * * - is a CRON expression that means at 3:30am on the 15th day of every month.
* 0 0 1 1 * - is a CRON expression that means at midnight on January 1st
* 0 * * * * - is a CRON expression that means every hour

Explaination -

┌──────────── minute (0–59)
│ ┌────────── hour (0–23)
│ │ ┌──────── day of month (1–31)
│ │ │ ┌────── month (1–12)
│ │ │ │ ┌──── day of week (0–6) (0 = Sunday)
│ │ │ │ │
*  *  *  *  *

Now let's explain EACH of your CRON expressions clearly:
1️) * 14 * * * *
→ Every 14 minutes (in 6-field cron format)

Breakdown:

Field	Value	Meaning
Seconds	*	every second
Minutes	14	when minutes = 14
Hours	*	every hour
Day of Month	*	every day
Month	*	every month
Day of week	*	every weekday

Meaning:

✔ At xx:14:00
✔ For every hour
✔ Every day

➡ Example times:

1:14

2:14

3:14

4:14

…every hour at minute 14

->f you wanted every 14 minutes in REAL cron format, it should be:

-> / 14 * * * * 


(5-field cron)

2️) 0 0 * * 0
→ Every Sunday at midnight

Breakdown:

Field	Value	Meaning
Minute	0	at minute 0
Hour	0	at hour 0 = midnight
Day of Month	*	any day
Month	*	any month
Day of Week	0	Sunday

Meaning:

✔ 00:00 (midnight)
✔ Only when day-of-week is Sunday
✔ Every week

3️) 30 3 15 * *
→ At 3:30 AM on 15th of every month
Field	Value	Meaning
Minute	30	xx:30
Hour	3	3 AM
Day of Month	15	on the 15th
Month	*	every month
Day of Week	*	any day

Meaning:

✔ Run at 3:30 AM
✔ Only if today is 15th
✔ This runs once a month

4️) 0 0 1 1 *
→ Midnight on January 1st (New Year)
Field	Value	Meaning
Minute	0	0
Hour	0	0
Day of Month	1	1st
Month	1	January
Day of week	*	any day

Meaning:

✔ 00:00 (midnight)
✔ On 1 January
✔ Every year

-> This is literally the New Year job (happy new year cron).

5️) 0 * * * *
→ Every hour, at minute 0
Field	Value	Meaning
Minute	0	at minute 0
Hour	*	every hour
Day of Month	*	every day
Month	*	every month
Day of week	*	any day

Meaning:

✔ 1:00
✔ 2:00
✔ 3:00
✔ 4:00
✔ …every hour exactly at the start of the hour

NOTE : 

To truly run every 14 minutes, correct expression is:
* /14 * * * * *

* /14 = every 14 units.
// 14 = only when the value is exactly 14. 

*/