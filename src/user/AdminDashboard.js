import React from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth/index'
import  {Link} from 'react-router-dom'

const AdminDashboard=()=>{

    const {user:{_id, firstName, lastName,address,city,phoneNumber, studentNumber, program, email, role}}= isAuthenticated()

    const adminLinks=()=>{
        return (
            <div className='card'>
                <h4 className='card-header bg-dark ' style={{color:'#ff9900'}}>Student Links</h4>
                <ul className='list-group-item'>
                <li className='list-group-item'>
                    <Link className='nav-link' to='/create/course'>Add Course</Link>
                    </li>
                    <li className='list-group-item'>
                    <Link className='nav-link' to='/view/course'>View Courses</Link>
                    </li>
                <li className='list-group-item'>
                    
                    <Link className='nav-link' to='/view/students'>All Students</Link>
                </li>
              
                <li className='list-group-item'>
                    <Link className='nav-link' to={`/profile/${_id}`}>Update Profile</Link>
                </li>
              
           
            </ul>
            </div>
        )
    }

    const adminInfo=()=>{
        return (
            
            <div className='card mb-5'>
            <h3 className='card-header bg-dark ' style={{color:'#ff9900'}}>Student Information</h3>
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
                    {adminLinks()}
                </div>
                <div className="col-9">
                    {adminInfo()}
                
                </div>
            </div>
       </Layout>
       </>
    )
}


export default  AdminDashboard