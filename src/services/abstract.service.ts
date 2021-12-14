import { HttpException } from "../error/HttpException";
import StatusCodes from "../types/statusCode";

export default class AbstractService<T> {

  public model: any;

  public async findAll<T>(): Promise<T[]> {

    return this.model.find();
  }

  public async findById<T>(id: string): Promise<T> {

    if (!id) {
      throw new HttpException(StatusCodes.BAD_REQUEST, "Wrong id!");
    }
    const found: T = await this.model.findOne({ _id: id });
    if (!found) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Not found!");
    }
    return found;
  }

  public async create<T>(data): Promise<T> {

    if (!data) {
      throw new HttpException(StatusCodes.BAD_REQUEST, "Incorrect Data!");
    }
    const found: T = await this.model.findOne({ name: data.name });
    if (found) {
      throw new HttpException(StatusCodes.CONFLICT, `Name ${data.name} already exists`);
    }
    return this.model.create({ data });
  }

  public async update<T>(id: string, data): Promise<T> {

    if (!data) {
      throw new HttpException(StatusCodes.BAD_REQUEST, "Incorrect Data!");
    }
    if (data.name) {
      const found: T = await this.model.findOne({ name: data.name });
      if (found) {
        throw new HttpException(StatusCodes.CONFLICT, `Name ${data.name} already exists`);
      }
    }
    const updateElementById: T = await this.model.findByIdAndUpdate(id, { data });
    if (!updateElementById) {
      throw new HttpException(StatusCodes.CONFLICT, "Wrong id!");
    }
    return updateElementById;
  }

  public async delete<T>(id: string): Promise<T> {

    const deleted: T = await this.model.findByIdAndDelete(id);
    if (!deleted) {
      throw new HttpException(StatusCodes.CONFLICT, "Wrong id!");
    }
    return deleted;
  }
}
