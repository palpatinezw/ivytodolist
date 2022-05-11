import * as SecureStore from 'expo-secure-store';

const URL = "https://ivy.ri.edu.sg/api/v1/"

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}
export async function submitToken(token) {
    await save('token', token);
}

export async function apiGetCourses(N = 4) {
    // console.log('Getting courses')
    var courses = []

    var fetches = []
    return SecureStore.getItemAsync('token').then((tkn) => {
      return tkn;
    }).then(async(tkn) => {
      
      for (var i = 1; i <= N; i++) {
        // console.log(URL+`courses?page=${i}&enrollment_state=active`)
        
        fetches.push(
          fetch(URL+`courses?page=${i}&enrollment_state=active`, {
            headers: {
              'Authorization' : `Bearer ${tkn}`
            }
          }).then((response) => {
            if (response == null) return []
            return response.json()
          }).then((responseData) => {
            // console.log(i);
            return responseData;
            //logCourses()
          }).catch(function(error) {
            console.log(error);
          })
        )
      }

    }).then(() => {
        
        return Promise.all(fetches).then((values) => {
      // setLoading(false)
            var temp = []
            
            // console.log("VALUES")
            // console.log(values)
            for (var i = 0; i < N; i++) {
                if (values[i] == null) continue;
                for (var j = 0; j < values[i].length; j++) {
                    temp.push(values[i][j]);
                }
            }
            // console.log(temp)

            return temp;
        
        // debugcounter+=1
        // for (var i = 0; i < courses.length; i++) {
        //   console.log(courses[i].course_code)
        // }
        
        })
    }).catch(function(error) {
        console.log(error);
    })
    // logCourses()x
}

export async function apiGetTasks(courseCode, taskSource) {
    //expect taskSource as boolean array [modules, assignments, announcements], order tbc
    var fetches = []

    return SecureStore.getItemAsync('token').then((tkn) => {
        return tkn;
    }).then(async(tkn) => {
        if (taskSource[0] > 0) {
            fetches.push(
                fetch(URL+`courses/${courseCode}/modules`, {
                    headers: {
                        'Authorization' : `Bearer ${tkn}`
                    }
                }).then((response) => {
                    if (response == null) return []
                    return response.json()
                }).then((responseData) => {
                    // console.log(i);
                    return responseData;
                    //logCourses()
                }).catch(function(error) {
                    console.log(error);
                })
            )
        }
        if (taskSource[1] > 0) {
            fetches.push(
                fetch(URL+`courses/${courseCode}/assignments`, {
                    headers: {
                        'Authorization' : `Bearer ${tkn}`
                    }
                }).then((response) => {
                    if (response == null) return []
                    return response.json()
                }).then((responseData) => {
                    // console.log(i);
                    return responseData;
                    //logCourses()
                }).catch(function(error) {
                    console.log(error);
                })
            )
        }
        if (taskSource[2] > 0) {
            fetches.push(
                fetch(URL+`announcements?context_codes=courses_${courseCode}`, {
                    headers: {
                        'Authorization' : `Bearer ${tkn}`
                    }
                }).then((response) => {
                    if (response == null) return []
                    return response.json()
                }).then((responseData) => {
                    // console.log(i);
                    return responseData;
                    //logCourses()
                }).catch(function(error) {
                    console.log(error);
                })
            )
        }
    }).then(() => {
        return Promise.all(fetches).then((values) => {
            var temp = []
            
            // console.log("VALUES")
            // console.log(values)
            for (var i = 0; i < values.length; i++) {
                if (values[i] == null) continue;
                for (var j = 0; j < values[i].length; j++) {
                    temp.push(values[i][j]);
                }
            }
            return temp;
        })
    }).catch(function(error) {
        console.log(error);
    })

}