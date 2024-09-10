const handleCompilerFlags = (htmlText: string, mailFlags: Object): string => {
    if (mailFlags.hasOwnProperty('flow')) {
        const imgSource = mailFlags['flow'] === 'WD' 
            ? 'https://i.ibb.co/VQ9N938/Copy-of-Weekday-Banner.png'
            : 'https://i.ibb.co/zxc8TZ9/Copy-of-Week-End-Banner.png';

        const additionalContent = `<br/>Can you find where you are in the Internship Flow?<br/><img src=${imgSource} style="width: 800px;"><br/>Check out the Internship Calendar (<a href="https://docs.google.com/spreadsheets/d/1OmUSx-uEEKL6Rp6VN5i0oz2czasSlb39Z-Ox6UEIfAI/edit#gid=289983148">HERE</a>) to know what's next.<br/><br/><br/>`;
        const updatedHtmlText = htmlText.replace(/(<h2 style="font-size: 20px; font-weight: 700; color: #475569">FOLLOW US<\/h2>)/, `${additionalContent}$1`);

        return updatedHtmlText;
    }

    return htmlText;
};

export default handleCompilerFlags;
