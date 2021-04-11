import React, { useState,useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth/index'
import { Link } from 'react-router-dom'
import { getCourse,updateCourse } from './apiAdmin'



const UpdateCourse = ({history,match}) => {

    
    const { user, token } = isAuthenticated()
   
    const [values, setValues]=useState({
        courseCode:'',
        courseName:'',
        section:'',
        semester:'',
        createdCourse:'',
        loading: false,
        error: '',
      
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

    const initi=(courseId)=>{

        getCourse(courseId).then(data=>{
            if (data.error) {
                setValues({...values, error:data.error})
            } else{
                setValues({...values,
                                courseCode:data.courseCode,
                                courseName:data.courseName,
                                section:data.section,
                                semester:data.semester,
                                formData:new FormData()
                             })
               init()
            }
            
            
        }) 

        
    }
    const init=()=>{
      
       setValues({ formData:new FormData()})
        
    }


    useEffect(() => {

        initi(match.params.courseId)

    }, [])

    
    const handleChange = name => event => {

        const value=event.target.value
        formData.set(name, value);
        setValues({ ...values, [name]: value });

    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        updateCourse(match.params.courseId, user._id,token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    courseCode: '',
                    courseName: '',
                    section: '',
                    semester: '',

                    loading: false,
                    createdCourse: data.firstName
                });
                history.push('/view/course')
            }
            

        });
    };
    

    const updateCourseForm = () => (

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
            <button className='btn btn-dark'>Update Now</button>

        </form>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdCourse ? '' : 'none' }}>
            <h4>{`${createdCourse} is updated`}</h4>
        </div>
    );

    const showError = () => {
        if (error) {
            return <h5 className='text-danger'>Could not update your section try later</h5>
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
        <Layout title='Update Your Course' description={`Hey ${user.firstName}, you have  privilage to update your course`} >

            <div className='row'>

                <div className="col-md-8 offset-md-2">
                   
                    {showError()}
                    {showSuccess()}
                    {showLoading()}
                    {updateCourseForm()}
                    {backToDashboard()}


                </div>
            </div>
        </Layout>

    )
}

export default UpdateCourse 