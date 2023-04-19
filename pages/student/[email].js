import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Student from '@/components/Student'
import students from '@/data/students'

const SpecificStudent = () => {
    const router = useRouter();
    const { email } = router.query;

    const [student, setStudent] = useState(null);

    useEffect(() => {
        if (email) {
            const student = students.find(student => student.email === email);
            setStudent(student);
        }
    }, [email]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                {
                    student ? (
                        <div>
                            <h1 className="text-6xl font-bold">
                                {student.name}
                            </h1>
                            <Student avatar={student.avatar} name={student.name} teacher={student.teacher} email={student.email} class_={student.class} absences={student.absences} absences_details={student.absences_details} />
                        </div>
                    ) : (
                        <h1 className="text-6xl font-bold">
                            <progress className="progress w-56"></progress>
                        </h1>
                    )
                }
            </main>
        </div>
    );
}

export default SpecificStudent;
