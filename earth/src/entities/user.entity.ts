import {
	Index,
	Column, Entity, PrimaryGeneratedColumn,
	UpdateDateColumn, CreateDateColumn,
	ManyToOne, BeforeUpdate, Generated,
	OneToMany, PrimaryColumn,
	BeforeInsert,
} from 'typeorm';
import { ContactEntity } from './contact.entity';
import { SexEnum } from '@solar-system/planet';
import crypto = require('crypto');
import { Exclude, Expose, Transform } from 'class-transformer';
import { AddressEntity } from './address.entity';
import { EndowmentEntity } from './endowment.entity';
import { getRandomString } from '@solar-system/planet/src/utils/random';

@Entity()
export class UserEntity {

	constructor(partial: Partial<UserEntity>) {
		Object.assign(this, partial);
	}

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Exclude()
	@Index()
	@Column({
		nullable: true,
		unique: true,
	})
	normalAccount: string;

	@Exclude()
	@Index()
	@Column({
		nullable: true,
		unique: true,
	})
	phoneAccount: string;

	@Exclude()
	@Index()
	@Column({
		nullable: true,
		unique: true,
	})
	emailAccount: string;

	@Column({
		nullable: true,
	})
	name: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Exclude()
	get fullName(): string {
		return `${this.firstName} ${this.lastName}`;
	}

	@Exclude()
	@Column({
		nullable: true,
	})
	password: string;

	@Exclude()
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

	@Column({
		unique: true,
		nullable: true,
	})
	idCardNumber: string;

	@OneToMany(
		type => AddressEntity,
		address => address.user,
	)
	addressList: AddressEntity[];

	@OneToMany(
		type => ContactEntity,
		contact => contact.user,
	)
	contacts: ContactEntity[];

	@Column({
		nullable: true,
		default: '',
	})
	description: string;

	@Column({
		nullable: true,
		default: '',
	})
	remarks: string; // 评价

	@CreateDateColumn({
		type: 'timestamp',
	})
	createTime: number;

	@UpdateDateColumn({
		type: 'timestamp',
	})
	updateTime: number;

	@Transform(value => value ? value : [])
	@Column({
		type: 'simple-array',
		nullable: true,
		default: undefined,
	})
	tags: string[];

	@OneToMany(
		type => EndowmentEntity,
		endowment => endowment.user,
	)
	endowments: EndowmentEntity[]; // 资质

	@Column({
		nullable: true,
		default: '',
	})
	photo: string;

	@Column({
		nullable: true,
		default: '',
	})
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
