import { Injectable } from '@nestjs/common';
import { Alert } from './alert.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlertDto, UpdateAlertDto } from './alert.request';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Alert)
    private alertRepository: Repository<Alert>,
  ) {}

  async create(createAlertDto: CreateAlertDto): Promise<any> {
    const newAlert = this.alertRepository.create(createAlertDto);
    await this.alertRepository.save(newAlert);
    return { message: 'Alert created successfully' };
  }

  async getById(id: string): Promise<Alert | null> {
    return this.alertRepository.findOneBy({ id });
  }

  async getAll(): Promise<Alert[]> {
    return this.alertRepository.find();
  }

  async update(
    id: string,
    updateAlertDto: UpdateAlertDto,
  ): Promise<Alert | null> {
    const result = await this.alertRepository.update(id, updateAlertDto);

    if (result.affected === 0) {
      return null; // Alert with the given ID not found
    }

    return this.alertRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.alertRepository.delete(id);
    return result.affected > 0;
  }
}
