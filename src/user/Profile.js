import React,{useState, useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth/index'
import  {Redirect} from 'react-router-dom'
import {read, update, updateUser} from './apiUser'



const Profile=({match})=>{

    const [values, setValues]=useState({

        firstName:'',
        lastName:'',
        address:'',
        city:'',
        phoneNumber:'',
        studentNumber:'',
        program:'',
        email:'',
        
        error:'',
        success:false
    })

    const {firstName, lastName, address, city, phoneNumber, studentNumber, program, email,  error, success}=values

    const {token}=isAuthenticated()

    const init=userId=>{
        
        read(userId,token).then(data=>{

            if (data.error) {
                setValues({...values, error:true})
            } else{
                setValues({...values,
                              firstName:data.firstName,
                              lastName:data.lastName,
                            address:data.address,
                            city:data.city,
                            phoneNumber:data.phoneNumber,
                            studentNumber:data.studentNumber,
                            program:data.program,
                            email:data.email
                            })
                         
            }
        })

    }

    useEffect(()=>{
        init(match.params.userId);
    },[])

    const handleChange=name=>e=>{

       setValues({...values,error:false,[name]:e.target.value})

    }

     const clickSubmit=event=>{

        event.preventDefault()
        update(match.params.userId,token,{firstName, lastName, address, city, phoneNumber, studentNumber, program, email})
                .then(data=>{
                    if (data.error) {
                        console.log(error)
                    } else{
                        updateUser(data, ()=>{
                            setValues({...values, firstName:data.firstName,
                                lastName:data.lastName,
                              address:data.address,
                              city:data.city,
                              phoneNumber:data.phoneNumber,
                              studentNumber:data.studentNumber,
                              program:data.program,
                              email:data.email,
                            success:true })
                        })
                    }
                })
     }

     const redirectUser=(success)=>{
         if (success) {
            return  <Redirect to='/admin/dashboard'/>
         }

     }

    const profileUpdate=(firstName, lastName, address, city, phoneNumber, studentNumber, program, email)=>(
        
        <form>
            <div className='form-group'>
                <label className='text-muted'>First Name</label>
                <input type='text' onChange={handleChange('firstName')} className='form-control' value={firstName}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Last Name</label>
                <input type='text' onChange={handleChange('lastName')} className='form-control' value={lastName}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Address</label>
                <input type='text' onChange={handleChange('address')} className='form-control' value={address}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>City</label>
                <input type='text' onChange={handleChange('city')} className='form-control' value={city}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Phone Number</label>
                <input type='text' onChange={handleChange('phoneNumber')} className='form-control' value={phoneNumber}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Student Number</label>
                <input type='text' onChange={handleChange('studentNumber')} className='form-control' value={studentNumber} readOnly/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Program</label>
                <input type='text' onChange={handleChange('program')} className='form-control' value={program}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Email Address</label>
                <input type='text' onChange={handleChange('email')} className='form-control' value={email} readOnly/>
            </div>
            <button onClick={clickSubmit} className='btn btn-dark'>Update Now</button>
        </form>
        
        )
        return (  

            <Layout title='Upate Profile' description='Student Course Entrollment App' className='container-fluid'>
                <div className='row'>

                <div className="col-md-8 offset-md-2">
            {profileUpdate(firstName, lastName, address, city, phoneNumber, studentNumber, program, email)}
            {redirectUser(success)}

            </div>
            </div>
            </Layout>
        )
}

export default Profile