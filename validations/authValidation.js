const {z} = require('zod');


const registerSchema = z.object({
  phone: z
    .string({ message: "Phone number is required" })
    .regex(/^234\d{10}$/, {
      message: "Phone number must be in format 234XXXXXXXXXX"
    }),
    fullName: z.string({ message: "First name is required" }),
        email: z
      .string({ message: "Email is required" })
      .email({ message: "Invalid email" })
    
});


const loginSchema = z.object({
  phone: z
    .string({ message: "Phone number is required" })
    .regex(/^234\d{10}$/, {
      message: "Phone number must be in format 234XXXXXXXXXX"
    }),
    
    
});

module.exports = {registerSchema, loginSchema}