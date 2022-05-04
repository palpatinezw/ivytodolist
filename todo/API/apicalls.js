import * as SecureStore from 'expo-secure-store';

const URL = "https://ivy.ri.edu.sg/api/v1/"

export async function apiGetCourses() {
    // console.log('Getting courses')
    var courses = []

    const N = 4;
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
            for (var i = 1; i <= N; i++) {
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
    }).then((res) => {
        // console.log(res)
        return res;
    }).catch(function(error) {
        console.log(error);
    })
    // logCourses()x
}