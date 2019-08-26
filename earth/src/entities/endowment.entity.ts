import { Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

export class EndowmentEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@PrimaryColumn()
	typeId: string;

	@Column()
	rank: string;

	@ManyToOne(
		type => UserEntity,
		user => user.endowments,
	)
	user: UserEntity;

}
