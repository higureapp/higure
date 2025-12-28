import 'reflect-metadata'
import { Exclude } from 'class-transformer'

export function Sensitive(): PropertyDecorator {
    return Exclude()
}
