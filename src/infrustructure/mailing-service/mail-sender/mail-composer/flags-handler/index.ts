import handleComilerFlags from './config/compiler-flags.handler';

const handleFlags = (htmlText: string, mailFlags: Object): string => {
    if (!mailFlags) return htmlText;
    console.log('log');
    const modifiedText = handleComilerFlags(htmlText, mailFlags);

    return modifiedText;
};

export default {
    handleFlags
};