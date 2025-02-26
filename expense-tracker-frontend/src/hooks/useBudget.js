import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useExpenses } from "./useExpenses";
import { getBudget, setBudget } from "../services/budgetService";


export const useBudget = () => {
    const queryClient = useQueryClient();
    const {expenses} = useExpenses();

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    const { data: budget = { amount: 0 } } = useQuery({
        queryKey: ["budget", currentMonth, currentYear],
        queryFn: () => getBudget(currentMonth, currentYear),
    });

    const setBudgetMutation = useMutation({
        mutationFn: setBudget,
        onSuccess: () => {
            queryClient.invalidateQueries(["budget", currentMonth, currentYear]);
        },
    });
    
    return {
        budget,
        totalExpenses,
        setBudget: setBudgetMutation.mutate,
        isSettingBudget: setBudgetMutation.isPending,
    }
}