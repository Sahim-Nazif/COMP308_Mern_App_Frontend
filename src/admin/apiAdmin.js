

export const createCourse = ( token, course) => {
    return fetch(`${process.env.REACT_APP_API_URL}/course/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
           
            Authorization: `Bearer ${token}`
        },
        body:course
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err.toString());
        });
};

export const deleteCourse=(courseId, userId,token)=>{

    return fetch(`${process.env.REACT_APP_API_URL}/course/delete/${courseId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
       
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err.toString());
        });
}

export const getCourse=(courseId)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/${courseId}`, {
        method: 'GET'
    
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err.toString());
        });
}

export const updateCourse=(courseId, userId, token, course)=>{


    return fetch(`${process.env.REACT_APP_API_URL}/course/update/${courseId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            
            //'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
       body:course
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err.toString());
        });
}




