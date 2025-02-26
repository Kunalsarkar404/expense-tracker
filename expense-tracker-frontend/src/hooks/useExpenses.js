import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addExpense, deleteExpense, getExpenses } from "../services/expenseService";

export const useExpenses = () => {
    const queryClient = useQueryClient();

    const { data: expenses = [], isLoading, error } = useQuery({
        queryKey: ["expenses"],
        queryFn: getExpenses,
      });

    const addExpenseMutation = useMutation({
        mutationFn: addExpense,
        onSuccess: () => queryClient.invalidateQueries(["expenses"]),
    })

    const deleteExpenseMutation = useMutation({
        mutationFn: deleteExpense,
        onSuccess: () => queryClient.invalidateQueries(["expenses"]),
    })

    return {
        expenses: Array.isArray(expenses) ? expenses : [],
        isLoading,
        error,
        addExpense: addExpenseMutation.mutate,
        deleteExpense: deleteExpenseMutation.mutate,
    }
}