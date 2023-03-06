import { useState } from 'react';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import classes from './AddUser.module.css';
import ErrorModal from '../UI/Modal/ErrorModal'

const AddUser = props => {

    const [enteredUserName, setEnteredUserName] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState('');

    const addUserHandler = (event) =>{
        event.preventDefault();
        
        if(enteredUserName.trim().length === 0 || enteredAge.trim().length === 0){
            setError({
                title:'Invalid input',
                message:'Please enter a valid name and age (none-empty value).'
            })
            return;
        }
        if(+enteredAge < 1) {
            setError({
                title:'Invalid age',
                message:'Please enter a valid age grather than 0'
            })
            return;             
        }
        
        props.onAddUser(enteredUserName,enteredAge);

        setEnteredAge('');
        setEnteredUserName('');
    }

    const usernameChangeHandler = (event) =>{
        setEnteredUserName(event.target.value);
    }

    const ageChangeHandler = (event) =>{
        setEnteredAge(event.target.value);
    }

    const errorHandler = () =>{
        setError(null);
    }

    return (
        <div>
            { error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
            <Card className={classes.input}>
                <div>
                    <form onSubmit={addUserHandler}>
                        <label htmlFor="username">UserName</label>
                        <input id="username" type='text' value={enteredUserName} onChange={usernameChangeHandler}></input>
                        <label htmlFor="age">Age(Years)</label>
                        <input id="age" type='number' value={enteredAge} onChange={ageChangeHandler}></input>
                        <Button type='submit'>Add User</Button>
                    </form>             
                </div>            
            </Card>
        </div>        
    )
}

export default AddUser;