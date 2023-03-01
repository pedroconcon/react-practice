import React,{ useState }  from "react";
import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {
  const [buttonAdd, setButtonAdd ] = useState(true);

  const saveExpenseDataHandler = (enteredExpenseData) =>{
    const expenseData ={
      ...enteredExpenseData,
      id: Math.random().toString()
    };
     
    props.onAddExpense(expenseData);
  }

  const hideButtonAdd = () => {
      setButtonAdd(false);
  }

  const showButtonAdd = () => {
      setButtonAdd(true);
  }

  return (
    <div className="new-expense">
      { buttonAdd ? <button onClick={hideButtonAdd} > Add New Expense</button> 
        : <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onShowButton={showButtonAdd}/>
      }
    </div>
  );
};

export default NewExpense;
