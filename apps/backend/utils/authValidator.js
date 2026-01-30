import Joi from "joi";

/**
 * Password Rules:
 * - Min 8 chars
 * - 1 uppercase
 * - 1 lowercase
 * - 1 number
 * - 1 special char
 */
const passwordSchema = Joi.string()
  .min(8)
  .pattern(/[A-Z]/, 'uppercase')
  .pattern(/[a-z]/, 'lowercase')
  .pattern(/[0-9]/, 'number')
  .pattern(/[\W_]/, 'special')
  .required()
  .messages({
    "string.min": "Password must be at least 8 characters long",
    "string.pattern.uppercase": "Password must contain at least one uppercase letter",
    "string.pattern.lowercase": "Password must contain at least one lowercase letter",
    "string.pattern.number": "Password must contain at least one number",
    "string.pattern.special": "Password must contain at least one special character (!@#$%^&*)",
    "any.required": "Password is required",
  });

/* REGISTER VALIDATION */
export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name must not exceed 100 characters",
    }),

  email: Joi.string().email().required()
    .messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Email is required",
    }),

  phone: Joi.string().pattern(/^\d{10}$/).required()
    .messages({
      "string.pattern.base": "Phone number must be 10 digits",
      "string.empty": "Phone number is required",
    }),

  address: Joi.string().allow("", null),

  password: passwordSchema
});

/* LOGIN VALIDATION */
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

/* RESET PASSWORD VALIDATION */
export const resetPasswordSchema = Joi.object({
  password: passwordSchema
});
