import Link from "next/link"
import UserContext from "@/context/UserContext";
import users from "@/data/users.json"
import { useRouter } from "next/router";
import { useState, useContext } from "react"

const LoginModal = () => {
    const { user, setUser } = useContext(UserContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState({
        status: null,
        message: null
    });

    const router = useRouter();

    const handleLogin = () => {
        // Check if email and password are correct
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            setUser(user);
            setTimeout(() => {
                setResponse({
                    status: "success",
                    message: "Du wurdest erfolgreich angemeldet."
                });
                // set response to null after two seconds
                setTimeout(() => {
                    setResponse({
                        status: null,
                        message: null
                    });
                }, 2000);
                router.push("/dashboard");
            });
        } else {
            setTimeout(() => {
                setResponse({
                    status: "error",
                    message: "Die Email oder das Passwort ist falsch."
                });
                // set response to null after two seconds
                setTimeout(() => {
                    setResponse({
                        status: null,
                        message: null
                    });
                }, 2000);
            });
        }
    }

    /*
    useEffect(() => {
        console.log("Email: " + email);
        console.log("Password: " + password);
    }, [email, password]);
    */

    return (
        <>
            <input type="checkbox" id="login-modal" className="modal-toggle" />
            <label htmlFor="login-modal" className="modal cardmax-w-sm shadow-2xl">
                <div className="modal-box relative">
                    <div className="card-body">
                        <h1 className="card-title">Anmelden</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input onChange={(e) => {
                                setEmail(e.target.value);
                            }} type="text" placeholder="Deine Email Adresse" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Passwort</span>
                            </label>
                            <input onChange={(e) => {
                                setPassword(e.target.value);
                            }} type="password" placeholder="Dein Passwort" className="input input-bordered" />
                            <label className="label">
                                <Link href="/forgot" className="label-text-alt link link-hover">Passwort vergessen?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" onClick={handleLogin}>Anmelden</button>
                        </div>
                    </div>
                    {
                        response.status === "success" && (
                            <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Check icon</span>
                                </div>
                                <div className="ml-3 text-sm font-normal">{response.message}</div>
                            </div>
                        )
                    }
                    {
                        response.status === "error" && (
                            <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Error icon</span>
                                </div>
                                <div className="ml-3 text-sm font-normal">{response.message}</div>
                            </div>
                        )
                    }
                </div>
            </label>
        </>
    )
}

export default LoginModal
