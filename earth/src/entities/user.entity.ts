import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	CreateDateColumn, ManyToOne,
} from 'typeorm';
import { PhoneEntity } from './phone.entity';
import { SexEnum } from '@solar-system/planet';

@Entity()
export class UserEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

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
	})
	sex: SexEnum;

	@Column({
		default: false,
		nullable: false,
	})
	isDeleted: boolean;

}
