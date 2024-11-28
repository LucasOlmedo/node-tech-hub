const { z } = require("zod");

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string(),
});

module.exports = { loginSchema };
