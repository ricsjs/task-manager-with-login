import './Admin.css'
import { useState, useEffect } from 'react';

import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore'

function Admin(){

    const [tarefaInput, setTarefaInput] = useState();
    const [user, setUser] = useState({})

    useEffect(() => {
        async function loadTarefas(){
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))
        }

        loadTarefas();
    }, [])

    async function handleRegister(e){
        e.preventDefault();

        if(tarefaInput === ''){
            alert("Digite sua tarefa...")
            return;
        }

        await addDoc(collection(db, 'tarefas'), {
            tarefa: tarefaInput,
            created: new Date(),
            userUild: user?.uid
        })
        .then(() => {
            console.log("Tarefa registrada")
            setTarefaInput('')
        })
        .catch((error) => {
            console.log(error)
        })
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