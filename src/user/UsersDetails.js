import React,{useState,useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth/index'
import  {Link} from 'react-router-dom'
import { getStudents } from '../core/apiCore'


const UsersDetails=()=>{


    const [students, setStudents] = useState([])
    const [error, setError] = useState(false)


    const loadStudents = () => {


        getStudents().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setStudents(data)
            }
        })
    }
    useEffect(() => {
        loadStudents()
    }, [])
    const {user:{_id, firstName, lastName,address,city,phoneNumber, studentNumber, program, email, role}}= isAuthenticated()


    const usersDetails=()=>{
        return (
            <div className='card'>
                <h4 className='card-header'>Students</h4>
                <ul className='list-group-item'>
                <li className='list-group-item'>
                 <div className='col-9'>
                    
                 {students.map((student,index)=>(<a href={`/user/${student._id}`} className='nav-link' key={student._id}
                        >
                      {student.firstName} {student.lastName}</a> ))}
             
                 </div>
                    <Link className='nav-link' to='/create/course'>Add Course</Link>
                    </li>
                  
              
            </ul>
            </div>
        )
    }

    const userInfo=()=>{
        return (
            
            <div className='card mb-5'>
            <h3 className='card-header'>Student Information</h3>
            <ul className='list-group-item'>
                 <li className='list-group-item'>{firstName}</li>
                <li className='list-group-item'>{lastName}</li>
                <li className='list-group-item'>{address}</li>
                <li className='list-group-item'>{city}</li>
                <li className='list-group-item'>{phoneNumber}</li>
                <li className='list-group-item'>{studentNumber}</li>
                <li className='list-group-item'>{program}</li>
                <li className='list-group-item'>{email}</li>
                <li className='list-group-item'>{role===1 ? 'Student' :'Registered User'}</li>
            </ul>
        </div>
            )
    }


    return (
        <>
        <Layout title='Dashboard' description={`Hello ${firstName} ${lastName}`} className='container'>

            <div className='row'>
                <div className="col-3">
                    {usersDetails()}
                </div>
                <div className="col-9">
                    {userInfo()}
                
                </div>
            </div>
       </Layout>
       </>
    )
}


export default  UsersDetails