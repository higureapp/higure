import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RefreshTokenService } from './refresh-token.service';

@Injectable()
export class RefreshTokenCron {
    private logger = new Logger('RefreshTokenCron');

    constructor(
        private refreshTokenService: RefreshTokenService
    ) { }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleDeleteExpiredTokens() {
        this.logger.log('Cleaning up expired refresh tokens...');
        const result = await this.refreshTokenService.deleteExpiredTokens();
        this.logger.log(`Deleted ${result.count} expired tokens`);
    }
}