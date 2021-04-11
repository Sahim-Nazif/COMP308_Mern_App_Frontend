

export const getStudents=()=>{

    return fetch (`${process.env.REACT_APP_API_URL}/user/students`, {

        method:'GET'

    })  
    .then(response=>{
        return response.json();
    })
    .catch(err =>console.log(err))
}

export const getCourses=()=>{
    
    return fetch (`${process.env.REACT_APP_API_URL}/course/list`, {

        method:'GET'

    })  
    .then(response=>{
        return response.json();
    })
    .catch(err =>console.log(err))

}