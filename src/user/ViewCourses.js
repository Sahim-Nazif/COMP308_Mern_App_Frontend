import React, { useState, useEffect } from 'react'
import { getCourses } from '../core/apiCore'
import Layout from '../core/Layout'
import Card from '../core/Card'




const ViewCourses = () => {

    const [values, setCourses] = useState({ 
        
       
           courses:[]
        
        })

        const {courses}=values;
    const [erorr, setError] = useState(false)

    const loadCourses = () => {


        getCourses().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCourses({courses:data})
            }
        })
    }
    useEffect(() => {
        loadCourses()
    }, [])
    return (

        <Layout title='My Courses' description='Student Enrollment'>
             <h3 className='text-center text-info mb-4'>Total Entrollment in {courses.length} courses</h3>
             <hr/>
            <div className='row'>
                {courses.map((course, index) => (<Card key={index} course={course} />))}

            </div>
        </Layout>
    )


}


export default ViewCourses