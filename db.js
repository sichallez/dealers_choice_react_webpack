const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/ski_resorts_db');

// Define my Sequelize models: one table "SkiResorts" contains basic ski resorts information
// Another table "Tickets" contains the ticket pricing information for adult, kid 5/6 and under, junior, senior etc.
// Realised that making two tables probably is not necessary..
const SkiResorts = db.define('ski_resort', {
    name: {
        type: Sequelize.STRING,
        UNIQUE: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    location: {
        type: Sequelize.STRING
    },

    hours: {
        type: Sequelize.TEXT
    },

    ticket: {
        type: Sequelize.TEXT
    },

    lesson: {
        type: Sequelize.TEXT
    },

    website: {
        type:Sequelize.STRING,
        UNIQUE: true
    }
});

/* const Tickets = db.define('ticket', {
    adult: {
        type: Sequelize.INTEGER
    },

    kid: {
        type: Sequelize.INTEGER
    },

    junior: {
        type: Sequelize.INTEGER
    }
}); */

const syncAndSeed = async() => {
    await db.sync({ force: true });
    await Promise.all([
        SkiResorts.create({ name: 'Mount Southington', location: 'Plantsville, CT 06479', hours: 'Mon-Thu: 9:00AM to 9:00PM; Fri: 9:00AM to 10:00PM; Sat: 8:30AM to 10:00PM; Sun: 8:30AM to 8:00PM', ticket: 'Adults(ages 13+): $64; Juniors(ages 6-12): $54; Child(5 & Under): $20', lesson: 'Weekend & Holiday group lessons only. Penguins - 1 Hour Lesson: 10:00AM - 11:00AM or 2:00PM - 3:00PM, Ages: 4-5, Lesson & Lift Ticket: $65; Snow Foxes - 2 Hour Lesson: 10:00AM - 12:00PM or 2:00PM - 4:00PM, Ages: 4-9, Lesson & Lift Ticket: $90', website: 'https://mountsouthington.com/'}),
        SkiResorts.create({ name: 'Mohawk Mountain', location: 'Cornwall, CT 06753', hours: 'M: 12.00PM - 8:00PM; T-TH: 10.00AM - 8:00PM; F: 10.00AM - 10:00PM; SAT: 8.30AM - 10:00PM; SUN: 8.30AM - 4:00PM', ticket: 'Adults(ages 16+): $70; Juniors(ages 5-15): $62; Child(4 & Under): $15', lesson: 'Snowhawks 1.5-hour Lesson: Weekends/Holidays: 10:00 AM (levels 1, 2 & 3 only), 12:00 Noon (all levels), 2:00 PM (all levels), Monday: 12:00 Noon, 2:00 PM, Tuesday-Friday: 10:00 AM, 12:00 Noon, 2:00 PM, Ages: 5-13, Lesson & Lift Ticket: $58', website: 'https://www.mohawkmtn.com/'}),
        SkiResorts.create({ name: 'Ski Butternut', location: 'Great Barrington, MA 01230', hours: 'Monday - Friday: 9:00AM - 4:00PM; Saturday, Sunday & Holidays: 8:15AM - 4:00PM', ticket: 'Adults(ages 14+): $70; Juniors(ages 7-13): $60; Child(6 & Under): $35', lesson: 'Adventurers & miniRIDERS (Ages 4-13): 1/2 Day Morning 9:30am - 12pm, 1/2 Day Afternoon 1:00p - 3:30p, Includes FREE Lift Ticket: $120', website: 'https://skibutternut.com/'}),
        SkiResorts.create({ name: 'Bromley Mountain', location: 'Peru, VT 05152', hours: 'Monday - Friday 9:00am - 4:00pm, Saturday - Sunday & Peak Periods* 8:30am - 4:00pm', ticket: 'Adults(ages 6+): $89; Child (5 & Under): FREE', lesson: 'KidsRule Mountain Camps (Ages 6-12): Full Day Program (9:45am-3:00pm): $156; Morning Half Day Program (9:45AM-11:45AM) (off-peak Sundays only): $100', website: 'https://www.bromley.com/'}),
        SkiResorts.create({ name: 'Catamount Mountain', location: 'Hillsdale, NY 12529', hours: 'Weekdays (Monday - Friday) 9:00am to 4:00pm, Weekends & Holidays* 8:30am to 4:00pm', ticket: 'Adult(18-59): $53; Junior(7-17): $43; Child (6 & Under): FREE', lesson: 'Mountain Cats Full Day (Ages 3-13): $199; Half Day AM 9:00am - 12pm, PM 12:30-3:30: $119', website: 'https://catamountski.com/'})
    ]);
}; 

module.exports = {
    syncAndSeed,
    SkiResorts
}