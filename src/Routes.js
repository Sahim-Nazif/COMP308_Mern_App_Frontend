import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'
import Menu from './core/Menu'
import AdminRoute from './auth/AdminRoute'
import AdminDashboard from './user/AdminDashboard'
import AddCourse from './admin/addCourse'
import ViewCourses from './user/ViewCourses'
import AllStudents from './user/AllStudents'
import UpdateCourse from './admin/UpdateCourse'
import Profile from './user/Profile'
import UserDetails from './user/UsersDetails'
const Routes=()=>{

    return (
        <BrowserRouter>
            <Menu/>
            <Switch>
            <Route path='/signin' exact component={Signin}/>
                <Route path='/signup' exact component={Signup}/>
                <Route path='/' exact component={Home} />
                <AdminRoute path='/create/course' exact component={AddCourse}/>
                <AdminRoute path='/view/students' exact component={AllStudents}/>
                <AdminRoute path='/view/course' exact component={ViewCourses}/>
                <AdminRoute path='/admin/course/update/:courseId' exact component={UpdateCourse}/>
                <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
                <AdminRoute path='/profile/:userId' exact component={Profile} />
                <AdminRoute path='/view/details' exact component={UserDetails}/>
            </Switch>
            </BrowserRouter>
        
        
        
        )
}


export default Routes