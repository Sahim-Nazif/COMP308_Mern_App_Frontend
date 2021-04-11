import React, { useState,useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth/index'
import { Link } from 'react-router-dom'
import { createCourse } from './apiAdmin'
import axios from 'axios'


const AddCourse = ({history}) => {

    
    const {user, token } = isAuthenticated()
   
    const user_id=user._id
    
    const [values, setValues]=useState({
        courseCode:'',
        courseName:'',
        section:'',
        semester:'',
        createdCourse:'',
        loading: false,
        error: '',
        user_id:'',
        formData:''

    })
    const {
        courseCode,
        courseName,
        section,
        semester,
        loading,
        error,
        createdCourse,
         
        formData
    } = values;

    //destructure user and token from local storage


    const init=()=>{
      
       setValues({...values, formData:new FormData()})
       console.log(user_id)
        
    }
    useEffect(() => {

        init()

    }, [])

    
    const handleChange = name => event => {

        const value=event.target.value
        formData.set(name, value);
        setValues({ ...values, user_id, [name]: value });
        console.log(user_id)

    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        createCourse( token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    courseCode: '',
                    courseName: '',
                    section: '',
                    semester: '',
                    user_id:'',
                    loading: false,
                    createdCourse:courseName
                });
                history.push('/view/course')
            }
            

        });
    };
    
    const AddCourseForm = () => (

        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className='text-muted'>Course Code</label>
                <input onChange={handleChange('courseCode')} type='text' className='form-control' value={courseCode} autoFocus required />

            </div>
            <div className="form-group">
                <label className='text-muted'>Course Name</label>
                <input onChange={handleChange('courseName')} type='text' className='form-control' value={courseName} autoFocus required />

            </div>
            <div className="form-group">
                <label className='text-muted'>Section</label>
                <input onChange={handleChange('section')} type='number' className='form-control' value={section} autoFocus required />

            </div>
            <div className="form-group">
                <label className='text-muted'>Semester</label>
                <input onChange={handleChange('semester')}  type='number' className='form-control' value={semester} autoFocus required />

            </div>
            <button className='btn btn-dark'>Add Course</button>

        </form>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdCourse ? '' : 'none' }}>
            <h4>{`${createdCourse} is created`}</h4>
        </div>
    );

    const showError = () => {
        if (error) {
            return <h5 className='text-danger'>Category already exists</h5>
        }
    }
    const showLoading = () => (

        loading && (<div className='alert alert-success'><h3>Loading...</h3></div>)
    );

    const backToDashboard = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-dark">
                Back to Dashboard ?
            </Link>
        </div>
    );
    return (
        <Layout title='Add a new course' description={`Hello ${user.firstName}, you have  privilage to add course`} >

            <div className='row'>

                <div className="col-md-8 offset-md-2">
                   
                    {showError()}
                    {showSuccess()}
                    {showLoading()}
                    {AddCourseForm()}
                    {backToDashboard()}


                </div>
            </div>
        </Layout>

    )
}

export default AddCourse