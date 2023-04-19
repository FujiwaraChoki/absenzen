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
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar
