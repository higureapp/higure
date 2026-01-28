import { Test, TestingModule } from '@nestjs/testing'
import { JournalsResolver } from './journals.resolver'

describe('JournalsResolver', () => {
    let resolver: JournalsResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [JournalsResolver],
        }).compile()

        resolver = module.get<JournalsResolver>(JournalsResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
