import config from './config';



const decorateMailTextWithNecessaryLinksForTraking = (mailText: string, emailId: string) => {
    for (const key in config.linksToTrack) {
        const { requestEndpoint, regExpMatchPattern } = config.linksToTrack[key];
        const targetEndpoint = `${requestEndpoint}/${emailId}`;

        mailText = mailText.replace(regExpMatchPattern, `$1${targetEndpoint}$2`);
    }
    
    const spyPixel = `<img src="${config.baseTrakingForMailOpening}/${emailId}" alt="pixel">`;
    mailText = mailText.replace('</body>', `${spyPixel}</body>`);

    return mailText;
};

export default {
    decorateMailTextWithNecessaryLinksForTraking
};