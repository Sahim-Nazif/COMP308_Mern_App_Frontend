import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {deleteCourse} from '../admin/apiAdmin'
import {isAuthenticated} from '../auth/index'


const Card=({course})=>{
 
    
    const [error, setError]=useState(false)
    const {user, token}=isAuthenticated()
    const destroy=courseId=>{

        deleteCourse(courseId, user._id,token).then(data=>{
            window.location.reload()
            if (data.error){
                console.log(error)
            }else{
                console.log(data)
            }
        })
    }


    return ( 

        <div className='col-4 mb-3'>
           
        <div className='card'>
            <strong><div className="card-header text-dark">{course.courseName}</div></strong>
            <div className="card-body">
              
                <p>Course Code: {course.courseCode}</p>
                <p>Section: {course.section}</p>
                <p>You are Currently in: {course.semester} semester</p>
                <p>Student Name: {user.firstName }  {user.lastName}</p>
       
                <Link to={`/admin/course/update/${course._id}`}>
                    <button className='btn btn-info mt-2 mb-2 mr-2'>Update</button>
                </Link>
                <Link to={`/view/students`}>
                    <button className='btn btn-warning mt-2 mb-2 mr-2'>Entrollment</button>
                </Link>
                <button onClick={()=>destroy(course._id)} className='btn btn-danger mt-2 mb-2'>Drop Course</button>
            </div>
        </div>

    </div>
    )
}

export default Card