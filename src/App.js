import React from 'react';
import FormGenerator from './components/FormGenerator'
// import './App.css';
import './styles/app.scss'

const generateForm = [
  {
    name: "classId",
    label: "Select class",
    // required: true,
    type: "select",
  },
  {
    name: "role",
    label: "User Role",
    required: true,
    type: "select",
  },
  {
    name: "firstName",
    label: "First Name",
    required: true,
  },
  {
    name: "username",
    label: `Username`,
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    required: true,
    type: "password",
    showOnInput: true,
  },
  {
    name: "email",
    label: "Email Address",
    // required: true,
  },
  {
    name: "phone",
    label: "Phone Number",
    required: true,
  },
];

function App() {
  return (
    <div className="App">
      <FormGenerator
        // ref={registerUserRef}
        loading={false}
        formList={generateForm.slice(
          0,
          Math.floor(Math.random() * generateForm.length) + 1
        )}
        selectLists={{
          classId: [{ label: "Class 1", value: "Class 1" }],
          role: [
            {
              id: 2,
              label: "Student",
              value: "student",
            },
            {
              id: 2,
              label: "Teacher",
              value: "teacher",
            },
          ],
        }}
        defaultFormValues={{
          firstName: 'Daniel'
        }}
        onValidateSuccess={() => {}}
      />
    </div>
  );
}

export default App;
