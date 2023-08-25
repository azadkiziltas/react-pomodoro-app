import { useEffect, useState } from "react";
function App() {
    const initialTime = 30 * 60; // 30 dakika
    const [seconds, setSeconds] = useState(initialTime);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval;

        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else if (seconds === 0) {
            // Zamanlayıcı süresi dolduğunda buraya ulaşır
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive, seconds]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setSeconds(initialTime);
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div class="flex justify-center items-center h-screen">
            <div className="card">
                <div className="p-10 h-auto w-auto justify-center items-center">
                    <div className="text-5xl  font-medium text-center">
                        Pomodoro App
                    </div>
                    <div className="text-center font-bold m-6 text-7xl">
                        {formatTime(seconds)}
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            onClick={toggleTimer}
                            class="m-4  bg-blue-500 hover:bg-blue-700 text-white font-bold h-16 w-36 rounded"
                        >
                            <h1 className="text-xl">
                                {isActive ? "Stop" : "Start"}
                            </h1>
                        </button>
                        <button
                            onClick={resetTimer}
                            class="m-4  bg-red-500 hover:bg-red-700 text-white font-bold h-16 w-36 rounded"
                        >
                            <h1 className="text-xl">{"Reset"}</h1>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
