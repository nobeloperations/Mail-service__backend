import moment from 'moment-timezone';

export function generateTimestampField(timezone: string, eduQuestSelectedDateTime: any ) {
    if(eduQuestSelectedDateTime){
        const dateTime = moment(eduQuestSelectedDateTime);

        const formattedTimestamp = dateTime
          .tz(timezone)
          .format('MMMM DD, YYYY HH:mm [GMT]Z');

        return formattedTimestamp;
    }
    return null 
}