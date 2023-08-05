import { Injectable } from '@nestjs/common';

@Injectable()
export class objectService {
  async createObject(name: string, companyId: string) {
    return name;
  }
}
