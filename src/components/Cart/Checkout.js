import { useRef, useState } from 'react';
import classes from './Checkout.module.css';


const isEmpty = (value) =>{
    return value.trim().length === 0 
}

const isFiveChars = (value) =>{

    return value.trim().length === 5;
}

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name : true,
    street : true,
    city: true,
    postalCode: true
  })
  const nameInput = useRef();
  const streetInput = useRef();
  const postalInput = useRef();
  const cityInput = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();


    const enteredName = nameInput.current.value;
    const enteredStreet = streetInput.current.value 
    const enteredPostalCode = postalInput.current.value 
    const enteredCity = cityInput.current.value 

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isFiveChars(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);


    setFormInputValidity({
        name:enteredName,
        street:enteredStreet,
        city:enteredCity,
        postalCode:enteredPostalCode
    })

    console.log(enteredPostalIsValid)
    const formIsValid = 
        enteredNameIsValid &&
        enteredStreetIsValid &&
        enteredPostalIsValid &&
        enteredCityIsValid;

    if(!formIsValid){
        return;
    }
    
    props.onConfirm({
        name: enteredName,
        street:enteredStreet,
        city: enteredCity,
        postal: enteredPostalCode
    });
  };

  const nameControlClasses = `${classes.control}  ${formInputValidity.name ? '' : classes.invalid}`
  const streetControlClasses = `${classes.control}  ${formInputValidity.street ? '' : classes.invalid}`
  const postalControlClasses = `${classes.control}  ${formInputValidity.postalCode ? '' : classes.invalid}`
  const cityControlClasses = `${classes.control}  ${formInputValidity.city ? '' : classes.invalid}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInput}/>
        {!formInputValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInput}/>
        {!formInputValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInput}/>
        {!formInputValidity.postalCode && <p>Please enter a valid postal code (5 characteres).</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInput}/>
        {!formInputValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;