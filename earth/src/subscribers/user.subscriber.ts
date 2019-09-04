import {
	EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent,
} from 'typeorm';
import { UserEntity } from '@solar-system/planet';
import crypto = require('crypto');
import { getRandomString } from '@solar-system/planet';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
	/**
	 * Indicates that this subscriber only listen to Post events.
	 */
	listenTo() {
		return UserEntity;
	}

	updatePassword(e) {
		e.salt = getRandomString();
		e.password = crypto
			.createHash('md5')
			.update(e.password + ':' + e.salt)
			.digest('hex');
	}

	/**
	 * Called before post insertion.
	 */
	beforeInsert(event: InsertEvent<UserEntity>): Promise<any> | void {
		if (event.entity && event.entity.password) {
			this.updatePassword(event.entity);
		}
	}

	beforeUpdate(event: UpdateEvent<UserEntity>): Promise<any> | void {
		if (event.entity && event.entity.password) {
			this.updatePassword(event.entity);
		}
	}
}
