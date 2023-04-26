import './home.css'

import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { Link, useNavigate } from 'react-router-dom'

import { useState } from 'react'

function Home(){

    async function handleLogin(e){
        e.preventDefault();

        if(email !== '' && password !== ''){

            await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/admin', {replace: true})
            })
            .catch(() => {
                console.log("Erro de login")
            })

        }else{
            alert('Preencha todos os campos!')
        }
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    return(
        <div className='home-container'>
            <h1>Gerenciador de Tarefas</h1>
            <span>Gerencie sua agenda de forma fácil</span>

            <form className='form' onSubmit={handleLogin}>
                <input type='text' placeholder='Digite seu e-mail...' value={email} onChange={(e) => setEmail(e.target.value)}/>

                <input type='text' placeholder='Digite sua senha...' value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button type='submit'>Entrar</button>
            </form>

            <Link className='button-link' to='/register'>Não possui uma conta? Cadastre-se!</Link>
        </div>
    )
}

export default Home;