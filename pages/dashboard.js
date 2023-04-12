import styles from '../styles/Dashboard.module.css'
import students from '../data/students.json'
import classes from '../data/classes.json'
import UserContext from '@/context/UserContext'
import Student from '@/components/Student'
import { useRouter } from 'next/router'
import { useState, useEffect, useContext } from 'react'

const Dashboard = () => {
    const [currentTab, setCurrentTab] = useState('student')
    const [content, setContent] = useState('')
    const [count, setCount] = useState(0)
    const [selectedStudent, setSelectedStudent] = useState(null)
    const { user } = useContext(UserContext)
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/')
        }
    }, [])

    useEffect(() => {
        let absenceCount = 0
        students.map((student) => {
            absenceCount += Number(student.absences)
        })

        setCount(absenceCount)

        if (currentTab === 'student') {
            setContent(
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>Name</th>
                                <th>Class</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.name}>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={student.avatar} alt={student.name} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{student.name}</div>
                                                <div className="text-sm opacity-50">Switzerland</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {student.class}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">{student.teacher}</span>
                                    </td>
                                    <td>{student.email}</td>
                                    <td>
                                        <button
                                            className="btn btn-ghost btn-xs"
                                            onClick={() => {
                                                console.log(`Before: ${currentTab}`)
                                                setSelectedStudent(student)
                                                setCurrentTab('details')
                                                console.log(`After: ${currentTab}`)
                                            }}
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Class</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )
        } else if (currentTab === 'classes') {
            setContent(
                <div className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {classes.map((classItem) => (
                        <button
                            key={classItem.class_name}
                            aria-current="true"
                            type="button"
                            className="w-full px-4 py-2 font-medium text-left text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-pointer focus:outline-none dark:bg-gray-800 dark:border-gray-600"
                        >
                            {classItem.class_name}
                        </button>
                    ))}
                </div>
            )
        } else if (currentTab === 'details') {
            setContent(
                <Student
                    absences={selectedStudent.absences}
                    avatar={selectedStudent.avatar}
                    class_={selectedStudent.class}
                    name={selectedStudent.name}
                    teacher={selectedStudent.teacher}
                    absences_details={selectedStudent.absences_details}
                    email={selectedStudent.email}
                />
            );
        }  else if (currentTab === 'absences') {
            setContent(
                <div className="stats shadow">

                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </div>
                        <div className="stat-title">Absenzen (Insgesamt)</div>
                        <div className="stat-value text-primary">25'623</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <div className="stat-title">Absenzen (Monat)</div>
                        <div className="stat-value text-secondary">{count}</div>
                    </div>

                </div>
            )
        }
    }, [currentTab])

    return (
        <div className={styles.container}>
            <div className="border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="mr-2">
                        <button onClick={() => {
                            setCurrentTab('student')
                        }} className={`inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${currentTab === 'student' ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 group' : 'group'}`}>
                            <svg aria-hidden="true" className={`w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 ${currentTab === 'student' ? 'dark:text-gray-300' : 'dark:text-gray-500 dark:group-hover:text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>Schüler
                        </button>
                    </li>
                    <li className="mr-2">
                        <button onClick={() => {
                            setCurrentTab('classes')
                        }} className={`inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${currentTab === 'classes' ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 group' : 'group'}`}>
                            <svg aria-hidden="true" className={`w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 ${currentTab === 'classes' ? 'dark:text-gray-300' : 'dark:text-gray-500 dark:group-hover:text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>Klassen
                        </button>
                    </li>
                    <li className="mr-2">
                        <button onClick={() => {
                            setCurrentTab('absences')
                        }} className={`inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${currentTab === 'absences' ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 group' : 'group'}`}>
                            <svg aria-hidden="true" className={`w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 ${currentTab === 'absences' ? 'dark:text-gray-300' : 'dark:text-gray-500 dark:group-hover:text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 012-2h8a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V3zm2 0v14h8V3H6zm2 2a1 1 0 100 2h4a1 1 0 100-2H8z" clipRule="evenodd"></path></svg>Absenzen
                        </button>
                    </li>
                </ul>
            </div>
            <div className="flex flex-col flex-1 mt-5">
                {content}
            </div>
        </div>
    )
}

export default Dashboard
