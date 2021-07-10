import React, { useRef, useState } from 'react';
import './App.css';
import {FaCrown} from 'react-icons/fa'

let jsonFile = require("./dados.json")

let Nome = '';
let Email = '';
let Rank = '';

function App() {
	
	const emailInput = useRef();
	const button = useRef();
	const showRank = useRef();
	const msg = useRef();
	const [email, setEmail] = useState();
	const [nome, setNome] = useState('');
	const [rank, setRank] = useState('');
	const [error, setError] = useState('');
	
	function getUser(e) {
		jsonFile.map(item => {
			if(item["Email"] === e) {
				Nome = item['Nome'];
				Email = item["Email"];
				Rank = item["Rank"];
				setNome(item['Nome'])
				setRank(item["Rank"])
			}
			return {}
		})
	}
	
	const checarEmail = (e) => {
		if(e.indexOf("@") > -1 && e.indexOf(".") > -1) {
			button.current.className = 'active';
		} else {
			button.current.className = '';
		}
		setEmail(e);
	}
	
	const verificarRank = () => {
		getUser(email)
		if(Email === email) {
			showRank.current.className = 'showRank active';
		} else {
			msg.current.className = 'msg active';
			setError("Email não encontrado!")
			setTimeout(() => {
				msg.current.className = 'msg';
			}, 4000)
		}
	}
	
	const PrimeiroLugar = () => {
		return (
			<>
				<div className="rank active">
					<div className="rankPos">#1</div>
					<div className="rankName">{nome.split(' ')[0]} {nome.split(' ')[1]}</div>
					<div className="crown"><FaCrown/></div>
				</div>
				<div className="rank">
					<div className="rankPos">#2</div>
					<div className="rankName"></div>
				</div>
				<div className="rank">
					<div className="rankPos">#3</div>
					<div className="rankName"></div>
				</div>
			</>
		)
	}
	
	const DemaisLugares = () => {
		return (
			<>
				<div className="rank">
					<div className="rankPos">#{rank-1}</div>
					<div className="rankName"></div>
				</div>
				<div className="rank active">
					<div className="rankPos">#{rank}</div>
						<div className="rankName">{nome.split(' ')[0]} {nome.split(' ')[1]}</div>
					</div>
				<div className="rank">
					<div className="rankPos">#{rank+1}</div>
					<div className="rankName"></div>
				</div>
			</>
		)
	}
	
	return (
		<>
			
			<div ref={msg} className="msg">
				{error}
			</div>
		
			<div className="mainApp">
				
				<div className="content">
					
					<h1>Está preparado(a) para saber sua posição?</h1>
					<h3>Insira seu email no campo abaixo.</h3>
					
					<div className="inputs">
						<input ref={emailInput} onChange={(e) => { checarEmail(e.target.value) }} type="email" placeholder="insira seu email" spellCheck="false"></input>
						<button ref={button} onClick={verificarRank} className="">Ver meu rank</button>
					</div>
					
				</div>
				
				<div ref={showRank} className="showRank">
					
					<h1>Parabéns!</h1>
					
					<div className="rankVisualization">
						{ rank == 1 ? <PrimeiroLugar/> : <DemaisLugares/> }
					</div>
					
				</div>
				
			</div>
		</>
	);
}

export default App;
