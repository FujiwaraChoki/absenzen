import styles from '../styles/Dashboard.module.css'
import students from '../data/students.json'
import Link from 'next/link'
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
                                <th>Klasse</th>
                                <th>E-Mail</th>
                                <th>Absenzen</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.name}>
                                    <td>
                                        <Link className="flex items-center space-x-3" href={`/student/${student.email}`}>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={student.avatar} alt={student.name} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{student.name}</div>
                                                <div className="text-sm opacity-50">Switzerland</div>
                                            </div>
                                        </Link>
                                    </td>
                                    <td>
                                        {student.class}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">{student.teacher}</span>
                                    </td>
                                    <td>{student.email}</td>
                                    <td>
                                        {
                                            student.absences_details > 40 ? (
                                                <span className="badge badge-error">{student.absences}</span>
                                            ) : (
                                                <span className="badge badge-success">{student.absences}</span>
                                            )
                                        }
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
        } else if (currentTab === 'details') {
            <Student student={selectedStudent} />
        }
    }, []);

    return (
        <div className={styles.container}>
            <div className="flex flex-col flex-1 mt-5">
                {content}
            </div>
        </div>
    )
}

export default Dashboard
