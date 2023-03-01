const getStudentsQuery = "SELECT * FROM students";
const getStudenyById_Que = "SELECT * FROM students WHERE id = $1";
const checkEmailExists = "SELECT s FROM students s WHERE s.email = $1";
const getPassword = "SELECT password FROM students WHERE email =$1";
const addStudent = "INSERT INTO students (name, email ,age ,dob , password) VALUES ($1 , $2 , $3 ,$4 ,$5)";
const deleteStudent = "DELETE FROM students WHERE id = $1";
const updateStudent = "UPDATE students SET name = $1 WHERE id = $2";

module.exports ={
    getStudentsQuery,
    getStudenyById_Que,
    checkEmailExists,
    addStudent,
    deleteStudent,
    updateStudent,
    getPassword
}