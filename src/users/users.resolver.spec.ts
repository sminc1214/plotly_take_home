import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  const mockUserService = {
    findOne: jest.fn(),
    orderProduct: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
  };

  const mockUserDto = {
    id: 'mockId',
    name: 'mockName',
    email: 'mockEmail',
    age: 100,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver, UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create user using usersService create', async () => {
    await resolver.createUser(mockUserDto);
    expect(mockUserService.create).toHaveBeenCalledWith(mockUserDto);
  });

  it('should find all users using usersService findAll', async () => {
    await resolver.findAll();
    expect(mockUserService.findAll).toHaveBeenCalled();
  });

  it('should find one user using usersService findOne', async () => {
    await resolver.findOne('mockId');
    expect(mockUserService.findOne).toHaveBeenCalledWith('mockId');
  });

  it('orderProduct should invoke usersService orderProduct', async () => {
    await resolver.orderProduct('mockUserId', 'mockProductId');
    expect(mockUserService.orderProduct).toHaveBeenCalledWith(
      'mockUserId',
      'mockProductId',
    );
  });
});
