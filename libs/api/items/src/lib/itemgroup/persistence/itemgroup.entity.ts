import { CheckTemplate, Item, ItemGroup, Partner, Unit } from "@system4blue/api-interfaces";
import { CheckTemplateEntity } from "@system4blue/api/checks";
import { PartnerEntity } from "@system4blue/api/partners";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ItemEntity } from "../../item/persistence/item.entity";

@Entity()
export class ItemGroupEntity implements ItemGroup {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({type: 'enum', enum: Unit, default: Unit.PIECE})
  unit?: Unit;

  @OneToMany(
    () => ItemEntity,
    item => item.itemGroup,
  )
  items?: Item[];

  @Column()
  name?: string;

  @Column({nullable: true})
  description?: string;

  @Column({nullable: true})
  minAmount?: number;

  @Column({nullable: true})
  maxAmount?: number;

  @Column({nullable: true})
  defaultLifespan?: number;

  @ManyToOne(
    () => PartnerEntity
  )
  seller?: Partner;

  @ManyToOne(
    () => PartnerEntity
  )
  producer?: Partner;

  @Column({nullable: true})
  pricePerUnit?: number;

  @ManyToOne(() => CheckTemplateEntity)
  checkTemplate?: CheckTemplate;

  @CreateDateColumn()
  createdAt?: string;

  @UpdateDateColumn()
  updatedAt?: string;
}
