import { useState, useEffect } from "react";
import styles from "../styles/Dashboard.module.css";

const Student = ({ absences, class_, avatar, name, absences_details, teacher, email }) => {
    const limit = 40;
    const [overLimit, setOverLimit] = useState();
    const [showAbsences, setShowAbsences] = useState(false);
    const [buttonText, setButtonText] = useState("Absenzen anzeigen");

    useEffect(() => {
        if (absences > limit) {
            setOverLimit(absences - limit);
        }
    }, []);

    const meetingText = `Hallo ${name},%0D%0Aich möchte gerne ein Meeting mit dir vereinbaren, da du über 40 Absenzen hast.%0D%0A%0D%0AGrüsse%0D%0A${teacher}`;

    const openMail = () => {
        window.open(`mailto:${email}?subject=Meeting wegen Absenzen&body=${meetingText}`);
    }

    const [open, setOpen] = useState(false);

    return (
        <>
            {
                open && (
                    <div id="popup-modal" tabIndex="-1" className="p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button onClick={() => setOpen(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-6 text-center">
                                    <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{name} hat weniger als 40 Absenzen, wollen Sie wirklich ein Meeting vereinbaren?</h3>
                                    <a href={`mailto:${email}?subject=Meeting wegen Absenzen&body=${meetingText}`} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                        Meeting vereinbaren
                                    </a>
                                    <button onClick={() => setOpen(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Nein</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            <h1 className="text-3xl font-bold m-5">{name}</h1>
            <div className="stats shadow p-12">

                <div className="stat">
                    <div className="stat-title">Absenzen</div>
                    <div className="stat-value text-primary">{absences}</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Klasse</div>
                    <div className="stat-value text-secondary">{class_}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <div className="tooltip" data-tip={name}>
                            <div className="avatar online">
                                <div className="w-16 rounded-full">
                                    <img src={avatar} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        overLimit && (
                            <>
                                <div className="stat-value">{overLimit}</div>
                                <div className="stat-title">über dem Absenzen-Limit</div>
                                <div className="stat-desc text-secondary">31 tasks remaining</div>
                            </>
                        )
                    }
                </div>
            </div>
            <div className={styles.centeredDiv}>
                <div className="btn-group btn-group-vertical w-44 m-5 content-center">
                    <label htmlFor="absenz-eintragen-modal" className="btn">Absenz eintragen</label>
                    {absences < limit ? (
                        <button onClick={() => setOpen(true)} className="btn" type="button">
                            Meeting
                        </button>) : (
                        <button className="btn" onClick={openMail}>Meeting</button>
                    )}
                </div>
            </div>
            <input type="checkbox" id="absenz-eintragen-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Absenz eintragen</h3>
                    <div>
                        <input type="date" className="input input-bordered w-64 p-5 m-2" />
                        <input type="text" className="input input-bordered w-64 p-5 m-2" placeholder="Grund" />
                        <input type="text" className="input input-bordered w-64 p-5 m-2" placeholder="Lehrer" />
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-primary">Absenz eintragen</button>
                        <label htmlFor="absenz-eintragen-modal" className="btn">Schliessen</label>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <button className="btn btn-primary" onClick={() => {
                    setShowAbsences(!showAbsences);
                    setButtonText(showAbsences ? "Absenzen anzeigen" : "Absenzen verstecken");
                }
                }>{buttonText}</button>
            </div>
            {
                showAbsences && (
                    <div className="mt-10 mb-10">
                        <h1 className="text-3xl font-bold m-5">Absenzen</h1>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Datum</th>
                                        <th>Grund</th>
                                        <th>Lehrer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        absences_details.map((absence) => (
                                            <tr key={absence.id}>
                                                <th>{absence.id}</th>
                                                <td>{absence.date}</td>
                                                <td>
                                                    <select className="input input-bordered w-64 p-5 m-2" value={absence.reason}>
                                                        <option value="Anwesend">Anwesend</option>
                                                        <option value="Krankheit">Krankheit</option>
                                                        <option value="Ferien">Ferien</option>
                                                        <option value="Andere">Andere</option>
                                                    </select>
                                                </td>
                                                <td>{teacher}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
        </>
    )
}

export default Student
