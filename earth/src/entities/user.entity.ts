import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	CreateDateColumn,
	ManyToOne,
	BeforeUpdate, Generated,
} from 'typeorm';
import { PhoneEntity } from './phone.entity';
import { SexEnum } from '@solar-system/planet';
import crypto = require('crypto');
import { Expose } from 'class-transformer';

@Entity()
export class UserEntity {

	constructor(partial: Partial<UserEntity>) {
		Object.assign(this, partial);
	}

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Expose()
	get fullName(): string {
		return `${this.firstName} ${this.lastName}`;
	}

	@Expose()
	@Column()
	password: string;

	@Expose()
	@Column()
	@Generated('uuid')
	salt: string;

	@BeforeUpdate()
	updatePassword() {
		this.password = crypto
			.createHash('md5')
			.update(this.password + ':' + this.salt)
			.digest('hex');
	}

	@Column()
	address: string;

	@Column()
	regionalismCode: string;

	@Column({ unique: true, nullable: true })
	idCardNumber: string;

	@Column()
	qq: string;

	@Column()
	weixin: string;

	@ManyToOne(
		type => PhoneEntity,
		phone => phone.user,
	)
	phones: PhoneEntity[];

	@Column()
	description: string;

	@Column()
	remarks: string;

	@CreateDateColumn()
	createTime: number;

	@UpdateDateColumn()
	updateTime: number;

	@Column('simple-array')
	tags: string[];

	@Column('simple-array')
	endowments: any[]; // 资质

	@Column()
	photo: string;

	@Column()
	nickname: string;

	@Column({
		type: 'enum',
		enum: SexEnum,
		default: SexEnum.unknown,
	})
	sex: SexEnum;

	@Column({
		default: false,
		nullable: false,
	})
	isDeleted: boolean;

}
