interface GreetingProps {
    firstName?: string;
    timeZone?: string;
}


export function Greeting({ firstName, timeZone }: GreetingProps) {

    function getTimeOfDay(timezone: string | undefined) {
        const now = new Date()

        if (timezone === undefined) 
            return 'Welcome back'
  
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: 'numeric',
            hour12: false,
        })
  
        const hour = parseInt(formatter.format(now))
  
        if (hour >= 5 && hour < 12) return 'Good morning'
        if (hour >= 12 && hour < 17) return 'Good afternoon'
        if (hour >= 17 && hour < 21) return 'Good evening'
        return 'Good night'
    }

    return (
        <div>
            <p className="flex flex-col">{ getTimeOfDay(timeZone) }{ firstName && ',' }<b>{ firstName || null }</b></p>
        </div>
    );
}
