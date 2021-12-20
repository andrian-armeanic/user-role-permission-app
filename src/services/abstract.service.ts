import { HttpException } from "../error/HttpException";

export default class AbstractService<T> {

  public model: any;

  public async findAll(): Promise<T[]> {

    return this.model.find();
  }

  public async findById(id: string): Promise<T> {

    if (!id) {
      throw new HttpException(400, "Wrong id!");
    }
    const found: T = await this.model.findOne({ _id: id });
    if (!found) {
      throw new HttpException(404, "Not found!");
    }
    return found;
  }

  public async create(data): Promise<T> {

    if (!data) {
      throw new HttpException(400, "Incorrect Data!");
    }
    const found: T = await this.model.findOne({ name: data.name });
    if (found) {
      throw new HttpException(409, `Name ${data.name} already exists`);
    }
    return this.model.create({ data });
  }

  public async update(id: string, data): Promise<T> {

    if (!data) {
      throw new HttpException(400, "Incorrect Data!");
    }
    if (data.name) {
      const found: T = await this.model.findOne({ name: data.name });
      if (found) {
        throw new HttpException(409, `Name ${data.name} already exists`);
      }
    }
    const updateElementById: T = await this.model.findByIdAndUpdate(id, { data });
    if (!updateElementById) {
      throw new HttpException(409, "Wrong id!");
    }
    return updateElementById;
  }

  public async delete(id: string): Promise<T> {

    const deleted: T = await this.model.findByIdAndDelete(id);
    if (!deleted) {
      throw new HttpException(409, "Wrong id!");
    }
    return deleted;
  }
}
