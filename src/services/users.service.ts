import { RequestWithUser } from '@interfaces/auth.interface';
import orderModel from '@/models/order.model';
import { Order } from './../interfaces/order.interface';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { uploadFile } from '@/utils/cloudinaryUploader';

class UserService {
  public users = userModel;
  public order = orderModel;
  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User | null = (await this.users.findOne({ _id: userId })) as User;

    return findUser;
  }

  public async findUserOrder(userId: string): Promise<Order[]> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findOrder: Order[] | null = await this.order.find({ user: userId });

    return findOrder;
  }

  public async updateUser(req: RequestWithUser): Promise<User> {
    let uploadedFile: null | { url: string } = null;

    const user = await this.findUserById(req.user._id);

    if (!user) throw new HttpException(409, "You're not user");
    if (!isEmpty(req.file)) {
      uploadedFile = await uploadFile(req.file, `${req.user.name}_${req.user._id}`);
    }

    const updatedProfile = {
      name: req.body.name ? req.body.name.trim() : user.name,
      phone: req.body.phone ? req.body.phone.trim() : user.phone,
      address: req.body.address ? req.body.address.trim() : user.address,
      avatar: uploadedFile ? uploadedFile.url : user.avatar,
    };

    const updateUser: User = (await this.users.findOneAndUpdate({ _id: req.user._id }, { $set: updatedProfile }, { new: true })) as User;

    return updateUser;
  }
}

export default UserService;
