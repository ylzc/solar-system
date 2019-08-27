import {
	Column, Entity, PrimaryGeneratedColumn,
	UpdateDateColumn, CreateDateColumn,
	ManyToOne, BeforeUpdate, Generated, OneToMany,
} from 'typeorm';
import { ContactEntity } from './contact.entity';
import { SexEnum } from '@solar-system/planet';
import crypto = require('crypto');
import { Exclude, Expose } from 'class-transformer';
import { AddressEntity } from './address.entity';
import { EndowmentEntity } from './endowment.entity';

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

	@Exclude()
	get fullName(): string {
		return `${this.firstName} ${this.lastName}`;
	}

	@Exclude()
	@Column()
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

	@Column({ unique: true, nullable: true })
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

	@Column()
	description: string;

	@Column()
	remarks: string; // 评价

	@CreateDateColumn()
	createTime: number;

	@UpdateDateColumn()
	updateTime: number;

	@Column('simple-array')
	tags: string[];

	@OneToMany(
		type => EndowmentEntity,
		endowment => endowment.user,
	)
	endowments: EndowmentEntity[]; // 资质

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
