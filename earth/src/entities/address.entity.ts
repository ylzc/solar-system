import { Column, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

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
