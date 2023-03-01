import React, { useState } from "react";

import "./Expenses.css";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from './ExpensesChart';

const Expenses = (props) => {
  const [filteredYear, setFilterYear] = useState("2020");

  const yearFilterHandler = (selectedYear) => {
    setFilterYear(selectedYear);
  };

  const expensesArr = props.items.filter((expense) =>(
    expense.date.getFullYear().toString() === filteredYear
  ))

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selected={filteredYear}
          onYearFilter={yearFilterHandler}  
        />
        <ExpensesChart expenses={expensesArr}/>
        <ExpensesList expensesArr={expensesArr} />
      </Card>
    </div>
  );
};

export default Expenses;
