import { useEffect, useState } from "react";
import useInput from "../hooks/use-simple-input";


const isNotNull = (name) =>{
  if(name.trim() === ''){
    return false;
  }
  return true;
}

const isEmail = (email) => {
  let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.match(validRegex)) {
    return true;
  } 
  return false;
}

const BasicForm = (props) => {
  const [formIsValid, setFormIsInvalid] = useState(false);

  const {
    value: valueFirstName,
    valueChangeHandler: firstNameChangeHandler,
    valueBlurHandler: firstNameBlurChangeHandler,
    isValid: validFirstName,
    hasError: firstNameHasError,
    reset: resetFirstName,
  } = useInput(value => isNotNull(value));

  const{
    value: valueLastName,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurChangeHandler,
    isValid: validLastName,
    hasError: lastNameHasError,
    reset: resetLastName,
  } = useInput(value => isNotNull(value));

  const{
    value: valueEmail,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurChangeHandler,
    isValid: validEmail,
    hasError: emailHasError,
    reset: resetEmail,
  } = useInput(value => isEmail(value));

  useEffect(() =>{
    if(!validFirstName && !validLastName && !validEmail){
      setFormIsInvalid(false);
    }
    else{
      setFormIsInvalid(true);
    }
  },[validFirstName,validLastName,validEmail])

  const submitFormHandler = (event) =>{
    event.preventDefault();

    if(firstNameHasError && lastNameHasError && emailHasError){ 
      return;
    }
    resetFirstName();
    resetLastName();
    resetEmail();
  }

  const firstNameClasses = firstNameHasError ? 'form-control invalid' : 'form-control';
  const lastNameClasses = lastNameHasError ? 'form-control invalid' : 'form-control';
  const emailClasses = emailHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={submitFormHandler}>
      <div className='control-group'>
        <div className={firstNameClasses}>
          <label htmlFor='first-name'>First Name</label>
          <input 
            type='text'
            id='first-name'
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurChangeHandler}
            value={valueFirstName} />
            {firstNameHasError &&  <p className="error-text">Please write a valid name</p>}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor='name'>Last Name</label>
          <input 
            type='text'
            id='name'
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurChangeHandler} 
            value={valueLastName}/>
            {lastNameHasError &&  <p className="error-text">Please write a valid name</p>}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input 
          type='text'
          id='name'
          onChange={emailChangeHandler}
          onBlur={emailBlurChangeHandler} 
          value={valueEmail}/> 
          {emailHasError &&  <p className="error-text">Please write a valid email</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
