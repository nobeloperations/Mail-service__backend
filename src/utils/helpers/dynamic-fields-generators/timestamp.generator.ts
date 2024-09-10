import moment from 'moment';


const generateEqTimestampFieldBasedOnEqSelectedDate = (targetTimezone: string, eqDateTime: Date) => {
    const momentDate = moment(eqDateTime);
    const formatedDate = momentDate.tz(targetTimezone).format('MMMM DD, YYYY HH:mm');

    return `${formatedDate} ${targetTimezone}`;
};

export default generateEqTimestampFieldBasedOnEqSelectedDate;