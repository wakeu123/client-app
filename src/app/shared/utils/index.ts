import { formatInTimeZone } from "date-fns-tz";

export function onExportJson() {
    let data = JSON.stringify({weher: {is_sunny: true, temp: '+25'}});
    let dataUrl = 'data:application/json;charset=utf-8,' + encodeURIComponent(data);
    let exportFileName = 'wether.json';
    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUrl);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click(); 
}

/*
* This function convert date with format Sat Jan 11 2025 18:26:07 GMT+0100 (West Africa Standard Time)
* to string with format dd/MM/yyyy and timezone of user
* 
*/
export function convertDateToString(date: Date, format: string = 'dd/MM/yyyy'): string {
    return formatInTimeZone(new Date(), Intl.DateTimeFormat().resolvedOptions().timeZone, format);
}