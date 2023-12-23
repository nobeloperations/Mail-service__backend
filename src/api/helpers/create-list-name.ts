import moment from "moment"

const createNameForContactsList = (eduQuestDate: Date) => {
    const dayOfWeek = moment(eduQuestDate).day()
    
    const options: Intl.DateTimeFormatOptions = {
        month: 'long', 
        day: 'numeric', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit'
    };

    const date = new Date(eduQuestDate);
    const formattedDate = date.toLocaleDateString('en-US', options);

    if(dayOfWeek === 6 || dayOfWeek === 0) {
        return `Internship Weekend: ${formattedDate}`
    }

    return `Internship Weekday: ${formattedDate}`
}

export default createNameForContactsList