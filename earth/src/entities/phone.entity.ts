import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class PhoneEntity {

	@PrimaryGeneratedColumn('uuid')
	id: number;

	@Column()
	number: string;

	@Column()
	description: string;

	@CreateDateColumn()
	createTime: number;

	@UpdateDateColumn()
	updateTime: number;

	@ManyToOne(
		type => UserEntity,
		user => user.phones,
	)
	user: UserEntity;
}
