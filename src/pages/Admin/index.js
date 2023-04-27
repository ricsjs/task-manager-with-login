import './Admin.css'
import { useState, useEffect } from 'react';

import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth';
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc } from 'firebase/firestore'

function Admin(){

    const [tarefaInput, setTarefaInput] = useState();
    const [user, setUser] = useState({})

    const [tarefas, setTarefas] = useState([])

    const [edit, setEdit] = useState({})
 
    useEffect(() => {
        async function loadTarefas(){
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))

            if(userDetail){
                const data = JSON.parse(userDetail);
                const tarefaRef = collection(db, 'tarefas')
                const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))
                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    })
                    setTarefas(lista);
                })
            }
        }

        loadTarefas();
    }, [])

    async function handleRegister(e){
        e.preventDefault();

        if(tarefaInput === ''){
            alert("Digite sua tarefa...")
            return;
        }

        if(edit?.id){
            handleUpdateTarefa();
            return;
        }

        await addDoc(collection(db, 'tarefas'), {
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid
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

    async function deleteTarefa(id){
        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef)
    }

    async function editTarefa(item){
        setTarefaInput(item.tarefa)
        setEdit(item)
    }

    async function handleUpdateTarefa(){
        const docRef = doc(db, 'tarefas', edit?.id)
        await updateDoc(docRef, {
            tarefa: tarefaInput
        })
        .then(() => {
            console.log("Tarefa atualizada")
            setTarefaInput('')
            setEdit({})
        })
        .catch((error) => {
            console.log("Erro ao atualizar" +error)
            setTarefaInput('')
            setEdit({})
        })
    }

    return(
        <div className='admin-container'>
            <h1>Minhas Tarefas</h1>
            <form className='form' onSubmit={handleRegister}>
                <textarea placeholder='Digite sua tarefa...' value={tarefaInput}
                onChange={(e) => setTarefaInput(e.target.value)}/>

                {Object.keys(edit).length > 0 ? (
                    <button className='btn-register' style={{ backgroundColor: '#6add39' }} type='submit'>Atualizar Tarefa</button>
                ):(
                    <button className='btn-register' type='submit'>Registrar Tarefa</button>
                )}
            </form>

            {tarefas?.map((item) => (
                <article key={item.id} className='list'>

                    <p>{item.tarefa}</p>

                    <div>
                        <button onClick={ () => editTarefa(item) } className='btn-editar'>Editar</button>
                        <button onClick={ () => deleteTarefa(item.id) } className='btn-delete'>Concluir</button>
                    </div>

                </article>
            ))}

            <button onClick={handleLogout} className='btn-logout'>Sair</button>

        </div>
    )
}

export default Admin;