/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ApiModelProperty } from '@nestjs/swagger';
import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import SingleCourse from './single-course.entity';
import DemetraUser from './demetra-user.entity';

/**
 * A Activity.
 */
@Entity('activity')
export default class Activity extends BaseEntity {
  @Column({ name: 'name', nullable: true, unique: true })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ type: 'double', name: 'mynumber', nullable: true })
  mynumber: number;

  @Column({ type: 'datetime', name: 'creationtime', nullable: true })
  creationtime: any;

  @OneToOne(type => SingleCourse)
  @JoinColumn()
  singleCourse: SingleCourse;

  @ManyToOne(type => DemetraUser)
  demetrauser: DemetraUser;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
