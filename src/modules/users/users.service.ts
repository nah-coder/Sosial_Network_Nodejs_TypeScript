import jwt from 'jsonwebtoken';
import { DataStoredInToken, TokenData } from "@modules/auth";
import RegisterDto from "./dtos/register.dto";
import UserSchema from './users.model';
import { isEmptyObject } from "@core/utils/helpers";
import { HttpException } from "@core/interface/exceptions";
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import IUser from "./users.interface";
class UserService {
    private userSchema = UserSchema;

    public async createUser(model: RegisterDto): Promise<TokenData> {
        if (isEmptyObject(model)) {
        throw new HttpException(400, 'Model is empty');
        }

        const user = await this.userSchema.findOne({ email: model.email }).exec();
        if (user) {
        throw new HttpException(409, `Your email ${model.email} already exist.`);
        }

        const avatar = gravatar.url(model.email, {
        size: '200',
        rating: 'g',
        default: 'mm',
        });

        const salt = await bcryptjs.genSalt(10);

        const hashedPassword = await bcryptjs.hash(model.password, salt);
        const createdUser = await this.userSchema.create({
        ...model,
        password: hashedPassword,
        avatar: avatar,
        date: Date.now(),
        });
        // const refreshToken = await this.generateRefreshToken(createdUser._id);
        // await refreshToken.save();

        // return generateJwtToken(createdUser._id, refreshToken.token);
        return this.createToken(createdUser);
    }

    private createToken(user: IUser): TokenData  {
        const dataInToken: DataStoredInToken = { id: user._id.toString() };
        const secret: string = process.env.JWT_TOKEN_SECRET ?? '';
        const expiresIn = 60; //in seconds
        return {
          token: jwt.sign(dataInToken, secret, { expiresIn: expiresIn }),
          expiresIn: expiresIn,
        };
    }
}

export default UserService;