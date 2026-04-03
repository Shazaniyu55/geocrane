const userService = require('../service/userService');
const HttpException = require('../utils/httpException');
const successResponse = require('../utils/successresponse');
const {registerSchema, loginSchema} = require('../validations/authValidation');
const STATUSCODES = require('../constants/statuscode');
const {jwtSign} = require('../utils/jwts');

const userController = {
    register: async(req, res)=>{
       const result = registerSchema.safeParse(req.body);
        if (!result.success) {
      throw new HttpException(
                STATUSCODES.BAD_REQUEST,
                result.error.errors?.[0]?.message
              );        
            
            }
            const {fullName, email, phone} = result.data;

            const existingUser = await userService.getUserByPhone(phone);
            if (existingUser) {
            throw new HttpException(
                STATUSCODES.BAD_REQUEST,
                "User with this phone number already exists"
              );
        }

         const user = await userService.createUser({
            fullName,
            email: email,
            phone:phone,
            online: true
          
        });

        if (!user) {
            throw new HttpException(
                STATUSCODES.INTERNAL_SERVER_ERROR,
                "Failed to create user"
              );
        }else{
          const token = jwtSign({
            userId: user.id,
            phone: user.phone
          });

            return successResponse(res, {
                token,
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    phone: user.phone,
                }
            }, "User registered successfully", STATUSCODES.CREATED);

        }

    },

    login: async(req, res)=>{
       const result = loginSchema.safeParse(req.body);
        if (!result.success) {
      throw new HttpException(
                STATUSCODES.BAD_REQUEST,
                result.error.errors?.[0]?.message
              );

            }
            const {phone} = result.data;

            const user = await userService.getUserByPhone(phone);
            if (!user) {
            throw new HttpException(
                STATUSCODES.BAD_REQUEST,
                "User with this phone number does not exist"
              );
        }

        await userService.updateUser(user.id, { online: true });

            const token = jwtSign({
            userId: user.id,
            phone: user.phone
          });

            return successResponse(res, {
                token,
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    phone: user.phone,
                }
            }, "User logged in successfully", STATUSCODES.SUCCESS);

    },

    updateUserLocation: async(req, res)=>{
      try {
        const userId = req.user.userId;
        const {location}= req.body;
         const loc = await userService.updateUser(userId, {location: location});

         successResponse(res, loc, "location updated successfully", STATUSCODES.SUCCESS)

      } catch (error) {
        console.log(error)
      }
    },

    
    getUserProfile: async (req, res) => {
    const userId = req.user.userId; // Assuming user ID is available in req.user from auth middleware
    const user = await userService.getUserById(userId);

    if (!user) {
      throw new HttpException(
        STATUSCODES.NOT_FOUND,
        "User not found"
      );
    }

    const userResponse = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return successResponse(res, userResponse, "User profile retrieved successfully", STATUSCODES.SUCCESS);
  },


    
}



module.exports = userController;