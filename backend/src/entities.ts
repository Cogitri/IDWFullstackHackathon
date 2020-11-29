import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Unique,
} from "typeorm";

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_name: string;
}

@Entity()
export class Offering {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Users)
  @JoinColumn()
  farmer_id: number;

  @OneToOne(() => Products)
  @JoinColumn()
  product_id: number;
}

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Products)
  @JoinColumn()
  product_id: number;

  @Column()
  quanity: number;

  @Column()
  status: string;

  @Column("float")
  total_price: number;

  @OneToOne(() => Users)
  @JoinColumn()
  customer_id: number;

  @OneToOne(() => Users)
  @JoinColumn()
  farmer_id: number;
}

@Entity()
export class PhotoUrls {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @OneToOne(() => Products)
  @JoinColumn()
  product_id: number;
}

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productname: string;

  @Column("float")
  price: number;

  @Column()
  stock: number;

  @Column({
    length: 2000,
  })
  description: string;

  @OneToOne(() => Categories)
  @JoinColumn()
  category_id: number;

  @Column("datetime")
  expiryDate: Date;

  @Column("datetime")
  manufacturingDate: Date;

  @Column()
  paymentMethod: string;

  @Column()
  deliveryMethod: string;

  @Column({ default: "outOfStock" })
  status: string;
}

@Entity()
@Unique(["username", "email"])
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "username" })
  username: string;

  @Column({ name: "email" })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column("float")
  longitude: number;

  @Column("float")
  latitude: number;

  @Column()
  licensed: boolean;

  @Column({ nullable: true })
  farmingMethodology?: string;

  @Column({ nullable: true })
  covidGuidelines?: string;
}
