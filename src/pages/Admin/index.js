import './Admin.css'
import { useState } from 'react';

import { auth } from '../../firebaseConnection'
import { signOut } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore'

function Admin(){

    const [tarefaInput, setTarefaInput] = useState();

    function handleRegister(e){
        e.preventDefault();

        
    }

    async function handleLogout(){
        await signOut(auth)
    }

    return(
        <div className='admin-container'>
            <h1>Minhas Tarefas</h1>
            <form className='form' onSubmit={handleRegister}>
                <textarea placeholder='Digite sua tarefa...' value={tarefaInput}
                onChange={(e) => setTarefaInput(e.target.value)}/>

                <button className='btn-register' type='submit'>Registrar Tarefa</button>
            </form>

            <article className='list'>

                <p>Estudar</p>

                <div>
                    <button className='btn-editar'>Editar</button>
                    <button className='btn-delete'>Concluir</button>
                </div>

            </article>

            <button onClick={handleLogout} className='btn-logout'>Sair</button>

        </div>
    )
}

export default Admin;