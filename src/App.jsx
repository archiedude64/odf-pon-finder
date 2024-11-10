import React, { useState } from 'react';
import './App.css';

function App() {
    // State for the selected FX type
    const [fxType, setFxType] = useState('');
    const [ltCard, setLtCard] = useState('');
    const [pon, setPon] = useState('');
    const [odfPort, setOdfPort] = useState('');
    const [history, setHistory] = useState([]);

    // Function to handle FX type change
    const handleFxTypeChange = (event) => {
        setFxType(event.target.value);
    };

    // Function to handle LT card change
    const handleLtCardChange = (event) => {
        setLtCard(event.target.value);
    };

    // Function to handle PON number change
    const handlePonChange = (event) => {
        setPon(event.target.value);
    };

    // Function to handle ODF port change
    const handleOdfPortChange = (event) => {
        setOdfPort(event.target.value);
    };

    // Function to handle form submission for getting ODF port from LT card and PON
    const getOdfPort = () => {
        if (!fxType || !ltCard || !pon) {
            alert('Please select all values.');
            return;
        }

        // Calculate ODF port number
        const ltCardNum = parseInt(ltCard);
        const ponNum = parseInt(pon);
        const cardsPerFx = { FX4: 4, FX8: 8, FX16: 16 };
        const maxCards = cardsPerFx[fxType];
        const odfPort = (ltCardNum - 1) * 16 + ponNum;

        if (ltCardNum > maxCards || ponNum > 16 || odfPort > 256) {
            alert("Invalid LT card or PON number for the selected FX type.");
            return;
        }

        const result = `LT${ltCardNum} PON${ponNum} is connected to ODF port ${odfPort}.`;
        setHistory([...history, result]);
        alert(result);
    };

    // Function to handle form submission for getting LT card and PON from ODF port
    const getLtPon = () => {
        if (!fxType || !odfPort) {
            alert('Please select all values.');
            return;
        }

        const odfPortNum = parseInt(odfPort);
        const cardsPerFx = { FX4: 4, FX8: 8, FX16: 16 };
        const maxCards = cardsPerFx[fxType];

        if (odfPortNum < 1 || odfPortNum > 256) {
            alert("Invalid ODF port number.");
            return;
        }

        const ltCard = Math.floor((odfPortNum - 1) / 16) + 1;
        const pon = (odfPortNum - 1) % 16 + 1;

        if (ltCard > maxCards) {
            alert("The ODF port number exceeds the maximum card capacity for the selected FX type.");
            return;
        }

        const result = `ODF port ${odfPortNum} is connected to LT${ltCard} PON${pon}.`;
        setHistory([...history, result]);
        alert(result);
    };

    return (
        <div className="App">
            <h1>ODF PON Finder</h1>

            {/* FX Type dropdown */}
            <div>
                <label htmlFor="fxType">Choose an FX type: </label>
                <select
                    id="fxType"
                    value={fxType}
                    onChange={handleFxTypeChange}
                    className="dropdown"
                >
                    <option value="" disabled>Select FX type</option>
                    <option value="FX4">FX4</option>
                    <option value="FX8">FX8</option>
                    <option value="FX16">FX16</option>
                </select>
            </div>

            {/* If the user chooses option 1, allow input for LT card and PON */}
            <div>
                <h2>Get ODF Port from LT card and PON</h2>
                <label htmlFor="ltCard">Enter LT card number (1-16): </label>
                <input
                    type="number"
                    id="ltCard"
                    value={ltCard}
                    onChange={handleLtCardChange}
                    min="1"
                    max="16"
                    disabled={!fxType}
                />
                <br />

                <label htmlFor="pon">Enter PON number (1-16): </label>
                <input
                    type="number"
                    id="pon"
                    value={pon}
                    onChange={handlePonChange}
                    min="1"
                    max="16"
                    disabled={!fxType}
                />
                <br />

                <button onClick={getOdfPort}>Get ODF Port</button>
            </div>

            {/* If the user chooses option 2, allow input for ODF port */}
            <div>
                <h2>Get LT card and PON from ODF port</h2>
                <label htmlFor="odfPort">Enter ODF port number (1-256): </label>
                <input
                    type="number"
                    id="odfPort"
                    value={odfPort}
                    onChange={handleOdfPortChange}
                    min="1"
                    max="256"
                    disabled={!fxType}
                />
                <br />

                <button onClick={getLtPon}>Get LT card and PON</button>
            </div>

            {/* Display history */}
            <div>
                <h2>History</h2>
                <ul>
                    {history.map((entry, index) => (
                        <li key={index}>{entry}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
