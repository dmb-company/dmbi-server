import {
  dataSource,
} from "@medusajs/medusa/dist/loaders/database"
import { Partner } from "../models/partners"

const PartnerRepository = dataSource.getRepository(
  Partner
)


export default PartnerRepository