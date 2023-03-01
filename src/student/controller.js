const pool = require("../../config/db");
const queries = require("./queries");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const getStudents = (req, res) => {
  pool.query(queries.getStudentsQuery, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getStudenyById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudenyById_Que, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;

  pool.query(queries.checkEmailExists, [email], (error, results) => {
    // check if the email exist

    if (results.rows.length) {
      res.status(400).send({ message: "Email already exists" });
    }

    // add student to the db
    pool.query(
      queries.addStudent,
      [name, email, age, dob],
      (error, results) => {
        if (error) throw error;
        res.status(201).send({ message: "Student Created Succesfully!!" });
      }
    );
  });
};

const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudenyById_Que, [id], (error, results) => {
    const noStudentFound = !results.rows.length;

    if (noStudentFound) {
      res.status(400).send({ message: "Student already exist !!" });
    }

    // else
    pool.query(queries.deleteStudent, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send({ message: "Student removed successfully !!" });
    });
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  pool.query(queries.getStudenyById_Que, [id], (error, results) => {
    const noStudentFound = !results.rows.length;

    if (noStudentFound) {
      res.send("Student does not exist in the database");
    }

    pool.query(queries.updateStudent, [name, id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Student updated successfully");
    });
  });
};

const register = async (req, res) => {
  const { name, email, age, dob, password, password2 } = req.body;
  console.log({
    name,
    email,
    age,
    dob,
    password,
    password2,
  });

  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ message: "Please enter all the fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Password should be at least 6 characters" });
  }

  if (password != password2) {
    errors.push({ message: "Password doesn't match" });
  }

  if (errors.length > 0) {
    res.status(400).send(errors[0]);;
  } else {
    // form validation is passed

    let hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    pool.query(queries.checkEmailExists, [email], (error, results) => {
      // check if the email exist

      if (results.rows.length) {
        errors.push({ message: "Email is already exists !!" });
        return res.status(400).send(errors[0]);
      }

      // add student to the db
      pool.query(
        queries.addStudent,
        [name, email, age, dob, hashedPassword],
        async(error, results) => {
          if (error) throw error;
           // JWT token
    const token = await JWT.sign(
      {
        password,
      },
      "knjknknjknkjnknkjnjknkjnkjnkjnknknkjnjknkjnkjnjknk",
      {
        expiresIn: 5000,
      }
    );
          res.status(201).send({ message: "Student Created Succesfully!!" ,token : token });
          console.log(results);
        }
      );
    });

   
    
   
  }
};

const login = (req, res) => {
  const {email ,password} = req.body;
  let errors = [];

  // Check email exist
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if(results.rows.length  === 0){
      errors.push({ message: "Invalid Email Id" });
      return res.status(400).send(errors[0]);
    }
   
    // Now get the password from the db 

   
    pool.query(queries.getPassword ,[email] ,async(error,results)=>{
      
      let passDB = results.rows[0].password ;
      console.log(passDB);
      
      let ismatch = await bcrypt.compare(password ,passDB);
      console.log(ismatch)

      if(!ismatch){
        errors.push({ message: "Invalid Password !" });
        return res.status(400).send(errors[0]);
      }
      const token = await JWT.sign(
        {
          password,
        },
        "knjknknjknkjnknkjnjknkjnkjnkjnknknkjnjknkjnkjnjknk",
        {
          expiresIn: 5000,
        }
      );

      res.json({token})
    })

  

  })



  // bcrypt.compare(password)
  
};

const dashboard = (req, res) => {
  return res.send("Dashboard !!");
};

module.exports = {
  getStudents,
  getStudenyById,
  addStudent,
  deleteStudent,
  updateStudent,
  register,
  login,
  dashboard,
};
