import moment from 'moment';

const createNameForContactsList = (eduQuestDate: Date) => {
    const momentDate = moment(eduQuestDate);
    const dayOfWeek = momentDate.day();
    
    const formattedDate = momentDate.format('MMMM D, YYYY, hh:mm A');

    if(dayOfWeek === 6 || dayOfWeek === 0) {
        return `Internship Weekend: ${formattedDate}`;
    }

    return `Internship Weekday: ${formattedDate}`;
}

export default createNameForContactsList;