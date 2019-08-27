import {
	Column, Entity, ManyToOne, OneToMany,
	PrimaryColumn, PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class AddressEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	address: string;

	@PrimaryColumn({
		nullable: false,
	})
	regionalismCode: string;

	@Column()
	description: string;

	@ManyToOne(
		type => UserEntity,
		user => user.addressList,
	)
	user: UserEntity;

}
