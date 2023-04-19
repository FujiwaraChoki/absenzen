import Link from "next/link"
import UserContext from "../context/UserContext"
import { useContext } from "react"
import { useRouter } from "next/router"

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const router = useRouter();

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link href={"/"}>Home</Link></li>
                        {
                            user && (
                                <>
                                    <li><Link href={"/dashboard"}>Dashboard</Link></li>
                                    <li><Link href={""} onClick={() => {
                                        setUser(null);
                                        router.push("/?logout=true");
                                    }}>Abmelden</Link></li>
                                </>
                            )
                        }
                        <li><Link href={"about"}>Über</Link></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <Link href={"/"} className="btn btn-ghost normal-case text-xl">Absenzen</Link>
            </div>
            <div className="navbar-end">
                {
                    user && (
                        <div>
                            <label htmlFor="search-modal" className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </label>
                            <Link className="btn btn-ghost btn-circle" href="/dashboard">
                                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" id="dashboard" class="h-5 w-5">
                                    <path d="M10.5,13h-7C3.2,13,3,13.2,3,13.5v7C3,20.8,3.2,21,3.5,21h7c0.3,0,0.5-0.2,0.5-0.5v-7C11,13.2,10.8,13,10.5,13z M10,20H4v-6h6V20z M10.5,3h-7C3.2,3,3,3.2,3,3.5v7C3,10.8,3.2,11,3.5,11h7c0.3,0,0.5-0.2,0.5-0.5v-7C11,3.2,10.8,3,10.5,3z M10,10H4V4h6V10z M20.5,3h-7C13.2,3,13,3.2,13,3.5v7c0,0.3,0.2,0.5,0.5,0.5h7c0.3,0,0.5-0.2,0.5-0.5v-7C21,3.2,20.8,3,20.5,3z M20,10h-6V4h6V10z M20.5,16.5h-3v-3c0-0.3-0.2-0.5-0.5-0.5s-0.5,0.2-0.5,0.5v3h-3c-0.3,0-0.5,0.2-0.5,0.5s0.2,0.5,0.5,0.5h3v3c0,0.3,0.2,0.5,0.5,0.5h0c0.3,0,0.5-0.2,0.5-0.5v-3h3c0.3,0,0.5-0.2,0.5-0.5S20.8,16.5,20.5,16.5z"></path>
                                </svg>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar
