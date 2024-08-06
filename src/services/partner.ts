import { TransactionBaseService } from '@medusajs/medusa';
import PartnerRepository from 'src/repositories/partner';
import { EntityManager } from 'typeorm';

type InjectedDependencies = {
    manager: EntityManager;
    partnerRepository: typeof PartnerRepository;
}

class PartnerService extends TransactionBaseService {
    protected partnerRepository_:  typeof PartnerRepository;
    constructor({ partnerRepository }: InjectedDependencies) {
        super(arguments[0]);
        this.partnerRepository_ = partnerRepository
    }

    async create(data) {
            return await this.atomicPhase_(async (manager: EntityManager) => {
                const partnerRepository = manager.withRepository(this.partnerRepository_);
                console.log(data)
    
                const partner = await partnerRepository.create(data)
                return await partnerRepository.save(partner);
            });
    }

    //delete method
    async delete(id) {
        return await this.atomicPhase_(async (manager: EntityManager) => {
            const partnerRepository = manager.withRepository(this.partnerRepository_);
            return await partnerRepository.delete(id);
        });
    }
}

export default PartnerService;