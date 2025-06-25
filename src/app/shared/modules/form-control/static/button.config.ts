export const AuthButtonControls = {
  loginButton: {
    type: 'submit',
    buttonText: 'Login',
    color: 'primary',
    class: 'btn-login',
    matStrokedButton: false,
    displayIcon: false
  },
  registerButton: {
    type: 'submit',
    buttonText: 'Register',
    color: 'primary',
    class: 'btn-login',
    matStrokedButton: false,
    displayIcon: false
  }
}

export const LoginFormControls = {
  usernameField: {
    key: 'username',
    label: 'Username',
    inputType: 'text',
    errorData: [
      { errorType: 'required', errorMsg: 'Username is required' },
    ],
  },
  passwordField: {
    key: 'password',
    label: 'Password',
    inputType: 'password',
    errorData: [
      { errorType: 'required', errorMsg: 'Password is required' },
    ],
    displayIcon: true,
    iconName: 'visibility',
  },
  roleField: {
    key: 'role',
    label: 'Role',
    errorData: [
      { errorType: 'required', errorMsg: 'Role is required' }
    ],
    dropdownData: [
      { value: 'Student', label: 'Student' }
    ]
  }
};
export const CourseSearchControls = {
  searchField: {
    key: 'searchText',
    label: 'Search Courses',
    inputType: 'text',
    placeholder: 'Search by name or department',
    displayIcon: false,
  }
};

export const CourseFormControls = {
  courseName: {
    key: 'courseName',
    label: 'Course Name',
    inputType: 'text',
    placeholder: 'Enter course name',
    errorData: [
      { errorType: 'required', errorMsg: 'Course name is required' },
      { errorType: 'minlength', errorMsg: 'Minimum 3 characters required' }
    ],
  },
  department: {
    key: 'department',
    label: 'Department',
    inputType: 'text',
    placeholder: 'Enter department',
    errorData: [
      { errorType: 'required', errorMsg: 'Department is required' }
    ]
  },
  content: {
    key: 'content',
    label: 'Course Content',
    inputType: 'text',
    placeholder: 'Enter course content',
    errorData: [
      { errorType: 'required', errorMsg: 'Content is required' },
      { errorType: 'minlength', errorMsg: 'Minimum 5 characters required' }
    ],
    rows: 4
  },
  credits: {
    key: 'credits',
    label: 'Credits',
    inputType: 'number',
    placeholder: 'Enter credits',
    errorData: [
      { errorType: 'required', errorMsg: 'Credits required' },
      { errorType: 'min', errorMsg: 'Minimum value must be 1' }
    ]
  },
  courseImage: {
    key: 'courseImage',
    label: 'Upload Image',
    imageUploadInfo: 'Only .jpg, .png under 2MB allowed',
    previewUrl: '',
  }
};

export const CourseFormButton = {
  saveButton: {
    buttonText: 'Save',
    type: 'submit',
    color: 'primary',
    class: 'course-btn',
    matStrokedButton: false,
    displayIcon: false
  }
};
