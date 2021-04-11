import React, { useState, useEffect } from 'react'
import { getStudents } from '../core/apiCore'
import Layout from '../core/Layout'
import Table  from '../core/Table'




const AllStudents = () => {

    const [values, setStudents] = useState({
        
        students:[]
    
    })

    const {students}=values;
    const [error, setError] = useState(false)

    const loadStudents = () => {


        getStudents().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setStudents({students:data})
            }
        })
    }
    useEffect(() => {
        loadStudents()
    }, [])

    return (

        <Layout title='All Students' description='All Students Enrollment'>
            <div className='col-9'>
            {students.map((student, index) => (<Table key={index} student={student} />))}
             
            </div>
         
        </Layout>
    )


}


export default AllStudents