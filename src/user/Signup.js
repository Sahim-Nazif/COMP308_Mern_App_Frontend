import React,{useState} from 'react'
import Layout from '../core/Layout'
import {signup} from '../auth/index'
import {Link} from 'react-router-dom'







const Signup=()=>{

    const [values, setValues]=useState({
        firstName:'',
        lastName:'',
        address:'',
        city:'',
        phoneNumber:'',
        studentNumber:'',
        program:'',
        email:'',
        password:'',
        error:'',
        success:false
    })

    const {firstName,lastName,address,city,phoneNumber,studentNumber,program, email, password, success,error}=values

    const handleChange=name=>event=>{

        setValues({...values,error:false, [name]:event.target.value})
    }


    const clickSubmit=(event)=>{
        setValues({...values, error:false})
        event.preventDefault()
        signup({firstName,lastName,address,city,phoneNumber,studentNumber,program, email ,password})
            .then(data=>{
                if (data.error){
                    setValues({...values, error: data.error, success:false})
                }
                else{
                    setValues({
                        ...values,
                            firstName:'',
                            lastName:'',
                            address:'',
                            city:'',
                            phoneNumber:'',
                            studentNumber:'',
                            program:'',
                            email:'',
                            password:'',
                            error:'',
                            success:true
                    })
                }
            
            })
        }

    const signUpForm=()=>(
        <form >
            <div className='form-group'>
                <label className='text-muted'>First Name</label>
                <input onChange={handleChange('firstName')} type='text' className='form-control'
                value={firstName} required/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Last Name</label>
                <input onChange={handleChange('lastName')} type='text' className='form-control'
                value={lastName}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Address</label>
                <input onChange={handleChange('address')} type='text' className='form-control'
                value={address}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>City</label>
                <input onChange={handleChange('city')} type='text' className='form-control'
                value={city}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Phone Number</label>
                <input onChange={handleChange('phoneNumber')} type='text' className='form-control'
                value={phoneNumber}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Student Number</label>
                <input onChange={handleChange('studentNumber')} type='text' className='form-control'
                value={studentNumber}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Program</label>
                <input onChange={handleChange('program')} type='text' className='form-control'
                value={program}/>
            </div>
     
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input onChange={handleChange('email')} type='email' className='form-control'
                value={email}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input onChange={handleChange('password')} type='password' className='form-control'
                value={password}/>
            </div>
            <button onClick={clickSubmit} className='btn btn-dark'>Sign up</button>
        </form>
    )

    const showError=()=>(
    
        <div className='alert alert-danger' style={{display:error ? '':'none'}}>
            {error}
        
        </div>
    )
    const showSuccess=()=>(
        <div className='alert alert-info' style={{display:success ? '':'none'}}>
            New account is created. Please <Link to='/signin'>Signin</Link>
        </div>
    )
    return (
        <Layout title='Sign up' description='Sign up to enroll in courses' className='container col-md-8 offset-md-2'>
           
           {showSuccess()}
           {showError()}
          {signUpForm()}
        </Layout>
        
        
        )

}

export default Signup