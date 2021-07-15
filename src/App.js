import { useState } from 'react'
import './App.css'

import Character from './components/Character'

function App() {

    const [lcolor, setLcolor] = useState('');
    const [jors, setJors] = useState('');
    const [living, setLiving] = useState(false);
    const [email, setEmail] = useState('');

    const [answer, setAnswer] = useState(false);
    const [adata, setAdata] = useState(false);

function sendData() {
    // ha valamelyik nincs megadva, kilépünk a függvényből
    // a checkboxot itt nem lehet ellenőrízni, hiszen a be nem jelölt
    // állapota is számít (rossz a feladat, oda rádio gomb kellett volna)
    if(lcolor === '' || jors === '' || email === '') return;

    // email valódiságát sem ártana ellenőrízni, de lusta vagyok (és nem volt feladat :P)

    // az inputok eltüntetése/kikapcsolása miatt
    setAnswer(true);

    fetch('api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "lightsabre": lcolor, 
            "type": jors, 
            "isLiving": living, 
            "email": email 
        })
    })
        .then(response => response.json())
        .then(data => {
            setAdata(data);
        });
    }


    return (
    <div className="App">
        <h1>Which Star Wars character are you?</h1>
        { adata ? <div>
            { 
            // a chance-ben a %-jel nyilván szívatásból van :(
            adata.sort((a, b) => parseInt(b.chance) - parseInt(a.chance))
                .map((elem, i) => <Character key={ i } character={ elem } />) }
        </div> :
        <form onSubmit={ e => e.preventDefault() }>
            { answer ? <p>...</p> : <div>
                <label htmlFor="lcolor">Select lightsaber color:</label>
                <select id="lcolor" onChange={ e => setLcolor(e.target.value) } value={ lcolor }>
                    <option value="" disabled={ true }>Select one</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="red">Red</option>
                </select>
            </div>}

            { answer ? <p>...</p> : <div>
                <label htmlFor="jors">Are you a jedi?</label>
                <select id="jors"
                    onChange={ e => setJors(e.target.value) }
                    value={ jors }>
                    <option value="" disabled={ true }>Select one</option>
                    <option value="Jedi">Jedi</option>
                    <option value="Sith">Sith</option>
                    <option value="Other">Other</option>
                </select>
            </div>}

            { answer ? <p>...</p> : <div>
                <label htmlFor="living">Select if you not a robot:</label>
                <input type="checkbox" id="living"
                    value={ living }
                    onChange={ e => setLiving(e.target.value) }/>
            </div>}

            { answer ? <p>...</p> : <div>
                <input type="text" placeholder="E-mail"
                    value={ email }
                    onChange={ e => setEmail(e.target.value) }/>
            </div>}

            <button disabled={ answer } onClick={ sendData }>Send</button>
        </form>}
    </div>
    )
}

export default App
