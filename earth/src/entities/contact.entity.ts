import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne, PrimaryColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class ContactEntity {

	@PrimaryGeneratedColumn('uuid')
	id: number;

	@PrimaryColumn({
		nullable: false,
	})
	code: string;

	@Column()
	description: string;

	@CreateDateColumn()
	createTime: number;

	@UpdateDateColumn()
	updateTime: number;

	@Column({
		nullable: false,
	})
	type: string;

	@ManyToOne(
		type => UserEntity,
		user => user.contacts,
	)
	user: UserEntity;
}
