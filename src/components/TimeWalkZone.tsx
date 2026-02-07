import { useEffect, useState } from "react";

export default function TimeWalkZone({timeZone, label = true, second = false}: {
    timeZone: string, 
    label?: boolean,
    second?: boolean,
}) {
    const [time, setTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const options: Intl.DateTimeFormatOptions = {
                hour: '2-digit',
                minute: '2-digit',
                second: second ? '2-digit' : undefined,
                timeZone,
                hour12: false,
            };
            const formatter = new Intl.DateTimeFormat([], options);
            // refTime.current.textContent = formatter.format(new Date());
            setTime(formatter.format(new Date()));
        }, 1000);

        return () => clearInterval(interval);
    }, [timeZone, second]);

    return (
        <span>{label ? timeZone + ' ' : ''}{time}</span>
    )
}