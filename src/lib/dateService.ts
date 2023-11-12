import { format } from "date-fns";


export const messageSend= (date: Date) =>{
    const messageSend= Number(format(new Date(date), 'd'));
    const today= new Date().getDate();
    if(messageSend === today) return 'today';
    else if(messageSend === (today - 1)) return 'yesterday';
    else return format(new Date(date), 'dd/MM/yyyy');
}