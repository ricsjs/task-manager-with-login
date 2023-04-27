import { Link } from 'react-router-dom'

import { auth } from '../../firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

import { useState } from 'react'

function Register(){

    async function handleRegister(e){
        e.preventDefault();

        if(email !== '' && password !== ''){
            await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/admin', {replace: true})
            })
            .catch(() => {
                console.log("Erro ao fazer o cadastro")
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
            <h1>Cadastre-se!</h1>
            <span>Crie sua conta para começar a gerenciar seus projetos!</span>

            <form className='form' onSubmit={handleRegister}>
                <input type='text' placeholder='Digite seu e-mail...' value={email} onChange={(e) => setEmail(e.target.value)}/>

                <input type='password' placeholder='Digite sua senha...' value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button type='submit'>Cadastrar</button>
            </form>

            <Link className='button-link' to='/'>Já possui uma conta? Faça login!</Link>
        </div>
    )
}

export default Register;