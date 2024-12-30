
import {z} from "zod";



export const expenseSchema = z.object({
      amount:z.number({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number",
      })
      .positive("Amount must be greater than 0"),
      
    category:z.string({
        required_error: "Category is required",
      })  
    .min(3, "Category must be at least 3 characters")
    .max(50, "Category must be less than 50 characters"),

    description:z.string({
      required_error: "Category is required",
    })
    .min(3, "description must be at least 3 characters")
    .max(50, "description must be less than 50 characters")
    .optional()
})