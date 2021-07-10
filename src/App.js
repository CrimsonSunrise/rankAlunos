import React, { useRef, useState } from 'react';
import './App.css';
import emailjs, { init } from 'emailjs-com';
import {FaCrown} from 'react-icons/fa'
init("user_7oQipdD74sHeq17IwvGx9");

let jsonFile = require("./csvjson.json")

let Nome = '';
let Rank = '';
let Email = '';

function App() {
	
	const emailInput = useRef();
	const button = useRef();
	const codeInput = useRef();
	const buttonCode = useRef();
	const checkCode = useRef();
	const showRank = useRef();
	const [email, setEmail] = useState();
	const [codigoVerificacao, setCodigoVerificacao] = useState();
	const [codigo, setCodigo] = useState();
	const [nome, setNome] = useState('');
	const [rank, setRank] = useState('');
	
	function getUser(e) {
		jsonFile.map(item => {
			if(item["E-mail"] === e) {
				//console.log(item)
				Nome = item['Nome'];
				Rank = item["Posição Ranking Geral"];
				Email = item["E-mail"];
				return {
					"msg": "Success"
				}
			}
			return ""
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
	
	const checarCode = (e) => {
		if(e.length >= 6) {
			buttonCode.current.className = 'active'
		} else {
			buttonCode.current.className = ''
		}
		setCodigo(e)
	}
	
	const verificarCodigo = () => {
		//console.log("Verificando")
		if( codigo === codigoVerificacao) {
			setNome(Nome);
			setRank(Rank);
			//console.log(nome, rank)
			showRank.current.className = 'showRank active';
			
		} else {
			
		}
	}
	
	const verificarRank = () => {
		getUser(email)
		if(Email === email) {
			handleSubmit();
		} else {
			console.log("Seu email não foi encontrado")
		}
	}
	
	function criarCodigo(length) {
		let resultado = '';
		const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var caracteresLenght = caracteres.length;
		for ( var i = 0; i < length; i++ ) {
			resultado += caracteres.charAt(Math.floor(Math.random() * caracteresLenght));
	   	}
	   	return resultado;
	}
	
	function handleSubmit () {
		var templateParams = {
			to_name: Nome.split(' ')[0],
			message: criarCodigo(6),
			user_email: email,
			from_name: "Glimpse bot"
		};
		
		emailjs.send('service_k3k8gbp', 'template_6lob0an', templateParams)
			.then(function(response) {
				setCodigoVerificacao(templateParams.message);
				//console.log(codigoVerificacao)
				//console.log('SUCCESS!', response.status, response.text);
				checkCode.current.className = 'checkCode active';
			}, function(error) {
				//console.log('FAILED...', error);
		});
	}
	
	return (
		<>
			<div className="mainApp">
				
				<div className="content">
					
					<h1>Está preparado(a) para saber sua posição?</h1>
					<h3>Insira seu email no campo abaixo.</h3>
					
					<div className="inputs">
						<input ref={emailInput} onChange={(e) => { checarEmail(e.target.value) }} type="email" placeholder="insira seu email" spellCheck="false"></input>
						<button ref={button} onClick={verificarRank} className="">Ver meu rank</button>
					</div>
					
				</div>
				
				<div ref={checkCode} className="checkCode">
					
					<h2> {rank} Enviamos um email com um código de confirmação para <b>{email}</b>. Insira o código no campo abaixo para continuar.</h2>
					<div className="inputs">
						<input ref={codeInput} onChange={(e) => { checarCode(e.target.value) }} type="email" placeholder="código de verificação" spellCheck="false"></input>
						<button ref={buttonCode} onClick={verificarCodigo} className="">Continuar</button>
					</div>
					
				</div>
				
				<div ref={showRank} className="showRank">
					
					<h1>Parabéns!</h1>
					
					<div className="rankVisualization">
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
					</div>
					
					<div className="projectDetails">
						
						<h2>Gostou desse projeto?</h2>
						
						<p>Esta página levou aproximadamente 3 horas pra ser desenvolvida.</p>
						<p>Foi feita em <a href="https://pt-br.reactjs.org/" target="_blank">React</a> e utilizada a biblioteca <a href="https://www.emailjs.com/" target="_blank">EmailJS</a> para enviar emails gratuitamente.</p>
						<p>Caso tenha curiosidade em saber como foi feita, me mande uma mensagem no discord! Meu usuário é <span>CrimsonSunrise#2727</span></p>
						
					</div>
					
				</div>
				
			</div>
		</>
	);
}

export default App;
