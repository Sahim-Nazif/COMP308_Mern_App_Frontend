import React from 'react'
import '../styles.css'



const Table = ({student}) => {

  
    return (
        <div className='container studentTable'>
        <table class="table table-bordered table-stripped mr-3">
            <thead className='thead-dark' >
                <tr >
                 
                    <th >First Name</th>
                    <th >Last Name</th>
                    <th >Phone Number</th>
                    <th >Program</th>
                    <th >Email</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.phoneNumber}</td>
                    <td>{student.program}</td>
                    <td>{student.email}</td>
                </tr>
         
            </tbody>
        </table>
        </div>
    )
}


export default Table