const modifyEmailTextWithUniqueValues = (emailText: string, {contactId, emailId}) => {
    const newUnsubscribeLink = `frontendURL?contactId=${contactId}`;
    const eduQuestLink = `http://52.59.202.2:3000/action/email-link-tracking?emailId=${emailId}&linkName=EduQuest`;
    const nobelInternshipLink = `http://52.59.202.2:3000/action/email-link-tracking?emailId=${emailId}&linkName=Nobel-Internship`;
    const imgTag = `<img src="http://52.59.202.2:3000/action/email-open-tracking?emailId=${emailId}" alt="pixel">`;

    const unsubscribeLinkRegex = /(<a[^>]*href=")[^"]*("[^>]*>Unsubscribe<\/a>)/;
    const eduQuestLinkRegex = /(<a[^>]*href=")[^"]*("[^>]*>EduQuest Website<\/a>)/;
    const nobelInternshipLinkRegex = /(<a[^>]*href=")[^"]*("[^>]*>Nobel-Internship Website<\/a>)/;  
    

    let modifiedEmailText = emailText.replace(unsubscribeLinkRegex, `$1${newUnsubscribeLink}$2`);
    modifiedEmailText = modifiedEmailText.replace(eduQuestLinkRegex, `$1${eduQuestLink}$2`);
    modifiedEmailText = modifiedEmailText.replace(nobelInternshipLinkRegex, `$1${nobelInternshipLink}$2`);
    modifiedEmailText = modifiedEmailText.replace('</body>', `${imgTag}</body>`);

    return modifiedEmailText;
};

export default modifyEmailTextWithUniqueValues;
