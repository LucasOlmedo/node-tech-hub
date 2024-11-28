const { z } = require("zod");

const createUserSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long").max(50, "Name must be at most 50 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

const updateUserSchema = z.object({
    name: z.string().min(3).max(50).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
});


module.exports = { createUserSchema, updateUserSchema };
