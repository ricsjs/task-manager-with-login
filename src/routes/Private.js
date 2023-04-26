import { useState, useEffect } from "react";

import { auth } from "../firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";

import { Navigate } from "react-router-dom";

function Private({children}){
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        async function checkLogin(){
            const unsub = onAuthStateChanged(auth, (user) => {
                //se logado
                if(user){
                    const userData = {
                        uid: user.uid,
                        email: user.email,
                    }

                    localStorage.setItem("@detailUser", JSON.stringify(userData))

                    setLoading(false);
                    setSigned(true);
                }else{
                    //n ta logado
                    setLoading(false);
                    setSigned(false);
                }
            })
        }

        checkLogin();

    }, [])


    if(loading) {
        return(
            <div>

            </div>
        )
    }

    if(!signed) {
        return <Navigate to='/'/>
    }
    
    return children;


}

export default Private;