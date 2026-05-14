import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}
  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    let employee: Employee | null;
    const existingEmployee = await this.employeeRepository.findOne({
      where: { name: createEmployeeDto.name },
    });
    if (existingEmployee) {
      throw new ConflictException('Employee with this name already exists');
    }
    try {
      employee = this.employeeRepository.create(createEmployeeDto);
      employee = await this.employeeRepository.save(employee);
    } catch (error) {
      throw new Error('Error creating employee');
    }
    return employee;
  }

  async findAll(take: number, page: number): Promise<[Employee[], number]> {
    let employees: [Employee[], number];
    const skip = (page - 1) * take;
    try {
      employees = await this.employeeRepository.findAndCount({
        take,
        skip,
      });
    } catch (error) {
      throw new Error('Error fetching employees');
    }
    return employees;
  }

  async findOne(id: string): Promise<Employee> {
    let employee: Employee | null;
    try {
      employee = await this.employeeRepository.findOne({ where: { id } });
      if (employee === null) {
        throw new NotFoundException('Employee not found');
      }
    } catch (error) {
      throw new Error('Error fetching employee');
    }
    return employee;
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    let employee: Employee | null;
    try {
      employee = await this.employeeRepository.findOne({ where: { id } });
      if (employee === null) {
        throw new NotFoundException('Employee not found');
      }
      Object.assign(employee, updateEmployeeDto);
      await this.employeeRepository.save(employee);
    } catch (error) {
      throw new Error('Error updating employee');
    }
    return employee;
  }

  async remove(id: string): Promise<boolean> {
    let employee: Employee | null;
    try {
      employee = await this.employeeRepository.findOne({ where: { id } });
      if (employee === null) {
        throw new NotFoundException('Employee not found');
      }
      await this.employeeRepository.remove(employee);
    } catch (error) {
      throw new Error('Error removing employee');
    }
    return true;
  }
}
