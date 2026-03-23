import usersModel from "./users.model";
class UserService {
    public userSchema: UserSchema;

    public async createUser(model: RegisterDto): Promise<RegisterDto> {
        const newUser = new this.userSchema(model);
        return await newUser.save();
    }

}