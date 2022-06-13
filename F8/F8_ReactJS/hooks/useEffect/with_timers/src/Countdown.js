import {useState, useEffect} from 'react'

function Countdown() {

    const [countdown, setCountdown] = useState(10000)

    useEffect(()=>{
        const countdownI = setInterval(()=>{
            setCountdown(prev => {
                if(prev>0){
                    return prev-1
                }else{
                    return prev
                }
            })
        }, 1000)

        return ()=>{
            clearInterval(countdownI)
        }
    }, [])

    return (

        <div className="content">
            <h1>Countdown</h1>
            <h1>{countdown}</h1>
        </div>

    )
}

export default Countdown