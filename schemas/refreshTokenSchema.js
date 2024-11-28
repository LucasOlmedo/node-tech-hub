const { z } = require("zod");

const refreshTokenSchema = z.object({
    refreshToken: z.string().min(1, "Refresh token is required"),
});

module.exports = { refreshTokenSchema };
