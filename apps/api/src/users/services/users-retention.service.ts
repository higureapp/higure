import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { UsersRepository } from "../users.repository";

@Injectable()
export class RetentionService {
    private logger = new Logger(RetentionService.name);

    constructor(private readonly usersRepository: UsersRepository) { }

    @Cron('0 3 * * *') // avery day at 3 am
    async runRetention() {
        this.logger.log('Executing Retention task...');

        const retentionDate = new Date();
        retentionDate.setDate(retentionDate.getDate() - 30);

        const users = await this.usersRepository.getAllSoftDeletedUsers(retentionDate);

        let deletedUsers = 0;
        for (const user of users) {
            await this.anonymizeUser(user.id);
            deletedUsers++
        }

        this.logger.log(`Redacted sensitive data from ${deletedUsers} users.`);
    }

    private async anonymizeUser(userId: string) {
        await this.usersRepository.update(userId, {
            email: `deleted_${userId}_${new Date().toUTCString()}@anon.local`,
            firstname: 'Deleted',
            lastname: 'User',
            phone: null,
            avatarUrl: null,
            timezone: '',
            locale: '',
            password: 'ANONYMIZED'
        });
    }
}