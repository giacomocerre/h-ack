import React, { useState, ChangeEvent } from 'react';

interface AgeVerificationProps {
    onAgeVerified: (date: string) => void;
}

const AgeVerificationComponent: React.FC<AgeVerificationProps> = ({ onAgeVerified }) => {
    const currentDate = new Date();
    const [day, setDay] = useState<string>(currentDate.getDate().toString());
    const [month, setMonth] = useState<string>((currentDate.getMonth() + 1).toString());
    const [year, setYear] = useState<string>(currentDate.getFullYear().toString());
    const [isOver18, setIsOver18] = useState<boolean | null>(null); // Use null to indicate not checked
    const [verificationButtonPressed, setVerificationButtonPressed] = useState<boolean>(false);

    const handleDayChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setDay(e.target.value);
    };

    const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setMonth(e.target.value);
    };

    const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setYear(e.target.value);
    };

    const handleVerifyAge = () => {
        setVerificationButtonPressed(true);
        const inputDate = new Date(`${year}-${month}-${day}`);
        const ageDiff = currentDate.getFullYear() - inputDate.getFullYear();

        if (ageDiff > 18 || (ageDiff === 18 && currentDate.getMonth() > inputDate.getMonth())) {
            setIsOver18(true);
            // Emit the date or other information to the parent component
            onAgeVerified(inputDate.toISOString()); // You can format the date as needed
        } else {
            setIsOver18(false);
        }
    };

    // Helper function to generate an array of numbers
    const generateNumberArray = (start: number, end: number) => {
        const array = [];
        for (let i = start; i <= end; i++) {
            array.push(i.toString());
        }
        return array;
    };

    return (
        <div className='ageVerify-main'>
            <h2 className='verify-title'>Verifica età</h2>
            <p className='verify-descr'>Per accedere ai contenuti e usufruire del servizio è necessario avere più di 18 anni.</p>
            <div className='age-actions-content'>
                <div className='ageVerify-content'>
                    <div>
                        <label className='age-select age-label'>
                            Day:
                            <select className='age-select age-value' value={day} onChange={handleDayChange}>
                                {generateNumberArray(1, 31).map((d) => (
                                    <option className='age-select' key={d} value={d}>
                                        {d}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label className='age-select age-label'>
                            Month:
                            <select className='age-select age-value' value={month} onChange={handleMonthChange}>
                                {generateNumberArray(1, 12).map((m) => (
                                    <option className='age-select' key={m} value={m}>
                                        {m}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label className='age-select age-label'>
                            Year:
                            <select className='age-select age-value' value={year} onChange={handleYearChange}>
                                {generateNumberArray(1900, new Date().getFullYear()).map((y) => (
                                    <option className='age-select' key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>
                <div className='verify-action'>
                    <button className="verify-button" onClick={handleVerifyAge}>
                        Verify Age
                    </button>
                    {verificationButtonPressed && !isOver18 && <p className='error'>Ci dispiace ma non possieti l'età adeguata per accedere al servizio. Ti aspettiamo presto!</p>}
                </div>
            </div>
        </div>
    );
};

export default AgeVerificationComponent;
