import { useState, useRef } from 'react';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import classes from './AddUser.module.css';
import ErrorModal from '../UI/Modal/ErrorModal'
import Wrapper from '../UI/Helpers/Wrapper';

const AddUser = props => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();

    const [error, setError] = useState('');

    const addUserHandler = (event) =>{
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredUserAge = ageInputRef.current.value;

        if(enteredName.trim().length === 0 || enteredUserAge.trim().length === 0){
            setError({
                title:'Invalid input',
                message:'Please enter a valid name and age (none-empty value).'
            })
            return;
        }
        if(+enteredUserAge < 1) {
            setError({
                title:'Invalid age',
                message:'Please enter a valid age grather than 0'
            })
            return;             
        }
        
        props.onAddUser(enteredName,enteredUserAge);
        nameInputRef.current.value='';
        ageInputRef.current.value='';
    }

    const errorHandler = () =>{
        setError(null);
    }

    return (
        <Wrapper>
            { error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
            <Card className={classes.input}>
                <div>
                    <form onSubmit={addUserHandler}>
                        <label htmlFor="username">UserName</label>
                        <input id="username" type='text' ref={nameInputRef}></input>
                        <label htmlFor="age">Age(Years)</label>
                        <input id="age" type='number' ref={ageInputRef}></input>
                        <Button type='submit'>Add User</Button>
                    </form>             
                </div>            
            </Card>
        </Wrapper>        
    )
}

export default AddUser;