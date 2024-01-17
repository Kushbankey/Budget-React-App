//rrd imports
import { redirect } from "react-router-dom";

//library imports
import { toast } from "react-toastify";

//helpers
import { deleteItem, getAllMatchingItems } from "../helpers";

export function deleteBudget({ params }) {
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });

    const associtedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    associtedExpenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });

    toast.success("Budget deleted succesfully");
  } catch (e) {
    throw new Error("There was a problem deleteing your budget!");
  }

  return redirect("/");
}
