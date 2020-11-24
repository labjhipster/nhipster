/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ApiModelProperty } from '@nestjs/swagger';
import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Activity from './activity.entity';
import DemetraUser from './demetra-user.entity';

/**
 * A SingleCourse.
 */
@Entity('single_course')
export default class SingleCourse extends BaseEntity {
  @Column({ name: 'title', unique: true })
  title: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ type: 'boolean', name: 'isnotonlyfordegree' })
  isnotonlyfordegree: boolean;

  @Column({ type: 'integer', name: 'cfu', nullable: true })
  cfu: number;

  @Column({ type: 'blob', name: 'courseimage', nullable: true })
  courseimage: any;

  @Column({ name: 'courseimage_content_type', nullable: true })
  courseimageContentType: string;
  @Column({ type: 'decimal', name: 'amount', precision: 10, scale: 2, nullable: true })
  amount: number;

  @OneToOne(type => Activity)
  activity: Activity;

  @ManyToOne(type => DemetraUser)
  cfteacher: DemetraUser;

  @ManyToMany(type => DemetraUser)
  cfstudents: DemetraUser[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
