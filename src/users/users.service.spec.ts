import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: Repository<User>;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);
  const mockUser = {
    id: 'mockUserId',
    name: 'mockName',
    email: 'mockEmail',
    age: 10,
  };
  const mockProduct = {
    id: 'mockProductId',
    name: 'mockProduct',
    price: 100,
  };
  const mockProductsService = {
    findOne: jest.fn().mockReturnValue(mockProduct),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        ProductsService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn((dto) => dto),
            save: jest.fn((dto) => dto),
            findOne: jest.fn().mockReturnValue(mockUser),
            find: jest.fn(),
          },
        },
      ],
    })
      .overrideProvider(ProductsService)
      .useValue(mockProductsService)
      .compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user using repository create/save', async () => {
    const mockUserDto = {
      id: 'user1',
      name: 'user1',
      email: 'user1@gmail.com',
      age: 15,
    };
    await service.create(mockUserDto);
    expect(usersRepository.create).toHaveBeenCalledWith(mockUserDto);
    expect(usersRepository.save).toHaveBeenCalledWith(mockUserDto);
  });

  it('should retrieve all users using repository find', async () => {
    await service.findAll();
    expect(usersRepository.find).toHaveBeenCalled();
  });

  it('should find one user using repository findOne', async () => {
    const mockId = 'user1';
    await service.findOne(mockId);
    expect(usersRepository.findOne).toHaveBeenCalledWith({
      where: {
        id: mockId,
      },
    });
  });

  it('should add product in orders list through orderProduct', async () => {
    const mockUserId = 'user1';
    const mockProductId = 'product1';

    await service.orderProduct(mockUserId, mockProductId);
    expect(mockProductsService.findOne).toHaveBeenCalledWith(mockProductId);
    expect(usersRepository.findOne).toHaveBeenCalledWith({
      where: {
        id: mockUserId,
      },
    });
    expect(usersRepository.save).toHaveBeenCalledWith(mockUser);
  });
});
