import z from "zod"

// Username and passphrase parameters
const USER_LEN_MINIMUM = 6
const USER_LEN_MAXIMUM = 20
const PASS_LEN_MINIMUM = 10
const PASS_LEN_MAXIMUM = 512
const PRINTABLE_UNICODE = /^[\P{Cc}\P{Cn}\P{Cs}]+$/gu // allow only, printable (unicode) characters; https://stackoverflow.com/a/12054775
const PRINTABLE_MESSAGE = "can only contain printable characters."

export const signupSchema = z.object({
    username: z.string().min(USER_LEN_MINIMUM, {
        message: "Username must be at least " + USER_LEN_MINIMUM + " characters.",
    }).max(USER_LEN_MAXIMUM, {
        message: "Username has a " + USER_LEN_MAXIMUM + " character limit."
    }).regex(PRINTABLE_UNICODE, { 
        message: "Username " + PRINTABLE_MESSAGE
    }),
    password: z.string().min(PASS_LEN_MINIMUM, {
        message: "Password must be at least " + PASS_LEN_MINIMUM + " characters."
    }). max(PASS_LEN_MAXIMUM, {
        message: "Password has a " + PASS_LEN_MAXIMUM + " character limit."
    }).regex(PRINTABLE_UNICODE, { 
        message: "Password " + PRINTABLE_MESSAGE
    }),
    confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
});

export const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
});