import React from 'react'
import Layout from './Layout'
import { isAuthenticated } from '../auth/index'
import image from '../mask.png'



const Home = ({history}) => {


    return (

        <Layout title='Home Page' description='Student Course Entrollment App' className='container-fluid'>
            <div className='container text-center mb-5 jumbotran'>
                {isAuthenticated() && (
                    <>
                        <div className="card col-3 " style={{width: '20rem', justifyContent:'center'}}>
                            <img className="card-img-top" src={image} alt="student"/>
                                <div className="card-body">
                                    <h6 className="card-title">COMP 308 Section 003 MERN App</h6>
                                    <p className="card-text text-info">Welcome {isAuthenticated().user.firstName}</p>
                                    <button onClick={()=>history.push('/admin/dashboard')} class="btn btn-dark text-info">Get Started</button>
                                </div>
                        </div>
                         
                </>
            )}
            {!isAuthenticated() && (

                            <>
                             <div className="card col-3" style={{width: '20rem'}}>
                            <img className="card-img-top" src={image} alt="student"/>
                                <div className="card-body">
                            
                                    <h6 className="card-title">COMP 308 Section 003 MERN App</h6>
                                    <strong >Winter 2021- Assignment 03</strong>
                                    <p className='mt-4'>Sign up to enroll in courses</p>
                                    <button onClick={()=>history.push('/signup')} class="btn btn-dark"  style={{color:'#ff9900'}}>Get Started</button>
                                </div>
                        </div>
                               
                              
                            </>
                        )}


                    </div>
          
        </Layout>

        )
}


export default Home